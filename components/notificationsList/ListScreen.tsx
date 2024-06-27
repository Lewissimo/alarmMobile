import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { collection, query, onSnapshot, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../config/colors';
import Collapsible from 'react-native-collapsible';

type AlertType = {
  id: string;
  deviceID: string;
}
type Notification = {
  id: string;
  message: string;
  nayaxID: string;
  deviceName: string;
  phoneNumber: string;
  place: string;
  alertID: string;
  seal: string;
};

export default function NotificationBox(): JSX.Element {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const sound = useRef(new Audio.Sound());
  const prevNotificationsRef = useRef<Notification[]>([]);
  const [isSoundReq, setIsSoundReq] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState<string | null>(null);
  
  useEffect(() => {
    const q = query(collection(db, 'alertList'));
  
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const notificationDocs = querySnapshot.docs;
      const newNotifications: Notification[] = [];
      const newAlert: AlertType[] = [];
      
      for (let alert of notificationDocs) {
        const deviceId = alert.data().deviceID as string;
        if (deviceId) {
          const deviceRef = doc(db, 'devices', deviceId);
          const deviceDoc = await getDoc(deviceRef);
          console.log(deviceId);
          console.log(deviceDoc.data());
          if (deviceDoc.exists()) {
            const notificationData: Notification = {
              id: deviceId,
              message: "Otwarcie bez autoryzacji",
              nayaxID: deviceDoc.data().nayax_id as string,
              deviceName: deviceDoc.data().name as string,
              phoneNumber: deviceDoc.data().phoneNum as string,
              place: deviceDoc.data().place as string,
              alertID: alert.id,
              seal: deviceDoc.data().seal
            };
            newNotifications.push(notificationData);
          }
        }
      }
  
      if (newNotifications.length > prevNotificationsRef.current.length && isSoundReq) {
        playSound();
      }
      setIsSoundReq(true);
      
      setNotifications(newNotifications);
      prevNotificationsRef.current = newNotifications;
    });
  
    return () => unsubscribe();
  }, []);

  const playSound = async () => {
    try {
      await sound.current.unloadAsync();
      await sound.current.loadAsync(require('../../assets/notification_sound2.mp3'));
      await sound.current.playAsync();
    } catch (error) {
      console.error('Error playing sound: ', error);
    }
  };

  const handleTurnOffAlarm = async (id: string) => {
    try {
      await updateDoc(doc(db, 'alertList', id), {
        message: 'Alarm wyłączony'
      });
    } catch (error) {
      console.error('Error turning off alarm: ', error);
    }
  };

  const handleRemoveNotification = (id: string) => {
    Alert.alert(
      'Potwierdzenie',
      'Czy na pewno chcesz usunąć powiadomienie z historii?',
      [
        {
          text: 'Anuluj',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Potwierdź',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'alertList', id));
              setNotifications(notifications.filter(notification => notification.alertID !== id));
            } catch (error) {
              console.error('Error removing notification: ', error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const toggleExpanded = (id: string) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <View style={styles.notificationContainer}>
      <TouchableOpacity onPress={() => toggleExpanded(item.alertID)} style={styles.notification}>
        <Text style={styles.notificationText}>{`${item.message}: ${item.deviceName || 'Device not found'}`}</Text>
        <MaterialIcons 
          name={expandedNotification === item.alertID ? "expand-less" : "expand-more"} 
          size={24} 
          color={colors.fontColor} 
        />
      </TouchableOpacity>
      <Collapsible collapsed={expandedNotification !== item.alertID}>
        <View style={styles.notificationDetails}>
          <Text style={styles.detailText}>Nayax ID: {item.nayaxID}</Text>
          <Text style={styles.detailText}>Phone Number: {item.phoneNumber}</Text>
          <Text style={styles.detailText}>Place: {item.place}</Text>
          <Text style={styles.detailText}>Seal: {item.seal}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleTurnOffAlarm(item.alertID)}>
              <MaterialIcons name="alarm-off" size={24} color={colors.fontColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveNotification(item.alertID)}>
              <MaterialIcons name="delete" size={24} color={colors.fontColor} />
            </TouchableOpacity>
          </View>
        </View>
      </Collapsible>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.alertID}
        />
      ) : (
        <Text style={styles.noNotText}>Brak powiadomień</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 25,
    backgroundColor: colors.secondaryBgColor,
  },
  notificationContainer: {
    width: '100%',
  },
  notificationText: {
    color: colors.primaryBgColor,
  },
  noNotText: {
    color: colors.fontColor,
  },
  notification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: colors.fontColor,
    borderRadius: 10,
    width: '100%',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  notificationDetails: {
    padding: 15,
    backgroundColor: colors.secondaryBgColor,
    borderRadius: 10,
    marginBottom: 10,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  detailText: {
    color: colors.fontColor,
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

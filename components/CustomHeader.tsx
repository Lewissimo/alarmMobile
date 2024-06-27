// CustomHeader.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button, TouchableWithoutFeedback } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../config/colors';

const CustomHeader = ({ navigation }: { navigation: any }) => {
  const { userData, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const dropdownRef = useRef<View>(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleOutsideClick = () => {
    setMenuVisible(false);
  };

  const handleChangePassword = () => {
    // Implement password change logic here
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{`${userData?.f_name} ${userData?.l_name}`}</Text>
          <Text style={styles.headerSubtitle}>Administracja</Text>
        </View>
        <TouchableOpacity style={styles.profileContainer} onPress={toggleMenu}>
          <Image
            source={{ uri: userData?.photoUrl || 'https://example.com/default-avatar.png' }} // Default avatar if none
            style={styles.profileImage}
          />
        </TouchableOpacity>
        {menuVisible && (
          <View style={styles.dropdownMenu} ref={dropdownRef}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.menuItem}>Zmień hasło</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await logout();
                navigation.navigate('Login');
              }}
            >
              <Text style={styles.menuItem}>Wyloguj</Text>
            </TouchableOpacity>
          </View>
        )}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Zmień hasło</Text>
              <TextInput
                placeholder="Nowe hasło"
                secureTextEntry
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <View style={styles.modalButtons}>
                <Button title="Zmień" onPress={handleChangePassword} />
                <Button title="Anuluj" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: colors.primaryBgColor,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.fontColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: colors.fontColor,
    fontSize: 12,
  },
  profileContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make the image circular
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownMenu: {
    position: 'absolute',
    bottom: -70,
    right: 30,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CustomHeader;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import ItemDetails from './ItemDetails';
import { colors } from '../../config/colors';
import { useAuth } from '../../context/AuthContext';

type Item = {
  id: string;
  place: string;
  name: string;
  nayax_id: string;
  phoneNum: string;
  seal: string;
};

export type Details = {
  Nazwa: string;
  Lokalizacja: string;
  Plomba: string;
  Telefon: string;
  Nayax_id: string;
};

const ItemList: React.FC = () => {
  const { userData } = useAuth();
  const [items, setItems] = useState<Item[] | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [editable, setEditable] = useState(false);
  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
  });

  useEffect(() => {
    if (userData?.devices && userData.devices.length > 0) {
      const temp: Item[] = userData.devices.map(device => ({
        id: device.id,
        place: device.place,
        name: device.name,
        nayax_id: device.nayax_id,
        phoneNum: device.phoneNum,
        seal: device.seal,
      }));
      setItems(temp);
    }
  }, [userData?.devices]);

  const handleExpand = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      const item = items?.find(item => item.id === id);
      if (item) {
        setInputs({
          input1: item.name,
          input2: item.place,
          input3: item.seal,
          input4: item.phoneNum,
          input5: item.nayax_id,
        });
      }
      setExpandedItem(id);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {items?.map(item => {
        const detailsProps: Details = {
          Nazwa: item.name,
          Lokalizacja: item.place,
          Plomba: item.seal,
          Telefon: item.phoneNum,
          Nayax_id: item.nayax_id,
        };

        return (
          <View key={item.id} style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handleExpand(item.id)}>
              <View style={styles.itemHeader}>
                <Text>{item.seal}</Text>
                <Text>{item.place}</Text>
              </View>
            </TouchableOpacity>
            {expandedItem === item.id && (
              <View style={styles.itemActions}>
                <ItemDetails details={detailsProps} isEditable={editable} inputs={inputs} setInputs={setInputs} />
                {editable ? (
                  <Button
                    title="Zapisz"
                    onPress={() => {
                      setEditable(false);
                      userData?.setDeviceData(item.id, inputs.input1, inputs.input5, inputs.input4, inputs.input2, inputs.input3);
                    }}
                  />
                ) : (
                  <Button title="Edytuj" onPress={() => setEditable(true)} />
                )}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.fontColor,
  },
  itemActions: {
    padding: 10,
    backgroundColor: colors.fontColor,
  },
});

export default ItemList;

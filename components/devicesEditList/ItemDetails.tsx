import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { colors } from '../../config/colors';
import { Details } from './ItemList';
type inpType = {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
}
type DetailsProps = {
  details: Details;
  isEditable: boolean;
  inputs: inpType;
  setInputs: (value: inpType) => void
};

const ItemDetails: React.FC<DetailsProps> = ({ details, isEditable, inputs, setInputs }) => {

  const handleInputChange = (name: string, value: string) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <ScrollView style={styles.detailsContainer}>
      {isEditable ? (
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nazwa</Text>
            <TextInput
              style={styles.input}
              value={inputs.input1}
              onChangeText={(value) => handleInputChange('input1', value)}
              placeholder="Wpisz coś..."
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lokalizacja</Text>
            <TextInput
              style={styles.input}
              value={inputs.input2}
              onChangeText={(value) => handleInputChange('input2', value)}
              placeholder="Wpisz coś..."
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Plompba</Text>
            <TextInput
              style={styles.input}
              value={inputs.input3}
              onChangeText={(value) => handleInputChange('input3', value)}
              placeholder="Wpisz coś..."
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefon</Text>
            <TextInput
              style={styles.input}
              value={inputs.input4}
              onChangeText={(value) => handleInputChange('input4', value)}
              placeholder="Wpisz coś..."
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nayax ID</Text>
            <TextInput
              style={styles.input}
              value={inputs.input5}
              onChangeText={(value) => handleInputChange('input5', value)}
              placeholder="Wpisz coś..."
            />
          </View>
        </View>
      ) : (
        Object.entries(details).map(([key, value]) => (
          <View key={key} style={styles.detailRow}>
            <Text style={styles.detailKey}>{key}: </Text>
            <Text style={styles.detailValue}>{value}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 10,
    backgroundColor: colors.fontColor,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailKey: {
    fontWeight: 'bold',
    flex: 1,
  },
  detailValue: {
    flex: 2,
    textAlign: 'right',
  },
  inputContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    flex: 1,
  },
});

export default ItemDetails;

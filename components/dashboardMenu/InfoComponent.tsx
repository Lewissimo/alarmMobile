import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Information</Text>
      <Text style={styles.text}>
        This app is developed by Kamil Lewiński courtesy of Vemat. All rights reserved. The app is designed for managing an alarm system, providing reliable and intuitive tools for monitoring and controlling security.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});

export default InfoComponent;

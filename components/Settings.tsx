import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.settingInformation}>Setting will be developed in the future</Text>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f0f0f0',
    },
    settingInformation:{
        fontSize: 40
    }
})

export default Settings
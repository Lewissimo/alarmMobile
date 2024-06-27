import React from 'react';
import { View, StyleSheet } from 'react-native';
import ItemList from './ItemList';
import { colors } from '../../config/colors';

const ListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ItemList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.primaryBgColor
  },
});

export default ListScreen;

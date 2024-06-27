import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import NotificationBox from './notificationsList/ListScreen';
import { colors } from '../config/colors';
import MenuScreen from './dashboardMenu/MenuScreen';
import ListScreen from './devicesEditList/ListScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainDashNavigator from './dashboardMenu/MainDashNavigator';

const SwiperComponent: React.FC = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scaleValues = [
    new Animated.Value(1),
    new Animated.Value(1)
  ];

  const goToSlide = (index: number) => {
    swiperRef.current?.scrollTo(index);
    setActiveIndex(index);
  };

  useEffect(() => {
    scaleValues.forEach((value, index) => {
      Animated.spring(value, {
        toValue: index === activeIndex ? 1.2 : 1,
        friction: 4,
        useNativeDriver: true
      }).start();
    });
  }, [activeIndex, scaleValues]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {['Urządzenia', 'Alerty'].map((title, index) => (
          <Animated.View key={index} style={{ transform: [{ scale: scaleValues[index] }] }}>
            <TouchableOpacity onPress={() => goToSlide(index)} style={styles.button}>
              <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={false}
        style={styles.wrapper}
        onIndexChanged={setActiveIndex} // Update active index on swipe
      >
        <SafeAreaView style={styles.slide}>
            <MainDashNavigator />
        </SafeAreaView>
        <View style={styles.slide}>
          <NotificationBox />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 45,
  },
  button: {
    borderRadius: 9,
    width: 150,
    marginHorizontal: 10,
    padding: 10,
  },
  buttonText: {
    color: colors.fontColor,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  wrapper: {
    borderTopColor: 'white',
    borderTopWidth: 1,
    height: 200,
  },
  slide: {
    flex: 1,
    width: '100%'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default SwiperComponent;

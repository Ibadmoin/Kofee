import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Platform, Dimensions } from 'react-native';

const ios = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

const SkeletonLoader = ({ loading, children }) => {
  const animatedValues = {
    element1: useRef(new Animated.Value(0)).current,
    element2: useRef(new Animated.Value(0)).current,
    element3: useRef(new Animated.Value(0)).current,
    element4: useRef(new Animated.Value(0)).current,
    element5: useRef(new Animated.Value(0)).current,
    element6: useRef(new Animated.Value(0)).current,
  };

  useEffect(() => {
    if (loading) {
      animateElement(animatedValues.element1, 0);
      animateElement(animatedValues.element2, 500);
      animateElement(animatedValues.element3, 1000);
      animateElement(animatedValues.element4, 1500);
      animateElement(animatedValues.element5, 2000);
      animateElement(animatedValues.element6, 2500);
    }
  }, [loading, animatedValues]);

  const animateElement = (animatedValue, delay) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  if (loading) {
    return (
      <View style={[styles.container, { borderRadius: 40, height: ios ? height * 0.4 : height * 0.55, width: width * 0.65, marginLeft:10 }]}>
        {/* Skeleton loading UI elements */}
        <Animated.View style={[styles.skeletonElement, { width: '50%', height: 100, borderRadius: 150, position:'relative',top:-15,left:40, opacity: animatedValues.element1 }]} />
        <Animated.View style={[styles.skeletonElement, { width: '70%', height: 30, opacity: animatedValues.element2 }]} />
        <Animated.View style={[styles.skeletonElement, { width: '30%', height: 30, borderRadius: 40, opacity: animatedValues.element3 }]} />
        <Animated.View style={[styles.skeletonElement, { width: '50%', height: 20, opacity: animatedValues.element4 }]} />
        <Animated.View style={[styles.skeletonElement, { width: '30%', height: 60, borderRadius: 150, position: 'absolute', bottom: 10, right: 10, opacity: animatedValues.element5 }]} />
        <Animated.View style={[styles.skeletonElement, { width: '50%', height: 35, position: 'absolute', bottom: 15, left: 20, opacity: animatedValues.element6 }]} />
        {/* Add more skeleton elements as needed */}
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    // Adjust styles as needed
  },
  skeletonElement: {
    height: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginVertical: 6,
  },
});

export default SkeletonLoader;

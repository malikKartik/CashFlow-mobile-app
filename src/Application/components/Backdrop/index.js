import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const Backdrop = (props) => {
  const styles = styleSheet(props);
  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={props.onPress}></View>
  );
};

const styleSheet = () => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: height,
      backgroundColor: 'transparent',
      flex: 1,
    },
  });
};

export default Backdrop;

import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const Backdrop = (props) => {
  const styles = styleSheet(props);
  return (
    <View style={styles.container} onStartShouldSetResponder={props.onPress}>
      {props.children}
    </View>
  );
};

const styleSheet = (props) => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: width,
      height: height,
      backgroundColor: props.backgroundColor ? props.backgroundColor : 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default Backdrop;

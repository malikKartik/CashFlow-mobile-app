import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = (props) => {
  const styles = styleSheet(props);
  if (typeof props.height === 'string' || typeof props.width === 'string') {
    throw new Error('height and width of card should be a number!');
  }
  return (
    <View style={styles.innerContainer}>
      <View style={styles.left}>{props.left}</View>
      <View style={styles.right}>{props.right}</View>
    </View>
  );
};

const styleSheet = (props) => {
  return StyleSheet.create({
    container: {
      width: props.width ? props.width : '100%',
      height: props.height ? props.height : 63,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E5E5E5',
      borderRadius: props.borderRadius ? props.borderRadius : 7,
      elevation: 3,
    },
    innerContainer: {
      height: props.height ? props.height : 62,
      width: props.width ? props.width : '100%',
      backgroundColor: props.backgroundColor ? props.backgroundColor : 'white',
      borderRadius: props.borderRadius ? props.borderRadius : 7,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 3,
    },
    left: {
      position: 'absolute',
      left: 10,
    },
    right: {
      position: 'absolute',
      right: 10,
    },
  });
};
export default Card;

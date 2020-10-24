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
    innerContainer: {
      height: props.height ? props.height : 62,
      width: props.width ? props.width : '100%',
      backgroundColor: props.backgroundColor ? props.backgroundColor : 'white',
      borderColor: props.borderColor ? props.borderColor : 'transparent',
      borderWidth: props.borderWidth ? props.borderWidth : 1,
      borderRadius: props.borderRadius ? props.borderRadius : 7,
      marginVertical: props.marginVertical ? props.marginVertical : 0,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: props.elevation ? props.elevation : 3,
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

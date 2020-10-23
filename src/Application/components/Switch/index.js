import React from 'react';
import {View, StyleSheet} from 'react-native';

const Switch = (props) => {
  const styles = styleSheet(props);
  return (
    <>
      <View
        style={props.active ? styles.mainActive : styles.mainInactive}
        onStartShouldSetResponder={props.onPress}>
        <View
          style={
            props.active ? styles.switchActive : styles.switchInactive
          }></View>
      </View>
    </>
  );
};

const styleSheet = (props) => {
  return StyleSheet.create({
    mainInactive: {
      marginVertical: 5,
      width: props.size ? props.size * 2 : 16 * 2,
      height: props.size ? props.size : 16,
      borderRadius: props.size ? props.size / 2 : 16 / 2,
      backgroundColor: props.inactiveBackgroundColor
        ? props.inactiveBackgroundColor
        : 'grey',
    },
    switchInactive: {
      height: props.size ? props.size + 4 : 16 + 4,
      width: props.size ? props.size + 4 : 16 + 4,
      borderRadius: props.size ? props.size / 2 + 2 : 16 / 2 + 2,
      backgroundColor: props.switchColor ? props.switchColor : '#e2e2e2',
      position: 'absolute',
      top: -2,
      left: 0,
      borderWidth: 2,
      elevation: 2,
      borderColor: props.inactiveBackgroundColor
        ? props.inactiveBackgroundColor
        : 'grey',
    },
    mainActive: {
      marginVertical: 5,
      width: props.size ? props.size * 2 : 16 * 2,
      height: props.size ? props.size : 16,
      borderRadius: props.size ? props.size / 2 : 16 / 2,
      backgroundColor: props.activeBackgroundColor
        ? props.activeBackgroundColor
        : '#6262e2',
    },
    switchActive: {
      height: props.size ? props.size + 4 : 16 + 4,
      width: props.size ? props.size + 4 : 16 + 4,
      borderRadius: props.size ? props.size / 2 + 2 : 16 / 2 + 2,
      backgroundColor: props.switchColor ? props.switchColor : '#e2e2e2',
      position: 'absolute',
      top: -2,
      right: 0,
      borderWidth: 2,
      elevation: 2,
      borderColor: props.activeBackgroundColor
        ? props.activeBackgroundColor
        : '#6262e2',
    },
  });
};

export default Switch;

import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Input = (props) => {
  const styles = styleSheet(props);
  return (
    <View style={styles.inputContainer}>
      {props.label ? <Text style={styles.label}>{props.label}</Text> : null}
      {props.icon ? (
        <View style={styles.iconInput}>
          <View style={styles.iconStyle}>{props.icon}</View>
          <TextInput
            style={styles.iconInputField}
            placeholder={props.placeholder}
            onChangeText={(e) => props.onChangeText(e)}
            value={props.value}
            textContentType={
              props.contentType ? props.contentType : 'none'
            }></TextInput>
        </View>
      ) : (
        <TextInput
          placeholder={props.placeholder}
          style={styles.inputComp}
          onChangeText={(e) => props.onChangeText(e)}
          value={props.value}
          textContentType={
            props.contentType ? props.contentType : 'none'
          }></TextInput>
      )}
    </View>
  );
};

const styleSheet = (props) => {
  return StyleSheet.create({
    inputContainer: {
      width: '100%',
      height: 55,
    },
    inputComp: {
      width: '100%',
      height: props.height ? props.height : 37,
      borderColor: 'rgba(0, 0, 0, 0.29)',
      borderRadius: props.borderRadius ? props.borderRadius : 7,
      borderWidth: 1,
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: props.labelStyle
      ? {...props.labelStyle, marginBottom: 6, marginLeft: 6}
      : {
          fontSize: 12,
          fontFamily: 'Roboto-Regular',
          marginBottom: 6,
          marginLeft: 6,
        },
    iconInput: {
      height: 37,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconInputField: {
      width: '100%',
      height: props.height ? props.height : 37,
      borderColor: 'rgba(0, 0, 0, 0.29)',
      borderRadius: props.borderRadius ? props.borderRadius : 7,
      borderWidth: 1,
      paddingTop: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      paddingLeft: 45,
    },
    iconStyle: {
      position: 'absolute',
      left: 10,
    },
  });
};
export default Input;

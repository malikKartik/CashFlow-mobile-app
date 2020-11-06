import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import TextCurrency from '../Text';
const Input = (props) => {
  const styles = styleSheet(props);
  return (
    <View style={styles.inputContainer}>
      <>
        {props.label ? <Text style={styles.label}>{props.label}</Text> : null}
        {props.isAmount ? (
          <>
            <View style={styles.amountInput}>
              <TextInput
                style={styles.amountInputField}
                placeholder={props.placeholder}
                onChangeText={(e) => props.onChangeText(e, props.id)}
                value={props.value}
                textContentType={
                  props.contentType ? props.contentType : 'none'
                }></TextInput>
              <View style={styles.currency}>
                <TextCurrency marginVertical={0} size={18} color="white">
                  {props.currency ? props.currency : 'INR'}
                </TextCurrency>
              </View>
            </View>
          </>
        ) : props.icon ? (
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
        {props.error ? (
          <View>
            <Text style={styles.error}>{props.errorMessage}</Text>
          </View>
        ) : null}
      </>
    </View>
  );
};

const styleSheet = (props) => {
  return StyleSheet.create({
    inputContainer: {
      width: '100%',
      height: 55,
      marginVertical: props.marginVertical ? props.marginVertical : 10,
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
    amountInput: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    amountInputField: {
      width: props.sizeMini ? '50%' : '80%',
      height: props.height ? props.height : 37,
      borderColor: 'rgba(0, 0, 0, 0.29)',
      borderTopLeftRadius: props.borderRadius ? props.borderRadius : 7,
      borderBottomLeftRadius: props.borderRadius ? props.borderRadius : 7,
      borderWidth: 1,
      paddingTop: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    currency: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: props.sizeMini ? '50%' : '20%',
      backgroundColor: props.currencyBgColor
        ? props.currencyBgColor
        : '#9392ff',
      borderTopRightRadius: props.borderRadius ? props.borderRadius : 7,
      borderBottomRightRadius: props.borderRadius ? props.borderRadius : 7,
    },
    error: {
      color: 'red',
      fontSize: 10,
    },
  });
};
export default Input;

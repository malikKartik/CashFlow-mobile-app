import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Button from '../Button';
import {
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {height, width} = Dimensions.get('window');
import Backdrop from '../Backdrop';
const Dropdown = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.selectedValue.label);
  const [show, setShow] = useState(false);
  const styles = stylesheet(props, show);
  const showOptions = () => {
    setShow(!show);
  };
  const hideOptions = () => {
    setShow(false);
  };
  const handleSelectOption = (id, label) => {
    setSelectedValue(label);
    setShow(false);
    if (props.onChange) props.onChange({id: id, label: label});
  };
  return (
    <View>
      {show ? (
        <Backdrop
          onPress={hideOptions}
          backgroundColor={props.backdropColor}></Backdrop>
      ) : null}
      <TouchableWithoutFeedback style={styles.dropdown} onPress={showOptions}>
        <Text style={styles.label}>{selectedValue}</Text>
        <AntDesign
          name={show ? 'caretup' : 'caretdown'}
          size={15}
          color={props.iconColor ? props.iconColor : 'black'}
          style={{position: 'absolute', right: 10}}></AntDesign>
      </TouchableWithoutFeedback>
      {show ? (
        <ScrollView
          style={styles.options}
          contentContainerStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {props.options.map((item) => {
            return (
              <View style={styles.option} key={item.id}>
                <Button
                  width="100%"
                  onPress={() => handleSelectOption(item.id, item.label)}
                  buttonColor="white"
                  textColor="black"
                  title={item.label}></Button>
              </View>
            );
          })}
        </ScrollView>
      ) : null}
    </View>
  );
};

const stylesheet = (props, show) => {
  return StyleSheet.create({
    dropdown: {
      width: props.width ? props.width : '100%',
      height: props.height ? props.height : 37,
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      borderTopLeftRadius: props.borderRadius ? props.borderRadius : 5,
      borderTopRightRadius: props.borderRadius ? props.borderRadius : 5,
      borderBottomLeftRadius: show
        ? 0
        : props.borderRadius
        ? props.borderRadius
        : 5,
      borderBottomRightRadius: show
        ? 0
        : props.borderRadius
        ? props.borderRadius
        : 5,
      alignItems: 'center',
      backgroundColor: props.backgroundColor ? props.backgroundColor : 'white',
      flexDirection: 'row',
      elevation: 2,
      zIndex: 200,
    },
    options: {
      width: props.width ? props.width : '100%',
      maxHeight: props.maxHeight ? props.maxHeight : 140,
      borderBottomLeftRadius: props.borderRadius ? props.borderRadius : 5,
      borderBottomRightRadius: props.borderRadius ? props.borderRadius : 5,
      backgroundColor: props.optionsBackgroundColor
        ? props.optionsBackgroundColor
        : 'white',
      position: 'absolute',
      zIndex: 100,
      top: props.height ? props.height : 37,
      elevation: 2,
    },
    option: {
      width: '100%',
      height: props.optionHeight ? props.optionHeight : 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: props.borderRadius ? props.borderRadius : 5,
      borderBottomRightRadius: props.borderRadius ? props.borderRadius : 5,
    },
    label: props.optionStyle
      ? props.optionStyle
      : {
          fontFamily: 'Roboto-Regular',
          fontSize: 14,
        },
  });
};

export default Dropdown;

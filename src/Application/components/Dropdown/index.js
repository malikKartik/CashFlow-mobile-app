import React from 'react';
import {Picker} from '@react-native-community/picker';
import {View, Text, StyleSheet} from 'react-native';

const Dropdown = (props) => {
  const styles = stylesheet(props);
  return (
    <View>
      <Picker
        selectedValue={props.value}
        style={styles.dropdown}
        onValueChange={(itemValue, itemIndex) => props.onChange(itemValue)}>
        {props.options.map((item) => {
          return (
            <Picker.Item
              label={item.label}
              value={item.value}
              key={Math.random()}
            />
          );
        })}
      </Picker>
    </View>
  );
};

const stylesheet = (props) => {
  return StyleSheet.create({
    dropdown: {
      width: '100%',
      height: 37,
      borderColor: 'rgba(0, 0, 0, 0.29)',
      borderRadius: props.borderRadius ? props.borderRadius : 7,
      borderWidth: 1,
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
  });
};

export default Dropdown;

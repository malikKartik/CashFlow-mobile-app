import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MultiCheckbox from './MultiCheckbox';
import SingleCheckBox from './SingleCheckbox';

const Checkbox = (props) => {
  return props.type === 'list' ? (
    <MultiCheckbox {...props}></MultiCheckbox>
  ) : (
    <SingleCheckBox {...props}></SingleCheckBox>
  );
};

export default Checkbox;

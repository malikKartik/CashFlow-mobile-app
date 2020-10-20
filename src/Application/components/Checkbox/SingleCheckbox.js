import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SingleCheckBox = (props) => {
  const [checked, setChecked] = useState(props.checked);
  const styles = stylesheet(props, checked);
  const handleChecked = async () => {
    await setChecked(!checked);
    props.onChange({id: props.id, checked: !checked});
  };
  return (
    <View style={styles.checkbox}>
      {props.reverse ? <Text style={styles.label}>{props.label}</Text> : null}
      <TouchableWithoutFeedback
        style={styles.box}
        onPress={() => handleChecked()}>
        {checked ? (
          props.checkedIcon ? (
            props.checkedIcon
          ) : (
            <AntDesign
              color={props.checkColor ? props.checkColor : 'white'}
              size={12}
              name="check"></AntDesign>
          )
        ) : props.uncheckedIcon ? (
          props.uncheckedIcon
        ) : null}
      </TouchableWithoutFeedback>
      {props.reverse ? null : <Text style={styles.label}>{props.label}</Text>}
    </View>
  );
};

const stylesheet = (props, checked) => {
  return StyleSheet.create({
    checkbox: {
      display: 'flex',
      flexDirection: 'row',
      height: 26,
      alignItems: 'center',
    },
    box: {
      height: props.height ? props.height : 16,
      width: props.width ? props.width : 16,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#A7A7A7',
      backgroundColor: checked
        ? props.checkedColor
          ? props.checkedColor
          : 'black'
        : props.uncheckedColor
        ? props.uncheckedColor
        : 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 6,
      marginLeft: props.reverse ? 6 : 0,
    },
    label: props.labelStyle
      ? props.labelStyle
      : {
          fontFamily: 'Roboto-Regular',
          fontSize: 12,
        },
  });
};

export default SingleCheckBox;

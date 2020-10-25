import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const Button = (props) => {
  const styles = styleSheet(props);

  //   Error Handling
  if (!props.title) {
    throw new Error('Must pass a title prop in the Button component!');
  }

  //   Local components
  const BlockButton = () => (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
  const TextButton = () => (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.containerTextButton}>
        <Text style={styles.textTextButton}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  //   Return
  return props.type ? (
    props.type === 'text' ? (
      <TextButton></TextButton>
    ) : (
      <BlockButton></BlockButton>
    )
  ) : (
    <BlockButton></BlockButton>
  );
};

const styleSheet = (props) => {
  return StyleSheet.create({
    container: {
      width: props.width ? props.width : 100,
      height: props.height ? props.height : 35,
      backgroundColor: props.buttonColor ? props.buttonColor : '#9392ff',
      borderRadius: props.borderRadius ? props.borderRadius : 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: props.marginVertical ? props.marginVertical : 5,
      alignSelf: props.alignSelf ? props.alignSelf : 'auto',
    },
    containerTextButton: {
      width: props.width ? props.width : 100,
      height: props.height ? props.height : 25,
      backgroundColor: props.buttonColor ? props.buttonColor : '#9392ff00',
      borderRadius: props.borderRadius ? props.borderRadius : 5,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: props.alignSelf ? props.alignSelf : 'auto',
    },
    text: {
      color: props.textColor ? props.textColor : 'white',
    },
    textTextButton: {
      color: props.textColor ? props.textColor : '#9392ff',
    },
  });
};

export default Button;

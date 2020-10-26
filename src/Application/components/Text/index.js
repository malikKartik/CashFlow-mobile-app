import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TextComp = (props) => {
  const styles = styleSheet(props);
  let textType = {};
  switch (props.type) {
    case 'heading':
      textType = styles.heading;
      break;
    case 'sub-heading':
      textType = styles.subHeading;
      break;
    case 'content':
      textType = styles.content;
      break;
    case 'sub-content':
      textType = styles.subContent;
      break;
    default:
      textType = styles.content;
      break;
  }
  return (
    <>
      <Text style={{...styles.main, ...textType, ...props.style}}>
        {props.children}
      </Text>
    </>
  );
};

const styleSheet = (props) => {
  return StyleSheet.create({
    main: {
      marginVertical: 5,
      fontFamily: 'Roboto-Light',
      color: props.color
        ? props.color
        : props.amountType
        ? props.amountType === 'debit'
          ? 'red'
          : props.amountType === 'credit'
          ? 'green'
          : 'black'
        : 'black',
      textAlign: props.textAlign ? props.textAlign : 'left',
    },
    heading: {
      fontSize: props.size ? props.size : 26,
      marginVertical: props.marginVertical ? props.marginVertical : 10,
      fontFamily: 'Roboto-Light',
    },
    subHeading: {
      fontSize: props.size ? props.size : 16,
      fontFamily: 'Roboto-Light',
    },
    content: {
      fontSize: props.size ? props.size : 18,
      fontFamily: 'Roboto-Regular',
    },
    subContent: {
      fontSize: props.size ? props.size : 14,
      fontFamily: 'Roboto-Light',
    },
  });
};

export default TextComp;

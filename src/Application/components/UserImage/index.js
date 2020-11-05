import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const UserImage = (props) => {
  const styles = styleSheet(props);

  return (
    <View style={styles.bg}>
      {props.image ? (
        <Image source={{uri: props.image}} style={styles.image}></Image>
      ) : (
        <Text style={styles.text}>
          {(props.firstName ? props.firstName.toUpperCase().charAt(0) : null) +
            (props.lastName ? props.lastName.toUpperCase().charAt(0) : null)}
        </Text>
      )}
    </View>
  );
};

const styleSheet = (props) => {
  return StyleSheet.create({
    bg: {
      backgroundColor: props.backgroundColor ? props.backgroundColor : 'black',
      width: props.width ? props.width : 50,
      height: props.height ? props.height : 50,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: props.fontSize ? props.fontSize : 16,
      color: 'white',
      fontFamily: 'Roboto-Medium',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },
  });
};

export default UserImage;

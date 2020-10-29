import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
const Card = (props) => {
  return (
    <View
      style={{
        borderRadius: 5,
        height: 300,
        width: '100%',
        padding: 50,
        marginTop: '6%',
      }}>
      <Image source={props.source} style={styles.image}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Card;

import React from 'react';
import {TouchableWithoutFeedback, Image, View, StyleSheet} from 'react-native';
import AddTransaction from './AddTransaction';

const Team = (props) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate('Main Tab')}>
        <Image
          source={require('../../../../asstes/icons/back.png')}
          style={{marginLeft: 20, alignSelf: 'flex-start'}}></Image>
      </TouchableWithoutFeedback>
      <AddTransaction></AddTransaction>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
});

export default Team;

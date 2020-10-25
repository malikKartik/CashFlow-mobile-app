import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import addMember from '../../../../../asstes/icons/addMember.png';
import TextComp from '../../../components/Text';
import * as colors from '../../../constants/ColorConstants';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const AddMember = (props) => {
  const [username, setUsername] = useState('');
  const inputChangeHandler = (e) => {
    setUsername(e);
  };
  return (
    <View style={styles.container}>
      <View style={styles.sub}>
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <Image
            source={require('../../../../../asstes/icons/back.png')}></Image>
        </TouchableWithoutFeedback>
        <Image source={addMember} style={styles.memberImage}></Image>
        <TextComp type="heading" color={colors.primary} textAlign="center">
          Add Member
        </TextComp>
        <Input
          label="Username"
          placeholder="Enter username"
          value={username}
          onChangeText={inputChangeHandler}></Input>
        <Button title="Add" marginVertical={20} alignSelf="center"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },
  sub: {
    marginTop: 20,
    width: '90%',
  },
  memberImage: {
    height: 240,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default AddMember;

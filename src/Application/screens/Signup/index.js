import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import signupImage from '../../../../asstes/icons/signup.png';
import TextComp from '../../components/Text/index';
import Input from '../../components/Input/index';
import * as colors from '../../constants/ColorConstants';
import Button from '../../components/Button';
import google from '../../../../asstes/icons/google.png';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {post} from '../../requests';

const Signup = (props) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
  });
  const handleInputChange = (e, type) => {
    setInput({
      ...input,
      [type]: e,
    });
  };
  const signup = () => {
    post({
      route: '/api/users/signup',
      body: {
        ...input,
      },
    })
      .then((data) => {
        console.log(data);
        setInput({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          username: '',
        });
        props.navigation.navigate('Login');
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      <View style={{width: '90%', height: '100%'}}>
        <Image source={signupImage} style={styles.signupImage}></Image>
        <TextComp type="heading" color={colors.primary} textAlign="center">
          Signup
        </TextComp>
        <Input
          label="Email Id"
          placeholder="Enter Email Address"
          value={input.email}
          onChangeText={(e) => handleInputChange(e, 'email')}></Input>
        <View style={styles.name}>
          <View style={{width: '47%'}}>
            <Input
              label="First Name"
              placeholder="First Name"
              value={input.firstName}
              onChangeText={(e) => handleInputChange(e, 'firstName')}></Input>
          </View>
          <View style={{width: '47%'}}>
            <Input
              label="Last Name"
              placeholder="Last Name"
              value={input.lastName}
              onChangeText={(e) => handleInputChange(e, 'lastName')}></Input>
          </View>
        </View>
        <Input
          label="Username"
          placeholder="Enter Username"
          value={input.username}
          onChangeText={(e) => handleInputChange(e, 'username')}></Input>
        <Input
          label="Password"
          placeholder="Enter Password"
          value={input.password}
          onChangeText={(e) => handleInputChange(e, 'password')}></Input>
        <View style={styles.button}>
          <Button title="Signup" type="button" onPress={signup}></Button>
        </View>
        <View style={{width: '100%', alignItems: 'center', marginBottom: 20}}>
          <Button
            type="text"
            textColor={colors.primary}
            title="Already a cashflow member? Signin!"
            width="100%"
            onPress={() => props.navigation.navigate('Login')}></Button>
        </View>
        <TextComp type="sub-content" textAlign="center">
          Signup using:
        </TextComp>
        <TouchableWithoutFeedback style={{alignSelf: 'center', marginTop: 16}}>
          <Image source={google}></Image>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    marginTop: 22,
  },
  signupImage: {
    height: 200,
    width: '100%',
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 28,
    width: '100%',
    alignItems: 'center',
  },
});
export default Signup;

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
import {inputChangeHandler} from '../../constants/utilityFunctions';

const Signup = (props) => {
  //TODO- Outsource as model
  const [input, setInput] = useState({
    email: {
      value: '',
      validation: {
        required: true,
        regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
      },
      valid: false,
      touched: false,
      errorMessage: '* required, should be a valid email',
    },
    password: {
      value: '',
      validation: {
        required: true,
        minLength: 8,
      },
      valid: false,
      touched: false,
      errorMessage: '* required, minimum 8 characters',
    },
    firstName: {
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errorMessage: '* required',
    },
    lastName: {
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errorMessage: '* required',
    },
    username: {
      value: '',
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
      errorMessage: '* required, minimum 5 characters',
    },
  });
  const [valid, setValid] = useState(false);
  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState('');

  const handleInputChange = (e, type) => {
    const [validity, updatedInput] = inputChangeHandler(input, e, type);
    setValid(validity);
    setInput(updatedInput);
  };

  const signup = () => {
    post({
      route: '/api/users/signup',
      body: {
        email: input.email.value,
        password: input.password.value,
        firstName: input.firstName.value,
        lastName: input.lastName.value,
        username: input.username.value,
        otp: otp,
      },
    })
      .then((data) => {
        if (data.message == 'User created!') {
          props.navigation.navigate('Login');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendOtp = () => {
    post({route: '/api/users/sendOtp', body: {email: input.email.value}})
      .then((data) => {
        setVerify(true);
      })
      .catch((err) => {
        console.log(err);
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
          value={input.email.value}
          error={input.email.touched && !input.email.valid}
          errorMessage={input.email.errorMessage}
          onChangeText={(e) => handleInputChange(e, 'email')}></Input>
        <View style={styles.name}>
          <View style={{width: '47%'}}>
            <Input
              label="First Name"
              placeholder="First Name"
              value={input.firstName.value}
              error={input.firstName.touched && !input.firstName.valid}
              errorMessage={input.firstName.errorMessage}
              onChangeText={(e) => handleInputChange(e, 'firstName')}></Input>
          </View>
          <View style={{width: '47%'}}>
            <Input
              label="Last Name"
              placeholder="Last Name"
              value={input.lastName.value}
              error={input.lastName.touched && !input.lastName.valid}
              errorMessage={input.lastName.errorMessage}
              onChangeText={(e) => handleInputChange(e, 'lastName')}></Input>
          </View>
        </View>
        <Input
          label="Username"
          placeholder="Enter Username"
          value={input.username.value}
          error={input.username.touched && !input.username.valid}
          errorMessage={input.username.errorMessage}
          onChangeText={(e) => handleInputChange(e, 'username')}></Input>
        <Input
          label="Password"
          placeholder="Enter Password"
          value={input.password.value}
          error={input.password.touched && !input.password.valid}
          errorMessage={input.password.errorMessage}
          onChangeText={(e) => handleInputChange(e, 'password')}></Input>
        {verify ? (
          <>
            <Input
              label="OTP"
              placeholder="Enter OTP"
              value={otp}
              onChangeText={(e) => setOtp(e)}></Input>
            <View
              style={{width: '100%', alignItems: 'center', marginBottom: 20}}>
              <Button
                type="text"
                textColor={colors.primary}
                title="Resend OTP"
                width="100%"
                onPress={sendOtp}></Button>
            </View>
          </>
        ) : null}
        <View style={styles.button}>
          <Button
            title={verify ? 'Register' : 'Send Otp'}
            type="button"
            onPress={verify ? signup : sendOtp}
            disabled={verify ? (otp ? false : true) : !valid}></Button>
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
        <TouchableWithoutFeedback
          style={{alignSelf: 'center', marginVertical: 16}}>
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
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
});
export default Signup;

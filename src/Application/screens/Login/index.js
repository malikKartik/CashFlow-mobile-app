import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, AsyncStorage, Image} from 'react-native';
import loginImage from '../../../../asstes/icons/loginimage.png';
import * as colors from '../../constants/ColorConstants';
import TextComp from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import google from '../../../../asstes/icons/google.png';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import {inputChangeHandler} from '../../constants/utilityFunctions';

const Login = (props) => {
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
  });
  const [valid, setValid] = useState(false);
  const handleInputChange = (e, type) => {
    const [validity, updatedInput] = inputChangeHandler(input, e, type);
    setValid(validity);
    setInput(updatedInput);
  };
  const login = async () => {
    props.onLogin({
      username: input.email.value,
      password: input.password.value,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{width: '90%', height: '100%'}}>
        <View style={styles.sub}>
          <Image source={loginImage} style={styles.loginImage}></Image>
        </View>
        <TextComp type="heading" color={colors.primary} textAlign="center">
          Login
        </TextComp>
        <Input
          label="Email Id"
          placeholder="Enter Email Address"
          value={input.email.value}
          error={input.email.touched && !input.email.valid}
          errorMessage={input.email.errorMessage}
          onChangeText={(val) => handleInputChange(val, 'email')}></Input>
        <Input
          label="Password"
          placeholder="Enter Password"
          value={input.password.value}
          error={input.password.touched && !input.password.valid}
          errorMessage={input.password.errorMessage}
          onChangeText={(val) => handleInputChange(val, 'password')}></Input>
        <View style={styles.button}>
          <Button
            title="Login"
            type="button"
            onPress={login}
            disabled={!valid}></Button>
        </View>
        <View style={{width: '100%', alignItems: 'center', marginBottom: 20}}>
          <Button
            type="text"
            textColor={colors.primary}
            title="Not a member already? Signup!"
            width="100%"
            onPress={() => props.navigation.navigate('Signup')}></Button>
        </View>
        <TextComp type="sub-content" textAlign="center">
          Login using:
        </TextComp>
        <TouchableWithoutFeedback style={{alignSelf: 'center', marginTop: 16}}>
          <Image source={google}></Image>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
  },
  sub: {
    width: '100%',
    height: '30%',
    marginTop: 20,
  },
  loginImage: {
    height: '100%',
    width: '100%',
  },
  button: {
    marginTop: 28,
    width: '100%',
    alignItems: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: ({username, password}) =>
      dispatch(actions.login({username, password})),
  };
};
const mapStateToProps = (state) => {
  const auth = state.auth;
  return {auth};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, AsyncStorage, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import IntroductionScreens from './src/IntroductionScreens';
import Application from './src/Application';
import {connect} from 'react-redux';
import * as actions from './src/store/actions';

const App = (props) => {
  const [isIntroduced, setIsIntroduced] = useState(false);
  useEffect(() => {
    const func = async () => {
      const token = await AsyncStorage.getItem('token');
      const storageIntroducedVal = await AsyncStorage.getItem('isIntroduced');
      if (storageIntroducedVal === 'true') {
        setIsIntroduced(true);
        if (!token || props.isLoggedIn) SplashScreen.hide();
        if (!token) return;
        if (props.isLoggedIn) return;
        await props.onValidate({
          token,
          hideSplashScreen: () => {
            SplashScreen.hide();
          },
        });
      } else {
        SplashScreen.hide();
      }
    };
    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      if (props.isLoggedIn) {
        await AsyncStorage.setItem('token', props.token);
      } else {
        await AsyncStorage.removeItem('token');
      }
    };
    func();
  }, [props.isLoggedIn]);

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {!isIntroduced ? (
        <IntroductionScreens setIsIntroduced={setIsIntroduced} />
      ) : (
        <Application />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: ({token, hideSplashScreen}) =>
      dispatch(actions.validate({token, hideSplashScreen})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

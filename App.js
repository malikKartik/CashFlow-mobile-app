import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, AsyncStorage, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import IntroductionScreens from './src/IntroductionScreens';
import Application from './src/Application';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isIntroduced, setIsIntroduced] = useState(false);
  useEffect(() => {
    const func = async () => {
      const storageIntroducedVal = await AsyncStorage.getItem('isIntroduced');
      const storageLoggedInVal = await AsyncStorage.getItem('isLoggedIn');
      if (storageIntroducedVal === 'true') setIsIntroduced(true);
      if (storageLoggedInVal === 'true') setIsLoggedIn(true);
      SplashScreen.hide();
    };
    func();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {!isIntroduced ? (
        <IntroductionScreens
          setIsLoggedIn={setIsLoggedIn}
          setIsIntroduced={setIsIntroduced}
        />
      ) : (
        <Application isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
};

export default App;

import React, {useEffect, useState} from 'react';
import { SafeAreaView,Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import IntroductionScreens from './src/IntroductionScreens'
import Application from './src/Application'

const App = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [isIntroduced,setIsIndroduced] = useState(false)
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
    <SafeAreaView>
      {(!isLoggedIn && !isIntroduced) ? <IntroductionScreens/>:<Application/>}
    </SafeAreaView>
  );
};

export default App;

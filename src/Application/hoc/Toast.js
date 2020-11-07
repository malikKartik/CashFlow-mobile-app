import React, {useRef, useState} from 'react';
import {View, Dimensions, Animated, Easing, Button} from 'react-native';
const {height, width} = Dimensions.get('window');
const Toast = (props) => {
  const value = useRef(new Animated.Value(-100)).current;
  const [toastVis, setToastVis] = useState(false);

  const bringDown = () => {
    if (toastVis) {
      Animated.timing(value, {
        toValue: -100,
        easing: Easing.back(),
        duration: 2000,
        useNativeDriver: false,
      }).start();
      setToastVis(!toastVis);
    } else {
      Animated.timing(value, {
        toValue: 100,
        easing: Easing.elastic(1),
        duration: 2000,
        useNativeDriver: false,
      }).start();
      setToastVis(!toastVis);
    }
  };

  return (
    <View style={{position: 'absolute', top: 0, left: 0, width: '100%'}}>
      {/* <Animated.View
        style={{
          top: 0,
          marginTop: value,
          position: 'absolute',
          height: 80,
          width: '90%',
          backgroundColor: '#2e2e2e',
          zIndex: 100,
          alignSelf: 'center',
          borderRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          borderBottomWidth: 5,
          borderBottomColor: 'rgba(0,255,0,1)',
        }}></Animated.View>
      <Button title="asdf" onPress={() => bringDown()}></Button> */}
      <View style={{position: 'absolute', top: 0, left: 0, width: '100%'}}>
        {props.children}
      </View>
    </View>
  );
};

export default Toast;

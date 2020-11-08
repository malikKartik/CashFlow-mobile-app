import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions, Animated, Easing, Button, Image} from 'react-native';
import Text from '../components/Text';
const {height, width} = Dimensions.get('window');
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const Toast = (props) => {
  const value = useRef(new Animated.Value(-100)).current;
  const [toastVis, setToastVis] = useState(false);
  const timerWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (props.auth.isError) {
      Animated.timing(value, {
        toValue: 50,
        easing: Easing.elastic(1),
        duration: 1000,
        useNativeDriver: false,
      }).start();
      Animated.timing(timerWidth, {
        toValue: width,
        duration: 2000,
        delay: 1000,
        useNativeDriver: false,
      }).start();

      setTimeout(() => {
        props.onUnsetError();
        Animated.timing(value, {
          toValue: -100,
          easing: Easing.back(),
          duration: 1000,
          useNativeDriver: false,
        }).start();
        Animated.timing(timerWidth, {
          toValue: 0,
          delay: 1000,
          duration: 0,
          useNativeDriver: false,
        }).start();
      }, 3000);
    }
  }, [props.auth]);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}>
      {/* TOAST */}
      <Animated.View
        style={{
          bottom: 0,
          marginBottom: value,
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
          overflow: 'hidden',
        }}>
        <Animated.View
          style={{
            height: 4,
            width: timerWidth,
            backgroundColor: 'rgba(0,255,0,1)',
          }}></Animated.View>
        <Text size={6}></Text>
        <Text color="white" textAlign="center">
          {props.auth.error}
        </Text>
      </Animated.View>

      {props.auth.isLoading ? (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            backgroundColor: 'white',
            opacity: 0.8,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../../asstes/loading.gif')}
            style={{width: '100%'}}></Image>
        </View>
      ) : null}
      {/* <Button title="asdf" onPress={() => props.onSetError()}></Button> */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}>
        {props.children}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetError: () => {
      dispatch(actions.setError('asdf'));
    },
    onUnsetError: () => dispatch(actions.unsetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);

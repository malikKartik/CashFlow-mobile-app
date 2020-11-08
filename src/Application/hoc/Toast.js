import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions, Animated, Easing, Button} from 'react-native';
const {height, width} = Dimensions.get('window');
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const Toast = (props) => {
  const value = useRef(new Animated.Value(-100)).current;
  const [toastVis, setToastVis] = useState(false);

  useEffect(() => {
    if (props.auth.isError) {
      Animated.timing(value, {
        toValue: 50,
        easing: Easing.elastic(1),
        duration: 1000,
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
      }, 2000);
    }
  }, [props.auth]);

  return (
    <View style={{position: 'absolute', top: 0, left: 0, width: '100%'}}>
      <Animated.View
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
      {/* <Button title="asdf" onPress={() => props.onSetError()}></Button> */}
      <View style={{position: 'absolute', top: 0, left: 0, width: '100%'}}>
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

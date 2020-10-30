import * as actionTypes from './actionTypes';

const loginHelper = (data) => {
  return {
    type: actionTypes.LOGIN,
    data,
  };
};

export const login = ({username, password}) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(loginHelper({token: 'asdfkjh2n41l13284607125lfjasdf089'}));
    }, 2000);
  };
};

export const setLoading = () => {
  return {
    type: actionTypes.SET_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: actionTypes.STOP_LOADING,
  };
};

export const setError = (error) => {
  return {
    type: actionTypes.SET_ERROR,
    error,
  };
};

export const unsetError = () => {
  return {
    type: actionTypes.UNSET_ERROR,
  };
};

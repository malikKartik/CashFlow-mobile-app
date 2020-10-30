import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  isLoggedIn: false,
  isIntroduced: false,
  token: '',
  isLoading: false,
  error: '',
  isError: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data.token,
      };
    case actionTypes.LOGOUT:
      return state;
    case actionTypes.INTRODUCED:
      return state;
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.SET_ERROR: {
      return {
        ...state,
        isError: true,
        error: action.error,
      };
    }
    case actionTypes.UNSET_ERROR: {
      return {
        ...state,
        isError: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;

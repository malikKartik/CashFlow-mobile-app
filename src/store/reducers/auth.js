import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  isLoggedIn: false,
  token: '',
  isLoading: false,
  isError: false,
  error: '',
  userData: {},
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data.token,
        userData: {
          userId: action.data.userId,
          email: action.data.email,
          username: action.data.username,
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          teams: action.data.teams,
        },
      };
    case actionTypes.LOGOUT:
      return {
        isLoggedIn: false,
        token: '',
        isLoading: false,
        isError: false,
        error: '',
        userData: {},
      };
    case actionTypes.VALIDATE:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data.token,
        userData: {
          userId: action.data.userId,
          email: action.data.email,
          username: action.data.username,
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          teams: action.data.teams,
        },
      };
    case actionTypes.CREATE_TEAM:
      let teams = [...state.userData.teams];
      let userData = {...state.userData};
      teams.push(action.data);
      return {...state, userData: {...userData, teams: teams}};
    case actionTypes.JOIN_TEAM:
      let teamsNew = [...state.userData.teams];
      let userDataNew = {...state.userData};
      teamsNew.push(action.data);
      return {...state, userData: {...userDataNew, teams: teamsNew}};
    case actionTypes.SET_LOADING:
      return {...state, isLoading: true};
    case actionTypes.STOP_LOADING:
      return {...state, isLoading: false};
    case actionTypes.SET_ERROR:
      return {...state, isError: true, error: action.error};
    case actionTypes.UNSET_ERROR:
      return {...state, isError: false};
    default:
      return state;
      break;
  }
};

export default authReducer;

import * as actionTypes from './actionTypes';
import {post} from '../../Application/requests';

const loginHelper = (data) => {
  return {
    type: actionTypes.LOGIN,
    data,
  };
};

export const login = ({username, password}) => {
  return (dispatch) => {
    post({route: '/api/users/login', body: {username, password}})
      .then((data) => {
        dispatch(loginHelper(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const validateHelper = (data) => {
  return {
    type: actionTypes.VALIDATE,
    data,
  };
};

export const validate = ({token, hideSplashScreen}) => {
  return (dispatch) => {
    post({route: '/api/users/validate', body: {token}})
      .then((data) => {
        dispatch(validateHelper(data));
        hideSplashScreen();
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
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

const createTeamHelper = (data) => {
  return {
    type: actionTypes.CREATE_TEAM,
    data,
  };
};

export const createTeam = ({name, userId}) => {
  return (dispatch) => {
    post({route: '/api/teams/create', body: {name, userId}})
      .then((data) => {
        dispatch(createTeamHelper({teamName: name, userId, _id: data._id}));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const joinTeamHelper = (data) => {
  return {
    type: actionTypes.JOIN_TEAM,
    data,
  };
};
export const joinTeam = ({teamid, secret, userid}) => {
  return (dispatch) => {
    post({route: '/api/teams/joinTeam', body: {teamid, secret, userid}})
      .then((data) => {
        dispatch(joinTeamHelper({_id: data._id, teamName: data.teamName}));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

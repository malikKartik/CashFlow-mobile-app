import * as actionTypes from './actionTypes';
import {get, post} from '../../../requests';

export const setCurrentTeam = ({id}) => {
  return {
    type: actionTypes.SET_CURRENT_TEAM,
    data: id,
  };
};

export const getTeamDataHelper = (data) => {
  return {
    type: actionTypes.GET_TEAM_DATA,
    data,
  };
};

export const getTeamData = ({id}) => {
  return (dispatch) => {
    post({route: '/api/teams/getTeamById', body: {id}})
      .then((data) => {
        dispatch(getTeamDataHelper(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const addMemberHelper = (data) => {
  return {
    type: actionTypes.ADD_MEMBER,
    data,
  };
};

export const addMember = ({teamid, username}) => {
  return (dispatch) => {
    post({route: '/api/teams/addUser', body: {teamid, username}})
      .then((data) => {
        if (data.message) {
          console.log(data.message);
        } else {
          dispatch(
            addMemberHelper({
              _id: data._id,
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
            }),
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const addPlace = (data) => {
  return {
    type: actionTypes.ADD_PLACE,
    data,
  };
};

export const setCurrentRoom = (id) => {
  return {
    type: actionTypes.SET_CURRENT_ROOM,
    id: id,
  };
};

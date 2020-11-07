import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  currentTeam: '',
  currentTeamData: {},
  currentRoom: '',
};

const teamReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_TEAM:
      return {...state, currentTeam: action.data ? action.data : ''};
    case actionTypes.GET_TEAM_DATA:
      return {
        ...state,
        currentTeamData: action.data,
      };
    case actionTypes.ADD_MEMBER:
      let users = [...state.currentTeamData.users];
      let currentTeam = {...state.currentTeamData};
      users.push(action.data);
      return {...state, currentTeamData: {...currentTeam, users: users}};
    case actionTypes.ADD_PLACE:
      let teamData = {...state.currentTeamData};
      teamData.places.push(action.data);
      return {...state, currentTeamData: teamData};
    case actionTypes.SET_CURRENT_ROOM:
      return {...state, currentRoom: action.id};
    default:
      return state;
  }
};

export default teamReducer;

import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  currentTeam: '',
  currentTeamData: {},
};

const teamReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_TEAM:
      return {...state, currentTeam: action.data ? action.data : ''};
    default:
      return state;
  }
};

export default teamReducer;

import * as actionTypes from './actionTypes';
import {get} from '../../../requests';

export const setCurrentTeam = ({id}) => {
  return {
    type: actionTypes.SET_CURRENT_TEAM,
    data: id,
  };
};

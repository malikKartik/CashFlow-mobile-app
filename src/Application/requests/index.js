import url from '../constants/url';
import axios from 'axios';
import {store} from '../../../index';
import * as actions from '../../store/actions';

export const get = (params) => {
  return new Promise((resolve, reject) => {
    store.dispatch(actions.setLoading());
    axios
      .get(url + params.route, {
        headers: {...params.headers},
        withCredentials: true,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const post = (params) => {
  return new Promise((resolve, reject) => {
    store.dispatch(actions.setLoading());
    axios
      .post(
        url + params.route,
        {...params.body},
        {
          headers: {...params.headers},
          withCredentials: true,
        },
      )
      .then((data) => {
        store.dispatch(actions.stopLoading());
        resolve(data.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

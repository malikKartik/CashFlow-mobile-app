/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {name as appName} from './app.json';
import thunk from 'redux-thunk';

// Reducers
import authReducer from './src/store/reducers/auth';
import teamReducer from './src/Application/screens/Team/reducer/team';

export const store = createStore(
  combineReducers({
    auth: authReducer,
    team: teamReducer,
  }),
  applyMiddleware(thunk),
);

const Application = () => {
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Application);

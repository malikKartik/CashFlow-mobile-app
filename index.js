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

export const store = createStore(
  combineReducers({
    auth: authReducer,
  }),
  applyMiddleware(thunk),
);

const Application = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Application);

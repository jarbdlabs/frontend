import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import history from './history';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import examplesReducer from '../features/examples/redux/reducer';
import authenticationReducer from '../features/authentication/redux/reducer';
import referralReducer from '../features/referral/redux/reducer';
import dashboardReducer from '../features/dashboard/redux/reducer';
import settingsReducer from '../features/settings/redux/reducer';
import usersReducer from '../features/users/redux/reducer';
import clinicsReducer from '../features/clinics/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: connectRouter(history),
  home: homeReducer,
  common: commonReducer,
  examples: examplesReducer,
  authentication: authenticationReducer,
  referral: referralReducer,
  dashboard: dashboardReducer,
  settings: settingsReducer,
  users: usersReducer,
  clinics: clinicsReducer,
};

export default combineReducers(reducerMap);

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { UsersPage } from './';

export default {
  path: '',
  childRoutes: [
    { path: 'users', component: UsersPage },
  ],
};

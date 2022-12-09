import { DashboardPage } from './';
import { Dashboard } from "@material-ui/icons";
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html


export default {
  path: '',
  childRoutes: [
    { path: 'dashboard', 
      component: DashboardPage,
      icon: Dashboard,
      layout: "/admin" 
    },
  ],
};

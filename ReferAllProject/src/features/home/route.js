import { SignIn } from '../authentication';
import { WelcomePage } from './';

export default {
  path: '',
  childRoutes: [{ path: 'welcome-page', component: SignIn, isIndex: true }],
};

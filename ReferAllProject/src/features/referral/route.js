// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { SendReferralPage, CompletedPage, DeclinedPage } from './';

export default {
  path: 'referral',
  childRoutes: [
    { path: 'send', component: SendReferralPage },
    { path: 'completed', component: CompletedPage },
    { path: 'declined', component: DeclinedPage },
  ],
};

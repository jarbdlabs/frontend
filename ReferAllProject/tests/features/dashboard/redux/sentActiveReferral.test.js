import {
  DASHBOARD_SENT_ACTIVE_REFERRAL,
} from '../../../../src/features/dashboard/redux/constants';

import {
  sentActiveReferral,
  reducer,
} from '../../../../src/features/dashboard/redux/sentActiveReferral';

describe('dashboard/redux/sentActiveReferral', () => {
  it('returns correct action by sentActiveReferral', () => {
    expect(sentActiveReferral()).toHaveProperty('type', DASHBOARD_SENT_ACTIVE_REFERRAL);
  });

  it('handles action type DASHBOARD_SENT_ACTIVE_REFERRAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DASHBOARD_SENT_ACTIVE_REFERRAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

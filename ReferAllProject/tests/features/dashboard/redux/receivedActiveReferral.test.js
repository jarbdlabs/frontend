import {
  DASHBOARD_RECEIVED_ACTIVE_REFERRAL,
} from '../../../../src/features/dashboard/redux/constants';

import {
  receivedActiveReferral,
  reducer,
} from '../../../../src/features/dashboard/redux/receivedActiveReferral';

describe('dashboard/redux/receivedActiveReferral', () => {
  it('returns correct action by receivedActiveReferral', () => {
    expect(receivedActiveReferral()).toHaveProperty('type', DASHBOARD_RECEIVED_ACTIVE_REFERRAL);
  });

  it('handles action type DASHBOARD_RECEIVED_ACTIVE_REFERRAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DASHBOARD_RECEIVED_ACTIVE_REFERRAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

import {
  REFERRAL_UPDATE_REFERRAL,
} from '../../../../src/features/referral/redux/constants';

import {
  updateReferral,
  reducer,
} from '../../../../src/features/referral/redux/updateReferral';

describe('referral/redux/updateReferral', () => {
  it('returns correct action by updateReferral', () => {
    expect(updateReferral()).toHaveProperty('type', REFERRAL_UPDATE_REFERRAL);
  });

  it('handles action type REFERRAL_UPDATE_REFERRAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: REFERRAL_UPDATE_REFERRAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

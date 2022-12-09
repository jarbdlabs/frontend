import {
  REFERRAL_GET_REFERRAL_NOTE,
} from '../../../../src/features/referral/redux/constants';

import {
  getReferralNote,
  reducer,
} from '../../../../src/features/referral/redux/getReferralNote';

describe('referral/redux/getReferralNote', () => {
  it('returns correct action by getReferralNote', () => {
    expect(getReferralNote()).toHaveProperty('type', REFERRAL_GET_REFERRAL_NOTE);
  });

  it('handles action type REFERRAL_GET_REFERRAL_NOTE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: REFERRAL_GET_REFERRAL_NOTE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

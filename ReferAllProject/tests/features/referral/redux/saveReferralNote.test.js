import {
  REFERRAL_SAVE_REFERRAL_NOTE,
} from '../../../../src/features/referral/redux/constants';

import {
  saveReferralNote,
  reducer,
} from '../../../../src/features/referral/redux/saveReferralNote';

describe('referral/redux/saveReferralNote', () => {
  it('returns correct action by saveReferralNote', () => {
    expect(saveReferralNote()).toHaveProperty('type', REFERRAL_SAVE_REFERRAL_NOTE);
  });

  it('handles action type REFERRAL_SAVE_REFERRAL_NOTE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: REFERRAL_SAVE_REFERRAL_NOTE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

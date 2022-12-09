import {
  REFERRAL_GET_REFERRAL_PATIENT,
} from '../../../../src/features/referral/redux/constants';

import {
  getReferralPatient,
  reducer,
} from '../../../../src/features/referral/redux/getReferralPatient';

describe('referral/redux/getReferralPatient', () => {
  it('returns correct action by getReferralPatient', () => {
    expect(getReferralPatient()).toHaveProperty('type', REFERRAL_GET_REFERRAL_PATIENT);
  });

  it('handles action type REFERRAL_GET_REFERRAL_PATIENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: REFERRAL_GET_REFERRAL_PATIENT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

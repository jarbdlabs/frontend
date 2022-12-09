import {
  REFERRAL_GET_CLINICS,
} from '../../../../src/features/referral/redux/constants';

import {
  getClinics,
  reducer,
} from '../../../../src/features/referral/redux/getClinics';

describe('referral/redux/getClinics', () => {
  it('returns correct action by getClinics', () => {
    expect(getClinics()).toHaveProperty('type', REFERRAL_GET_CLINICS);
  });

  it('handles action type REFERRAL_GET_CLINICS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: REFERRAL_GET_CLINICS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

import {
  REFERRAL_GET_FAVORITE_CLINICS,
} from '../../../../src/features/referral/redux/constants';

import {
  getFavoriteClinics,
  reducer,
} from '../../../../src/features/referral/redux/getFavoriteClinics';

describe('referral/redux/getFavoriteClinics', () => {
  it('returns correct action by getFavoriteClinics', () => {
    expect(getFavoriteClinics()).toHaveProperty('type', REFERRAL_GET_FAVORITE_CLINICS);
  });

  it('handles action type REFERRAL_GET_FAVORITE_CLINICS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: REFERRAL_GET_FAVORITE_CLINICS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

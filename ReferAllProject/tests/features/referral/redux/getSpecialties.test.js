import {
  REFERRAL_GET_SPECIALTIES,
} from '../../../../src/features/referral/redux/constants';

import {
  getSpecialties,
  reducer,
} from '../../../../src/features/referral/redux/getSpecialties';

describe('referral/redux/getSpecialties', () => {
  it('returns correct action by getSpecialties', () => {
    expect(getSpecialties()).toHaveProperty('type', REFERRAL_GET_SPECIALTIES);
  });

  it('handles action type REFERRAL_GET_SPECIALTIES correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: REFERRAL_GET_SPECIALTIES }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

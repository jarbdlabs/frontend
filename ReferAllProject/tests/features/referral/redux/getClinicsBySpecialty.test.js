import {
  REFERRAL_GET_CLINICS_BY_SPECIALTY,
} from '../../../../src/features/referral/redux/constants';

import {
  getClinicsBySpecialty,
  reducer,
} from '../../../../src/features/referral/redux/getClinicsBySpecialty';

describe('referral/redux/getClinicsBySpecialty', () => {
  it('returns correct action by getClinicsBySpecialty', () => {
    expect(getClinicsBySpecialty()).toHaveProperty('type', REFERRAL_GET_CLINICS_BY_SPECIALTY);
  });

  it('handles action type REFERRAL_GET_CLINICS_BY_SPECIALTY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: REFERRAL_GET_CLINICS_BY_SPECIALTY }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

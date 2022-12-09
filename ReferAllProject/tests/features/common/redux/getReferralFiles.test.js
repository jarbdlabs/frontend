import {
  COMMON_GET_REFERRAL_FILES,
} from '../../../../src/features/common/redux/constants';

import {
  getReferralFiles,
  reducer,
} from '../../../../src/features/common/redux/getReferralFiles';

describe('common/redux/getReferralFiles', () => {
  it('returns correct action by getReferralFiles', () => {
    expect(getReferralFiles()).toHaveProperty('type', COMMON_GET_REFERRAL_FILES);
  });

  it('handles action type COMMON_GET_REFERRAL_FILES correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_GET_REFERRAL_FILES }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

import {
  REFERRAL_SEND_REFERRAL,
} from '../../../../src/features/referral/redux/constants';

import {
  sendReferral,
  reducer,
} from '../../../../src/features/referral/redux/sendReferral';

describe('referral/redux/sendReferral', () => {
  it('returns correct action by sendReferral', () => {
    expect(sendReferral()).toHaveProperty('type', REFERRAL_SEND_REFERRAL);
  });

  it('handles action type REFERRAL_SEND_REFERRAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: REFERRAL_SEND_REFERRAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

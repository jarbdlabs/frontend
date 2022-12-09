import {
  AUTHENTICATION_SIGN_IN,
} from '../../../../src/features/authentication/redux/constants';

import {
  signIn,
  reducer,
} from '../../../../src/features/authentication/redux/signIn';

describe('authentication/redux/signIn', () => {
  it('returns correct action by signIn', () => {
    expect(signIn()).toHaveProperty('type', AUTHENTICATION_SIGN_IN);
  });

  it('handles action type AUTHENTICATION_SIGN_IN correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_SIGN_IN }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

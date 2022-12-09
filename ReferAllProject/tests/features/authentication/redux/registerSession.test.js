import {
  AUTHENTICATION_REGISTER_SESSION,
} from '../../../../src/features/authentication/redux/constants';

import {
  registerSession,
  reducer,
} from '../../../../src/features/authentication/redux/registerSession';

describe('authentication/redux/registerSession', () => {
  it('returns correct action by registerSession', () => {
    expect(registerSession()).toHaveProperty('type', AUTHENTICATION_REGISTER_SESSION);
  });

  it('handles action type AUTHENTICATION_REGISTER_SESSION correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_REGISTER_SESSION }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

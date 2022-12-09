import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  AUTHENTICATION_REGISTER_SESSION,
} from './constants';

export function registerSession(data) {
  return {
    type: AUTHENTICATION_REGISTER_SESSION,
    data: data,
  };
}

export function useRegisterSession() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(registerSession(...params)), [dispatch]);
  return { registerSession: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATION_REGISTER_SESSION:
      return {
        ...state,
        authSessionData: action.data,
      };

    default:
      return state;
  }
}

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  AUTHENTICATION_SIGN_IN_BEGIN,
  AUTHENTICATION_SIGN_IN_SUCCESS,
  AUTHENTICATION_SIGN_IN_FAILURE,
  AUTHENTICATION_SIGN_IN_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/services/ApiService';
import AuthService from '../services/AuthService';
import {registerSession} from './registerSession';

export function signIn(data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: AUTHENTICATION_SIGN_IN_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.signIn(data).then(
        (res) => {
          console.log(res);
          const session = AuthService.login(res);

          dispatch(registerSession(session));

          dispatch({
            type: AUTHENTICATION_SIGN_IN_SUCCESS,
            data: res,
          });

          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          let error = {...err};

          if (err.errors) {
            for(let field in err.errors) {
              if (Array.isArray(err.errors[field]) && err.errors[field].length) {
                error.message = err.errors[field][0];
              }
            }
          }

          dispatch({
            type: AUTHENTICATION_SIGN_IN_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setSignInError(errorMessage) {
  return {
    type: AUTHENTICATION_SIGN_IN_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissSignInError() {
  return {
    type: AUTHENTICATION_SIGN_IN_DISMISS_ERROR,
  };
}

export function useSignIn(params) {
  const dispatch = useDispatch();

  const { signInPending, signInError, signInSuccess } = useSelector(
    state => ({
      signInPending: state.authentication.signInPending,
      signInError: state.authentication.signInError,
      signInSuccess: state.authentication.signInSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(signIn(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissSignInError());
  }, [dispatch]);

  const boundSetSignInError = useCallback((errorMessage) => {
    return dispatch(setSignInError(errorMessage));
  }, [dispatch]);

  return {
    signIn: boundAction,
    signInPending,
    signInError,
    signInSuccess,
    dismissSignInError: boundDismissError,
    setSignInError: boundSetSignInError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATION_SIGN_IN_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        signInPending: true,
        signInError: null,
      };

    case AUTHENTICATION_SIGN_IN_SUCCESS:
      // The request is success
      return {
        ...state,
        signInSuccess: true,
        signInPending: false,
        signInError: null,
      };

    case AUTHENTICATION_SIGN_IN_FAILURE:
      // The request is failed
      return {
        ...state,
        signInPending: false,
        signInError: action.data.error,
      };

    case AUTHENTICATION_SIGN_IN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        signInError: null,
      };

    default:
      return state;
  }
}

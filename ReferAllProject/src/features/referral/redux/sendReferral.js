import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  REFERRAL_SEND_REFERRAL_BEGIN,
  REFERRAL_SEND_REFERRAL_SUCCESS,
  REFERRAL_SEND_REFERRAL_FAILURE,
  REFERRAL_SEND_REFERRAL_DISMISS_ERROR,
  REFERRAL_SEND_REFERRAL_DISMISS
} from './constants';
import ApiService from '../../common/services/ApiService';

export function sendReferral(data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: REFERRAL_SEND_REFERRAL_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.sendReferral(data).then(
        (res) => {
          dispatch({
            type: REFERRAL_SEND_REFERRAL_SUCCESS,
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
            type: REFERRAL_SEND_REFERRAL_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setSendReferralError(errorMessage) {
  return {
    type: REFERRAL_SEND_REFERRAL_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissSendReferralError() {
  return {
    type: REFERRAL_SEND_REFERRAL_DISMISS_ERROR,
  };
}
export function dismissSendReferral() {
  return {
    type: REFERRAL_SEND_REFERRAL_DISMISS,
  };
}

export function useSendReferral(params) {
  const dispatch = useDispatch();

  const { sendReferralPending, sendReferralError, sendReferralSuccess } = useSelector(
    state => ({
      sendReferralPending: state.referral.sendReferralPending,
      sendReferralError: state.referral.sendReferralError,
      sendReferralSuccess: state.referral.sendReferralSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(sendReferral(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissSendReferralError());
  }, [dispatch]);

  const boundDismiss = useCallback(() => {
    return dispatch(dismissSendReferral());
  }, [dispatch]);

  const boundSetSendReferralError = useCallback((errorMessage) => {
    return dispatch(setSendReferralError(errorMessage));
  }, [dispatch]);

  return {
    sendReferral: boundAction,
    sendReferralPending,
    sendReferralError,
    sendReferralSuccess,
    dismissSendReferralError: boundDismissError,
    dismissSendReferral: boundDismiss,
    setSendReferralError: boundSetSendReferralError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REFERRAL_SEND_REFERRAL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        sendReferralPending: true,
        sendReferralError: null,
      };

    case REFERRAL_SEND_REFERRAL_SUCCESS:
      // The request is success
      return {
        ...state,
        sendReferralSuccess: true,
        sendReferralPending: false,
        sendReferralError: null,
      };

    case REFERRAL_SEND_REFERRAL_FAILURE:
      // The request is failed
      return {
        ...state,
        sendReferralPending: false,
        sendReferralError: action.data.error,
      };

    case REFERRAL_SEND_REFERRAL_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        sendReferralError: null,
      };
    case REFERRAL_SEND_REFERRAL_DISMISS:
      // Dismiss the request 
      return {
        ...state,
        sendReferralSuccess: null,
        sendReferralPending: null,
        sendReferralError: null,
      };
    default:
      return state;
  }
}

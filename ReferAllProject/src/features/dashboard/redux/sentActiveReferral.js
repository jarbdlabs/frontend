import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_SENT_ACTIVE_REFERRAL_BEGIN,
  DASHBOARD_SENT_ACTIVE_REFERRAL_SUCCESS,
  DASHBOARD_SENT_ACTIVE_REFERRAL_FAILURE,
  DASHBOARD_SENT_ACTIVE_REFERRAL_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/services/ApiService';

export function sentActiveReferral(page, pageSize, status) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_SENT_ACTIVE_REFERRAL_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.getSentActiveReferrals(page, pageSize, status).then(
        (res) => {
          dispatch({
            type: DASHBOARD_SENT_ACTIVE_REFERRAL_SUCCESS,
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
            type: DASHBOARD_SENT_ACTIVE_REFERRAL_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setSentActiveReferralError(errorMessage) {
  return {
    type: DASHBOARD_SENT_ACTIVE_REFERRAL_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissSentActiveReferralError() {
  return {
    type: DASHBOARD_SENT_ACTIVE_REFERRAL_DISMISS_ERROR,
  };
}

export function useSentActiveReferral(params) {
  const dispatch = useDispatch();

  const { sentActiveReferralPending, sentActiveReferralError, sentActiveReferralSuccess } = useSelector(
    state => ({
      sentActiveReferralPending: state.dashboard.sentActiveReferralPending,
      sentActiveReferralError: state.dashboard.sentActiveReferralError,
      sentActiveReferralSuccess: state.dashboard.sentActiveReferralSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(sentActiveReferral(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissSentActiveReferralError());
  }, [dispatch]);

  const boundSetSentActiveReferralError = useCallback((errorMessage) => {
    return dispatch(setSentActiveReferralError(errorMessage));
  }, [dispatch]);

  return {
    sentActiveReferral: boundAction,
    sentActiveReferralPending,
    sentActiveReferralError,
    sentActiveReferralSuccess,
    dismissSentActiveReferralError: boundDismissError,
    setSentActiveReferralError: boundSetSentActiveReferralError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_SENT_ACTIVE_REFERRAL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        sentActiveReferralPending: true,
        sentActiveReferralError: null,
      };

    case DASHBOARD_SENT_ACTIVE_REFERRAL_SUCCESS:
      // The request is success
      return {
        ...state,
        sentActiveReferralSuccess: true,
        sentActiveReferralPending: false,
        sentActiveReferralError: null,
      };

    case DASHBOARD_SENT_ACTIVE_REFERRAL_FAILURE:
      // The request is failed
      return {
        ...state,
        sentActiveReferralPending: false,
        sentActiveReferralError: action.data.error,
      };

    case DASHBOARD_SENT_ACTIVE_REFERRAL_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        sentActiveReferralError: null,
      };

    default:
      return state;
  }
}

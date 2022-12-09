import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_RECEIVED_ACTIVE_REFERRAL_BEGIN,
  DASHBOARD_RECEIVED_ACTIVE_REFERRAL_SUCCESS,
  DASHBOARD_RECEIVED_ACTIVE_REFERRAL_FAILURE,
  DASHBOARD_RECEIVED_ACTIVE_REFERRAL_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/services/ApiService';

export function receivedActiveReferral(page, pageSize, status) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_RECEIVED_ACTIVE_REFERRAL_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.getReceivedActiveReferrals(page, pageSize, status).then(
        (res) => {
          dispatch({
            type: DASHBOARD_RECEIVED_ACTIVE_REFERRAL_SUCCESS,
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
            type: DASHBOARD_RECEIVED_ACTIVE_REFERRAL_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setReceivedActiveReferralError(errorMessage) {
  return {
    type: DASHBOARD_RECEIVED_ACTIVE_REFERRAL_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissReceivedActiveReferralError() {
  return {
    type: DASHBOARD_RECEIVED_ACTIVE_REFERRAL_DISMISS_ERROR,
  };
}

export function useReceivedActiveReferral(params) {
  const dispatch = useDispatch();

  const { receivedActiveReferralPending, receivedActiveReferralError, receivedActiveReferralSuccess } = useSelector(
    state => ({
      receivedActiveReferralPending: state.dashboard.receivedActiveReferralPending,
      receivedActiveReferralError: state.dashboard.receivedActiveReferralError,
      receivedActiveReferralSuccess: state.dashboard.receivedActiveReferralSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(receivedActiveReferral(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissReceivedActiveReferralError());
  }, [dispatch]);

  const boundSetReceivedActiveReferralError = useCallback((errorMessage) => {
    return dispatch(setReceivedActiveReferralError(errorMessage));
  }, [dispatch]);

  return {
    receivedActiveReferral: boundAction,
    receivedActiveReferralPending,
    receivedActiveReferralError,
    receivedActiveReferralSuccess,
    dismissReceivedActiveReferralError: boundDismissError,
    setReceivedActiveReferralError: boundSetReceivedActiveReferralError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_RECEIVED_ACTIVE_REFERRAL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        receivedActiveReferralPending: true,
        receivedActiveReferralError: null,
      };

    case DASHBOARD_RECEIVED_ACTIVE_REFERRAL_SUCCESS:
      // The request is success
      return {
        ...state,
        receivedActiveReferralSuccess: true,
        receivedActiveReferralPending: false,
        receivedActiveReferralError: null,
      };

    case DASHBOARD_RECEIVED_ACTIVE_REFERRAL_FAILURE:
      // The request is failed
      return {
        ...state,
        receivedActiveReferralPending: false,
        receivedActiveReferralError: action.data.error,
      };

    case DASHBOARD_RECEIVED_ACTIVE_REFERRAL_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        receivedActiveReferralError: null,
      };

    default:
      return state;
  }
}

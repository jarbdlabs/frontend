import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  REFERRAL_GET_REFERRAL_PATIENT_BEGIN,
  REFERRAL_GET_REFERRAL_PATIENT_SUCCESS,
  REFERRAL_GET_REFERRAL_PATIENT_FAILURE,
  REFERRAL_GET_REFERRAL_PATIENT_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/services/ApiService';

export function getReferralPatient(data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: REFERRAL_GET_REFERRAL_PATIENT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.getReferralPatient(data).then(
        (res) => {
          dispatch({
            type: REFERRAL_GET_REFERRAL_PATIENT_SUCCESS,
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
            type: REFERRAL_GET_REFERRAL_PATIENT_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setGetReferralPatientError(errorMessage) {
  return {
    type: REFERRAL_GET_REFERRAL_PATIENT_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissGetReferralPatientError() {
  return {
    type: REFERRAL_GET_REFERRAL_PATIENT_DISMISS_ERROR,
  };
}

export function useGetReferralPatient(params) {
  const dispatch = useDispatch();

  const { getReferralPatientPending, getReferralPatientError, getReferralPatientSuccess } = useSelector(
    state => ({
      getReferralPatientPending: state.referral.getReferralPatientPending,
      getReferralPatientError: state.referral.getReferralPatientError,
      getReferralPatientSuccess: state.referral.getReferralPatientSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getReferralPatient(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetReferralPatientError());
  }, [dispatch]);

  const boundsetGetReferralPatientError = useCallback((errorMessage) => {
    return dispatch(setGetReferralPatientError(errorMessage));
  }, [dispatch]);

  return {
    getReferralPatient: boundAction,
    getReferralPatientPending,
    getReferralPatientError,
    getReferralPatientSuccess,
    dismissGetReferralPatientError: boundDismissError,
    setGetReferralPatientError: boundsetGetReferralPatientError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REFERRAL_GET_REFERRAL_PATIENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getReferralPatientPending: true,
        getReferralPatientError: null,
      };

    case REFERRAL_GET_REFERRAL_PATIENT_SUCCESS:
      // The request is success
      return {
        ...state,
        getReferralPatientSuccess: true,
        getReferralPatientPending: false,
        getReferralPatientError: null,
      };

    case REFERRAL_GET_REFERRAL_PATIENT_FAILURE:
      // The request is failed
      return {
        ...state,
        getReferralPatientPending: false,
        getReferralPatientError: action.data.error,
      };

    case REFERRAL_GET_REFERRAL_PATIENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getReferralPatientError: null,
      };

    default:
      return state;
  }
}

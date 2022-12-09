import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  REFERRAL_GET_CLINICS_BEGIN,
  REFERRAL_GET_CLINICS_SUCCESS,
  REFERRAL_GET_CLINICS_FAILURE,
  REFERRAL_GET_CLINICS_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/services/ApiService';

export function getClinics() {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: REFERRAL_GET_CLINICS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.getClinics().then(
        (res) => {
          dispatch({
            type: REFERRAL_GET_CLINICS_SUCCESS,
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
            type: REFERRAL_GET_CLINICS_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setGetClinicsError(errorMessage) {
  return {
    type: REFERRAL_GET_CLINICS_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissGetClinicsError() {
  return {
    type: REFERRAL_GET_CLINICS_DISMISS_ERROR,
  };
}

export function useGetClinics(params) {
  const dispatch = useDispatch();

  const { getClinicsPending, getClinicsError, getClinicsSuccess } = useSelector(
    state => ({
      getClinicsPending: state.referral.getClinicsPending,
      getClinicsError: state.referral.getClinicsError,
      getClinicsSuccess: state.referral.getClinicsSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getClinics(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetClinicsError());
  }, [dispatch]);

  const boundsetGetClinicsError = useCallback((errorMessage) => {
    return dispatch(setGetClinicsError(errorMessage));
  }, [dispatch]);

  return {
    getClinics: boundAction,
    getClinicsPending,
    getClinicsError,
    getClinicsSuccess,
    dismissGetClinicsError: boundDismissError,
    setGetClinicsError: boundsetGetClinicsError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REFERRAL_GET_CLINICS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getClinicsPending: true,
        getClinicsError: null,
      };

    case REFERRAL_GET_CLINICS_SUCCESS:
      // The request is success
      return {
        ...state,
        getClinicsSuccess: true,
        getClinicsPending: false,
        getClinicsError: null,
      };

    case REFERRAL_GET_CLINICS_FAILURE:
      // The request is failed
      return {
        ...state,
        getClinicsPending: false,
        getClinicsError: action.data.error,
      };

    case REFERRAL_GET_CLINICS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getClinicsError: null,
      };

    default:
      return state;
  }
}

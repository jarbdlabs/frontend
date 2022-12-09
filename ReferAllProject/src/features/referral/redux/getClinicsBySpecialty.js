import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  REFERRAL_GET_CLINICS_BY_SPECIALTY_BEGIN,
  REFERRAL_GET_CLINICS_BY_SPECIALTY_SUCCESS,
  REFERRAL_GET_CLINICS_BY_SPECIALTY_FAILURE,
  REFERRAL_GET_CLINICS_BY_SPECIALTY_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/services/ApiService';

export function getClinicsBySpecialty(data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: REFERRAL_GET_CLINICS_BY_SPECIALTY_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.getClinicsBySpecialty(data).then(
        (res) => {
          dispatch({
            type: REFERRAL_GET_CLINICS_BY_SPECIALTY_SUCCESS,
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
            type: REFERRAL_GET_CLINICS_BY_SPECIALTY_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setGetClinicsBySpecialtyError(errorMessage) {
  return {
    type: REFERRAL_GET_CLINICS_BY_SPECIALTY_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissGetClinicsBySpecialtyError() {
  return {
    type: REFERRAL_GET_CLINICS_BY_SPECIALTY_DISMISS_ERROR,
  };
}

export function useGetClinicsBySpecialty(params) {
  const dispatch = useDispatch();

  const { getClinicsBySpecialtyPending, getClinicsBySpecialtyError, getClinicsBySpecialtySuccess } = useSelector(
    state => ({
      getClinicsBySpecialtyPending: state.referral.getClinicsBySpecialtyPending,
      getClinicsBySpecialtyError: state.referral.getClinicsBySpecialtyError,
      getClinicsBySpecialtySuccess: state.referral.getClinicsBySpecialtySuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getClinicsBySpecialty(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetClinicsBySpecialtyError());
  }, [dispatch]);

  const boundsetGetClinicsBySpecialtyError = useCallback((errorMessage) => {
    return dispatch(setGetClinicsBySpecialtyError(errorMessage));
  }, [dispatch]);

  return {
    getClinicsBySpecialty: boundAction,
    getClinicsBySpecialtyPending,
    getClinicsBySpecialtyError,
    getClinicsBySpecialtySuccess,
    dismissGetClinicsBySpecialtyError: boundDismissError,
    setGetClinicsBySpecialtyError: boundsetGetClinicsBySpecialtyError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REFERRAL_GET_CLINICS_BY_SPECIALTY_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getClinicsBySpecialtyPending: true,
        getClinicsBySpecialtyError: null,
      };

    case REFERRAL_GET_CLINICS_BY_SPECIALTY_SUCCESS:
      // The request is success
      return {
        ...state,
        getClinicsBySpecialtySuccess: true,
        getClinicsBySpecialtyPending: false,
        getClinicsBySpecialtyError: null,
      };

    case REFERRAL_GET_CLINICS_BY_SPECIALTY_FAILURE:
      // The request is failed
      return {
        ...state,
        getClinicsBySpecialtyPending: false,
        getClinicsBySpecialtyError: action.data.error,
      };

    case REFERRAL_GET_CLINICS_BY_SPECIALTY_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getClinicsBySpecialtyError: null,
      };

    default:
      return state;
  }
}

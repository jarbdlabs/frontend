import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  REFERRAL_GET_FAVORITE_CLINICS_BEGIN,
  REFERRAL_GET_FAVORITE_CLINICS_SUCCESS,
  REFERRAL_GET_FAVORITE_CLINICS_FAILURE,
  REFERRAL_GET_FAVORITE_CLINICS_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/services/ApiService';

export function getFavoriteClinics() {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: REFERRAL_GET_FAVORITE_CLINICS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.getFavoriteClinics().then(
        (res) => {
          dispatch({
            type: REFERRAL_GET_FAVORITE_CLINICS_SUCCESS,
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
            type: REFERRAL_GET_FAVORITE_CLINICS_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setGetFavoriteClinicsError(errorMessage) {
  return {
    type: REFERRAL_GET_FAVORITE_CLINICS_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissGetFavoriteClinicsError() {
  return {
    type: REFERRAL_GET_FAVORITE_CLINICS_DISMISS_ERROR,
  };
}

export function useGetFavoriteClinics(params) {
  const dispatch = useDispatch();

  const { getFavoriteClinicsPending, getFavoriteClinicsError, getFavoriteClinicsSuccess } = useSelector(
    state => ({
      getFavoriteClinicsPending: state.referral.getFavoriteClinicsPending,
      getFavoriteClinicsError: state.referral.getFavoriteClinicsError,
      getFavoriteClinicsSuccess: state.referral.getFavoriteClinicsSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getFavoriteClinics(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetFavoriteClinicsError());
  }, [dispatch]);

  const boundsetGetFavoriteClinicsError = useCallback((errorMessage) => {
    return dispatch(setGetFavoriteClinicsError(errorMessage));
  }, [dispatch]);

  return {
    getFavoriteClinics: boundAction,
    getFavoriteClinicsPending,
    getFavoriteClinicsError,
    getFavoriteClinicsSuccess,
    dismissGetFavoriteClinicsError: boundDismissError,
    setGetFavoriteClinicsError: boundsetGetFavoriteClinicsError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REFERRAL_GET_FAVORITE_CLINICS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getFavoriteClinicsPending: true,
        getFavoriteClinicsError: null,
      };

    case REFERRAL_GET_FAVORITE_CLINICS_SUCCESS:
      // The request is success
      return {
        ...state,
        getFavoriteClinicsSuccess: true,
        getFavoriteClinicsPending: false,
        getFavoriteClinicsError: null,
      };

    case REFERRAL_GET_FAVORITE_CLINICS_FAILURE:
      // The request is failed
      return {
        ...state,
        getFavoriteClinicsPending: false,
        getFavoriteClinicsError: action.data.error,
      };

    case REFERRAL_GET_FAVORITE_CLINICS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getFavoriteClinicsError: null,
      };

    default:
      return state;
  }
}

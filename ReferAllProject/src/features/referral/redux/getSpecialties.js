import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  REFERRAL_GET_SPECIALTIES_BEGIN,
  REFERRAL_GET_SPECIALTIES_SUCCESS,
  REFERRAL_GET_SPECIALTIES_FAILURE,
  REFERRAL_GET_SPECIALTIES_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/services/ApiService';

export function getSpecialties(data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: REFERRAL_GET_SPECIALTIES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.getSpecialties(data).then(
        (res) => {
          dispatch({
            type: REFERRAL_GET_SPECIALTIES_SUCCESS,
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
            type: REFERRAL_GET_SPECIALTIES_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setGetSpecialtiesError(errorMessage) {
  return {
    type: REFERRAL_GET_SPECIALTIES_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissGetSpecialtiesError() {
  return {
    type: REFERRAL_GET_SPECIALTIES_DISMISS_ERROR,
  };
}

export function useGetSpecialties(params) {
  const dispatch = useDispatch();

  const { getSpecialtiesPending, getSpecialtiesError, getSpecialtiesSuccess } = useSelector(
    state => ({
      getSpecialtiesPending: state.referral.getSpecialtiesPending,
      getSpecialtiesError: state.referral.getSpecialtiesError,
      getSpecialtiesSuccess: state.referral.getSpecialtiesSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getSpecialties(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetSpecialtiesError());
  }, [dispatch]);

  const boundSetGetSpecialtiesError = useCallback((errorMessage) => {
    return dispatch(setGetSpecialtiesError(errorMessage));
  }, [dispatch]);

  return {
    getSpecialties: boundAction,
    getSpecialtiesPending,
    getSpecialtiesError,
    getSpecialtiesSuccess,
    dismissGetSpecialtiesError: boundDismissError,
    setGetSpecialtiesError: boundSetGetSpecialtiesError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REFERRAL_GET_SPECIALTIES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getSpecialtiesPending: true,
        getSpecialtiesError: null,
      };

    case REFERRAL_GET_SPECIALTIES_SUCCESS:
      // The request is success
      return {
        ...state,
        getSpecialtiesSuccess: true,
        getSpecialtiesPending: false,
        getSpecialtiesError: null,
      };

    case REFERRAL_GET_SPECIALTIES_FAILURE:
      // The request is failed
      return {
        ...state,
        getSpecialtiesPending: false,
        getSpecialtiesError: action.data.error,
      };

    case REFERRAL_GET_SPECIALTIES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getSpecialtiesError: null,
      };

    default:
      return state;
  }
}

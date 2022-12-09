import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  COMMON_GET_REFERRAL_FILES_BEGIN,
  COMMON_GET_REFERRAL_FILES_SUCCESS,
  COMMON_GET_REFERRAL_FILES_FAILURE,
  COMMON_GET_REFERRAL_FILES_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/services/ApiService';

export function getReferralFiles(data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_GET_REFERRAL_FILES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.getReferralFiles(data).then(
        (res) => {
          dispatch({
            type: COMMON_GET_REFERRAL_FILES_SUCCESS,
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
            type: COMMON_GET_REFERRAL_FILES_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setGetReferralFilesError(errorMessage) {
  return {
    type: COMMON_GET_REFERRAL_FILES_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissGetReferralFilesError() {
  return {
    type: COMMON_GET_REFERRAL_FILES_DISMISS_ERROR,
  };
}

export function useGetReferralFiles(params) {
  const dispatch = useDispatch();

  const { getReferralFilesPending, getReferralFilesError, getReferralFilesSuccess } = useSelector(
    state => ({
      getReferralFilesPending: state.dashboard.getReferralFilesPending,
      getReferralFilesError: state.dashboard.getReferralFilesError,
      getReferralFilesSuccess: state.dashboard.getReferralFilesSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getReferralFiles(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetReferralFilesError());
  }, [dispatch]);

  const boundSetGetReferralFilesError = useCallback((errorMessage) => {
    return dispatch(setGetReferralFilesError(errorMessage));
  }, [dispatch]);

  return {
    getReferralFiles: boundAction,
    getReferralFilesPending,
    getReferralFilesError,
    getReferralFilesSuccess,
    dismissGetReferralFilesError: boundDismissError,
    setGetReferralFilesError: boundSetGetReferralFilesError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_GET_REFERRAL_FILES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getReferralFilesPending: true,
        getReferralFilesError: null,
      };

    case COMMON_GET_REFERRAL_FILES_SUCCESS:
      // The request is success
      return {
        ...state,
        getReferralFilesSuccess: true,
        getReferralFilesPending: false,
        getReferralFilesError: null,
      };

    case COMMON_GET_REFERRAL_FILES_FAILURE:
      // The request is failed
      return {
        ...state,
        getReferralFilesPending: false,
        getReferralFilesError: action.data.error,
      };

    case COMMON_GET_REFERRAL_FILES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getReferralFilesError: null,
      };

    default:
      return state;
  }
}

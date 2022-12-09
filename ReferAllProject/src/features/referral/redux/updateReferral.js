import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  REFERRAL_UPDATE_REFERRAL_BEGIN,
  REFERRAL_UPDATE_REFERRAL_SUCCESS,
  REFERRAL_UPDATE_REFERRAL_FAILURE,
  REFERRAL_UPDATE_REFERRAL_DISMISS_ERROR,
  REFERRAL_UPDATE_REFERRAL_DISMISS
} from './constants';
import ApiService from '../../common/services/ApiService';

export function updateReferral(data, referral_id) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: REFERRAL_UPDATE_REFERRAL_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.updateReferral(data, referral_id).then(
        (res) => {
          dispatch({
            type: REFERRAL_UPDATE_REFERRAL_SUCCESS,
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
            type: REFERRAL_UPDATE_REFERRAL_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setUpdateReferralError(errorMessage) {
  return {
    type: REFERRAL_UPDATE_REFERRAL_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissUpdateReferralError() {
  return {
    type: REFERRAL_UPDATE_REFERRAL_DISMISS_ERROR,
  };
}
export function dismissUpdateReferral() {
  return {
    type: REFERRAL_UPDATE_REFERRAL_DISMISS,
  };
}

export function useUpdateReferral(params) {
  const dispatch = useDispatch();

  const { updateReferralPending, updateReferralError, updateReferralSuccess } = useSelector(
    state => ({
      updateReferralPending: state.referral.updateReferralPending,
      updateReferralError: state.referral.updateReferralError,
      updateReferralSuccess: state.referral.updateReferralSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateReferral(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateReferralError());
  }, [dispatch]);

  const boundDismiss = useCallback(() => {
    return dispatch(dismissUpdateReferral());
  }, [dispatch]);

  const boundSetUpdateReferralError = useCallback((errorMessage) => {
    return dispatch(setUpdateReferralError(errorMessage));
  }, [dispatch]);

  return {
    updateReferral: boundAction,
    updateReferralPending,
    updateReferralError,
    updateReferralSuccess,
    dismissUpdateReferralError: boundDismissError,
    dismissUpdateReferral: boundDismiss,
    setUpdateReferralError: boundSetUpdateReferralError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REFERRAL_UPDATE_REFERRAL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateReferralPending: true,
        updateReferralError: null,
      };

    case REFERRAL_UPDATE_REFERRAL_SUCCESS:
      // The request is success
      return {
        ...state,
        updateReferralSuccess: true,
        updateReferralPending: false,
        updateReferralError: null,
      };

    case REFERRAL_UPDATE_REFERRAL_FAILURE:
      // The request is failed
      return {
        ...state,
        updateReferralPending: false,
        updateReferralError: action.data.error,
      };

    case REFERRAL_UPDATE_REFERRAL_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateReferralError: null,
      };
    case REFERRAL_UPDATE_REFERRAL_DISMISS:
      // Dismiss the request 
      return {
        ...state,
        updateReferralSuccess: false,
        updateReferralPending: false,
        updateReferralError: null,
      };
    default:
      return state;
  }
}

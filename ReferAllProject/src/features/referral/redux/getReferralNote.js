import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  REFERRAL_GET_REFERRAL_NOTE_BEGIN,
  REFERRAL_GET_REFERRAL_NOTE_SUCCESS,
  REFERRAL_GET_REFERRAL_NOTE_FAILURE,
  REFERRAL_GET_REFERRAL_NOTE_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/services/ApiService';

export function getReferralNote(referral_id, page, pageSize) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: REFERRAL_GET_REFERRAL_NOTE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.getReferralNote(referral_id, page, pageSize).then(
        (res) => {
          dispatch({
            type: REFERRAL_GET_REFERRAL_NOTE_SUCCESS,
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
            type: REFERRAL_GET_REFERRAL_NOTE_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setGetReferralNoteError(errorMessage) {
  return {
    type: REFERRAL_GET_REFERRAL_NOTE_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissGetReferralNoteError() {
  return {
    type: REFERRAL_GET_REFERRAL_NOTE_DISMISS_ERROR,
  };
}

export function useGetReferralNote(params) {
  const dispatch = useDispatch();

  const { getReferralNotePending, getReferralNoteError, getReferralNoteSuccess } = useSelector(
    state => ({
      getReferralNotePending: state.referral.getReferralNotePending,
      getReferralNoteError: state.referral.getReferralNoteError,
      getReferralNoteSuccess: state.referral.getReferralNoteSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getReferralNote(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetReferralNoteError());
  }, [dispatch]);

  const boundSetGetReferralNoteError = useCallback((errorMessage) => {
    return dispatch(setGetReferralNoteError(errorMessage));
  }, [dispatch]);

  return {
    getReferralNote: boundAction,
    getReferralNotePending,
    getReferralNoteError,
    getReferralNoteSuccess,
    dismissGetReferralNoteError: boundDismissError,
    setGetReferralNoteError: boundSetGetReferralNoteError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REFERRAL_GET_REFERRAL_NOTE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getReferralNotePending: true,
        getReferralNoteError: null,
      };

    case REFERRAL_GET_REFERRAL_NOTE_SUCCESS:
      // The request is success
      return {
        ...state,
        getReferralNoteSuccess: true,
        getReferralNotePending: false,
        getReferralNoteError: null,
      };

    case REFERRAL_GET_REFERRAL_NOTE_FAILURE:
      // The request is failed
      return {
        ...state,
        getReferralNotePending: false,
        getReferralNoteError: action.data.error,
      };

    case REFERRAL_GET_REFERRAL_NOTE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getReferralNoteError: null,
      };

    default:
      return state;
  }
}

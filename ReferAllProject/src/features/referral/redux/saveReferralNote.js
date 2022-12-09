import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  REFERRAL_SAVE_REFERRAL_NOTE_BEGIN,
  REFERRAL_SAVE_REFERRAL_NOTE_SUCCESS,
  REFERRAL_SAVE_REFERRAL_NOTE_FAILURE,
  REFERRAL_SAVE_REFERRAL_NOTE_DISMISS_ERROR,
  REFERRAL_SAVE_REFERRAL_NOTE_DISMISS
} from './constants';
import ApiService from '../../common/services/ApiService';

export function saveReferralNote(data, referral_id) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: REFERRAL_SAVE_REFERRAL_NOTE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.saveReferralNote(data, referral_id).then(
        (res) => {
          dispatch({
            type: REFERRAL_SAVE_REFERRAL_NOTE_SUCCESS,
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
            type: REFERRAL_SAVE_REFERRAL_NOTE_FAILURE,
            data: { error: error },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function setSaveReferralNoteError(errorMessage) {
  return {
    type: REFERRAL_SAVE_REFERRAL_NOTE_FAILURE,
    data: { error: {message: errorMessage} },
  };
}

export function dismissSaveReferralNoteError() {
  return {
    type: REFERRAL_SAVE_REFERRAL_NOTE_DISMISS_ERROR,
  };
}

export function dismissSaveReferralNote() {
  return {
    type: REFERRAL_SAVE_REFERRAL_NOTE_DISMISS,
  };
}

export function useSaveReferralNote(params) {
  const dispatch = useDispatch();

  const { saveReferralNotePending, saveReferralNoteError, saveReferralNoteSuccess } = useSelector(
    state => ({
      saveReferralNotePending: state.referral.saveReferralNotePending,
      saveReferralNoteError: state.referral.saveReferralNoteError,
      saveReferralNoteSuccess: state.referral.saveReferralNoteSuccess,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(saveReferralNote(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissSaveReferralNoteError());
  }, [dispatch]);

  const boundDismiss = useCallback(() => {
    return dispatch(dismissSaveReferralNote());
  }, [dispatch]);

  const boundSetSaveReferralNoteError = useCallback((errorMessage) => {
    return dispatch(setSaveReferralNoteError(errorMessage));
  }, [dispatch]);

  return {
    saveReferralNote: boundAction,
    saveReferralNotePending,
    saveReferralNoteError,
    saveReferralNoteSuccess,
    dismissSaveReferralNoteError: boundDismissError,
    dismissSaveReferralNote: boundDismiss,
    setSaveReferralNoteError: boundSetSaveReferralNoteError
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REFERRAL_SAVE_REFERRAL_NOTE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        saveReferralNotePending: true,
        saveReferralNoteError: null,
      };

    case REFERRAL_SAVE_REFERRAL_NOTE_SUCCESS:
      // The request is success
      return {
        ...state,
        saveReferralNoteSuccess: true,
        saveReferralNotePending: false,
        saveReferralNoteError: null,
      };

    case REFERRAL_SAVE_REFERRAL_NOTE_FAILURE:
      // The request is failed
      return {
        ...state,
        saveReferralNotePending: false,
        saveReferralNoteError: action.data.error,
      };

    case REFERRAL_SAVE_REFERRAL_NOTE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        saveReferralNoteError: null,
      };
    case REFERRAL_SAVE_REFERRAL_NOTE_DISMISS:
      // Dismiss the request failure error
      return {
        ...state,
        saveReferralNoteSuccess: null,
        saveReferralNotePending: null,
        saveReferralNoteError: null,
      };

    default:
      return state;
  }
}

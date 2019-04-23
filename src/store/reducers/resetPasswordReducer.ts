import { handleAction } from "redux-actions";
import reduceReducer from "reduce-reducers";
import {
  resetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordUnmount
} from "../actions/resetPasswordActions";
import { authUnmount } from "../actions/authActions";

const initialState = {
  error: undefined as string | undefined,
  isSuccess: false,
  isPending: false
};

const resetPasswordRequestReducer = handleAction(
  resetPasswordRequest,
  (state, action) => ({
    ...state,
    error: undefined,
    isPending: true
  }),
  initialState
);

const resetPasswordFailureReducer = handleAction(
  resetPasswordFailure,
  (state, action) => ({
    ...state,
    error: action.payload,
    isPending: false
  }),
  initialState
);

const resetPasswordSuccessReducer = handleAction(
  resetPasswordSuccess,
  (state, action) => ({
    ...state,
    isSuccess: true,
    error: undefined,
    isPending: false
  }),
  initialState
);

const resetPasswordUnmountReducer = handleAction(
  resetPasswordUnmount,
  (state, action) => initialState,
  initialState
);

export const resetPasswordReducer = reduceReducer<typeof initialState>(
  initialState,
  resetPasswordRequestReducer,
  resetPasswordFailureReducer,
  resetPasswordSuccessReducer,
  resetPasswordUnmountReducer
);

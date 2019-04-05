import { handleAction } from "redux-actions";
import reduceReducer from "reduce-reducers";
import {
  resetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess
} from "../actions/resetPasswordActions";

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

// TODO find an alternative to reduceReducer that respects correct action types
export const resetPasswordReducer = reduceReducer<typeof initialState>(
  initialState,
  resetPasswordRequestReducer as any,
  resetPasswordFailureReducer as any,
  resetPasswordSuccessReducer as any
);

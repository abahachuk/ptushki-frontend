import { handleAction } from "redux-actions";
import reduceReducer from "reduce-reducers";

import {
  authFailure,
  authRequest,
  authSuccess,
  authUnmount
} from "../actions/authActions";
import { UserInfo } from "../../app/features/auth/models";

const initialState = {
  error: undefined as string | undefined,
  isPending: false,
  user: null as UserInfo
};

const authRequestReducer = handleAction(
  authRequest,
  (state, action) => ({
    ...state,
    error: undefined,
    isPending: true,
    user: null
  }),
  initialState
);

const authFailureReducer = handleAction(
  authFailure,
  (state, action) => ({
    ...state,
    error: action.payload,
    isPending: false,
    user: null
  }),
  initialState
);

const authSuccessReducer = handleAction(
  authSuccess,
  (state, action) => ({
    ...state,
    user: action.payload,
    error: undefined,
    isPending: false
  }),
  initialState
);

const authUnmountReducer = handleAction(
  authUnmount,
  (state, action) => ({
    ...state,
    error: undefined,
    isPending: false
  }),
  initialState
);

// TODO find an alternative to reduceReducer that respects correct action types
export const authReducer = reduceReducer<typeof initialState>(
  initialState,
  authFailureReducer as any,
  authRequestReducer as any,
  authSuccessReducer as any,
  authUnmountReducer as any
);

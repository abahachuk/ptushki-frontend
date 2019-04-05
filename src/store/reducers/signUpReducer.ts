import { handleAction } from "redux-actions";
import reduceReducer from "reduce-reducers";
import { signUpFailure, signUpRequest } from "../actions/signUpActions";

const initialState = {
  error: undefined as string | undefined,
  isPending: false
};

const signUpSuccessReducer = handleAction(
  signUpRequest,
  (state, action) => ({
    ...state,
    isPending: true
  }),
  initialState
);

const signUpFailureReducer = handleAction(
  signUpFailure,
  (state, action) => ({
    ...state,
    error: action.payload
  }),
  initialState
);

// TODO find an alternative to reduceReducer that respects correct action types
export const signUpReducer = reduceReducer<typeof initialState>(
  initialState,
  signUpFailureReducer as any,
  signUpSuccessReducer as any
);

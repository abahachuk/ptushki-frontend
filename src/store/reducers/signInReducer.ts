import { handleAction } from "redux-actions";
import { signInFailure } from "../actions/signInActions";

export const signInReducer = handleAction(
  signInFailure,
  (state, action) => ({
    ...state,
    error: action.payload
  }),
  { error: undefined as string | undefined }
);

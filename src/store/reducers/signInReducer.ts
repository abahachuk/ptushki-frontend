import { handleAction } from "redux-actions";
import { signInAction } from "../actions/signInActions";

export const signInReducer = handleAction(
  signInAction.failure,
  (state, action) => ({
    ...state,
    error: action.payload
  }),
  { error: undefined as string | undefined }
);

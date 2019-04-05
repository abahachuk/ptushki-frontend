import { handleAction } from "redux-actions";
import { signUpAction } from "../actions/signUpActions";

export const signUpReducer = handleAction(
  signUpAction.failure,
  (state, action) => ({
    ...state,
    error: action.payload
  }),
  { error: undefined as string | undefined }
);

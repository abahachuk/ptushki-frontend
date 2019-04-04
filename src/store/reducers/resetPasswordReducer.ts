import { handleAction } from "redux-actions";
import { resetPasswordAction } from "../actions/resetPasswordActions";

export const resetPasswordReducer = handleAction(
  resetPasswordAction.failure,
  (state, action) => ({
    ...state,
    error: action.payload
  }),
  { error: undefined as string | undefined }
);

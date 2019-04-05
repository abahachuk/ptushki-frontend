import { handleAction } from "redux-actions";
import { resetPasswordFailure } from "../actions/resetPasswordActions";

export const resetPasswordReducer = handleAction(
  resetPasswordFailure,
  (state, action) => ({
    ...state,
    error: action.payload
  }),
  { error: undefined as string | undefined }
);

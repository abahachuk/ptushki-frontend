import { createAsyncAction } from "typesafe-actions";
import { ThunkAction } from "redux-thunk";
import { ResetPasswordData } from "../../app/features/auth/resetpassword/ResetPasswordData";
import { RootState } from "../index";

export const resetPasswordAction = createAsyncAction(
  "RESET_PASSWORD_REQUEST",
  "RESET_PASSWORD_SUCCESS",
  "RESET_PASSWORD_FAILURE"
)<ResetPasswordData, any, string>();

export const resetPassword = (
  data: ResetPasswordData
): ThunkAction<void, RootState, undefined, any> => dispatch => {
  dispatch(resetPasswordAction.request(data));

  new Promise<number>((resolve, reject) => {
    console.log("sign in request", data);
    // replace this promise with api call
    reject(new Error("not implemented"));
  })
    .then(d => {
      dispatch(resetPasswordAction.success(d));
    })
    .catch((e: Error) => {
      dispatch(resetPasswordAction.failure(e.message));
    });
};

import { createAction } from "redux-actions";
import { ThunkAction } from "redux-thunk";
import { ResetPasswordData } from "../../app/features/auth/resetpassword/ResetPasswordData";
import { RootState } from "../index";

export const resetPasswordRequest = createAction<ResetPasswordData>(
  "RESET_PASSWORD_REQUEST"
);
export const resetPasswordSuccess = createAction<void>(
  "RESET_PASSWORD_SUCCESS"
);
export const resetPasswordFailure = createAction<string>(
  "RESET_PASSWORD_FAILURE"
);

export const resetPassword = (
  data: ResetPasswordData
): ThunkAction<void, RootState, undefined, any> => dispatch => {
  dispatch(resetPasswordRequest(data));

  new Promise<number>((resolve, reject) => {
    console.log("sign in request", data);
    // replace this promise with api call
    reject(new Error("not implemented"));
  })
    .then(d => {
      dispatch(resetPasswordSuccess());
    })
    .catch((e: Error) => {
      dispatch(resetPasswordFailure(e.message));
    });
};

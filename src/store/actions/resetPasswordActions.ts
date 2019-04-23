import { createAction } from "redux-actions";
import { ThunkAction } from "redux-thunk";
import { ResetPasswordData } from "../../app/features/auth/models";
import { RootState } from "../index";
import { ajaxService } from "../../services";
import { RESTORE_PASSWORD_ENDPOINT } from "../../config/endpoints";

export const resetPasswordRequest = createAction<ResetPasswordData>(
  "RESET_PASSWORD_REQUEST"
);
export const resetPasswordSuccess = createAction<void>(
  "RESET_PASSWORD_SUCCESS"
);
export const resetPasswordFailure = createAction<string>(
  "RESET_PASSWORD_FAILURE"
);
export const resetPasswordUnmount = createAction<void>(
  "RESET_PASSWORD_UNMOUNT"
);

export const resetPasswordExit = (): ThunkAction<
  void,
  RootState,
  undefined,
  any
> => dispatch => {
  dispatch(resetPasswordUnmount());
};

export const resetPassword = (
  data: ResetPasswordData
): ThunkAction<void, RootState, undefined, any> => async dispatch => {
  dispatch(resetPasswordRequest(data));

  try {
    await ajaxService.makeCall<void>(RESTORE_PASSWORD_ENDPOINT, data);
    dispatch(resetPasswordSuccess());
  } catch (e) {
    dispatch(resetPasswordFailure(e.message));
  }
};

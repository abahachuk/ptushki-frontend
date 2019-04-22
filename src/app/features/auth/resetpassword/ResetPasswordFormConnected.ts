import { connect } from "react-redux";

import { RootState } from "../../../../store";
import {
  resetPassword,
  resetPasswordExit
} from "../../../../store/actions/resetPasswordActions";

import { ResetPasswordForm } from "./ResetPasswordForm";

export const ResetPasswordFormConnected = connect(
  (state: RootState) => ({
    ...state.resetPassword
  }),
  {
    onSubmit: resetPassword,
    resetPasswordExit
  }
)(ResetPasswordForm);

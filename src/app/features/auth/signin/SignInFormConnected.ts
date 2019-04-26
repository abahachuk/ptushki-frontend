import { connect } from "react-redux";

import { RootState } from "../../../../store";
import { authExit, signIn } from "../../../../store/actions/authActions";

import { SignInForm } from "./SignInForm";

export const SignInFormConnected = connect(
  (state: RootState) => ({
    ...state.auth
  }),
  {
    onSubmit: signIn(),
    authExit
  }
)(SignInForm);

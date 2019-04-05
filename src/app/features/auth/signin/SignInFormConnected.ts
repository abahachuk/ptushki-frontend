import { connect } from "react-redux";
import { RootState } from "../../../../store";
import { SignInForm } from "./SignInForm";
import { authExit, signIn } from "../../../../store/actions/authActions";

export const SignInFormConnected = connect(
  (state: RootState) => ({
    ...state.auth
  }),
  {
    onSubmit: signIn(),
    authExit
  }
)(SignInForm);

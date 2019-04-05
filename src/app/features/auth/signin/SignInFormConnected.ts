import { connect } from "react-redux";
import { RootState } from "../../../../store";
import { SignInForm } from "./SignInForm";
import { signIn } from "../../../../store/actions/authActions";

export const SignInFormConnected = connect(
  (state: RootState) => ({
    ...state.auth
  }),
  {
    onSubmit: signIn()
  }
)(SignInForm);

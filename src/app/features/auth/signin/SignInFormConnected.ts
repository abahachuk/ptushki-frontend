import { connect } from "react-redux";
import { RootState } from "../../../../store";
import { signIn } from "../../../../store/actions/signInActions";
import { SignInForm } from "./SignInForm";

export const SignInFormConnected = connect(
  (state: RootState) => ({
    ...state.signIn
  }),
  {
    onSubmit: signIn
  }
)(SignInForm);

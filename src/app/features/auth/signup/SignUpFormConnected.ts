import { connect } from "react-redux";
import { RootState } from "../../../../store";
import { signUp } from "../../../../store/actions/signUpActions";
import { SignUpForm } from "./SignUpForm";

export const SignUpFormConnected = connect(
  (state: RootState) => ({
    ...state.signUp
  }),
  {
    onSubmit: signUp
  }
)(SignUpForm);

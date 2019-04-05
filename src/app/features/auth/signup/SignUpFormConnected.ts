import { connect } from "react-redux";
import { RootState } from "../../../../store";
import { signUp } from "../../../../store/actions/authActions";
import { SignUpForm } from "./SignUpForm";

export const SignUpFormConnected = connect(
  (state: RootState) => ({
    ...state.auth
  }),
  {
    onSubmit: signUp()
  }
)(SignUpForm);

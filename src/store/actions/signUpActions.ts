import { ThunkAction } from "redux-thunk";
import { createAction } from "redux-actions";
import { SignUpData } from "../../app/features/auth/signup/SignUpData";
import { RootState } from "../index";

export const signUpRequest = createAction<SignUpData>("SIGN_UP_REQUEST");
export const signUpSuccess = createAction<void>("SIGN_UP_SUCCESS");
export const signUpFailure = createAction<string>("SIGN_UP_FAILURE");

export const signUp = (
  data: SignUpData
): ThunkAction<void, RootState, undefined, any> => dispatch => {
  dispatch(signUpRequest(data));

  new Promise<number>((resolve, reject) => {
    // replace this promise with api call
    reject(new Error("not implemented"));
  })
    .then(d => {
      dispatch(signUpSuccess());
    })
    .catch((e: Error) => {
      dispatch(signUpFailure(e.message));
    });
};

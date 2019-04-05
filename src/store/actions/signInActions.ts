import { createAction } from "redux-actions";
import { ThunkAction } from "redux-thunk";
import { SignInData } from "../../app/features/auth/signin/SignInData";
import { RootState } from "../index";

export const signInRequest = createAction<SignInData>("SIGN_IN_REQUEST");
export const signInSuccess = createAction<void>("SIGN_IN_SUCCESS");
export const signInFailure = createAction<string>("SIGN_IN_FAILURE");

export const signIn = (
  data: SignInData
): ThunkAction<void, RootState, undefined, any> => dispatch => {
  dispatch(signInRequest(data));

  new Promise<number>((resolve, reject) => {
    console.log("sign in request", data);
    // replace this promise with api call
    reject(new Error("not implemented"));
  })
    .then(d => {
      dispatch(signInSuccess());
    })
    .catch((e: Error) => {
      dispatch(signInFailure(e.message));
    });
};

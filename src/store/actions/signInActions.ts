import { createAsyncAction } from "typesafe-actions";
import { ThunkAction } from "redux-thunk";
import { SignInData } from "../../app/features/auth/signin/SignInData";
import { RootState } from "../index";

export const signInAction = createAsyncAction(
  "SIGN_IN_REQUEST",
  "SIGN_IN_SUCCESS",
  "SIGN_IN_FAILURE"
)<SignInData, any, string>();

export const signIn = (
  data: SignInData
): ThunkAction<void, RootState, undefined, any> => dispatch => {
  dispatch(signInAction.request(data));

  new Promise<number>((resolve, reject) => {
    console.log("sign in request", data);
    // replace this promise with api call
    reject(new Error("not implemented"));
  })
    .then(d => {
      dispatch(signInAction.success(d));
    })
    .catch((e: Error) => {
      dispatch(signInAction.failure(e.message));
    });
};

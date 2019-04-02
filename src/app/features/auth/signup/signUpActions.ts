import { createAsyncAction } from "typesafe-actions";
import { ThunkAction } from "redux-thunk";
import { SignUpData } from "./SignUpData";
import { RootState } from "../../../../store";

export const signUpAction = createAsyncAction(
  "SIGN_UP_REQUEST",
  "SIGN_UP_SUCCESS",
  "SIGN_UP_FAILURE"
)<SignUpData, any, string>();

export const signUp = (
  data: SignUpData
): ThunkAction<void, RootState, undefined, any> => dispatch => {
  dispatch(signUpAction.request(data));

  new Promise<number>((resolve, reject) => {
    console.log("sign up request", data);
    // replace this promise with api call
    reject(new Error("not implemented"));
  })
    .then(d => {
      dispatch(signUpAction.success(d));
    })
    .catch((e: Error) => {
      dispatch(signUpAction.failure(e.message));
    });
};

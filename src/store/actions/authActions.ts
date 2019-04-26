import { ThunkAction } from "redux-thunk";
import { createAction } from "redux-actions";

import { RootState } from "../index";
import { AuthData, UserInfo } from "../../app/features/auth/models";
import { SING_IN_ENDPOINT, SING_UP_ENDPOINT } from "../../config/endpoints";
import { ajaxService, securityService } from "../../services";

// TODO: update to enum?
const AuthEndpoint = {
  singUp: SING_UP_ENDPOINT,
  singIn: SING_IN_ENDPOINT
};

export const authRequest = createAction<AuthData>("AUTH_REQUEST");
export const authSuccess = createAction<UserInfo>("AUTH_SUCCESS");
export const authFailure = createAction<string>("AUTH_FAILURE");
export const authUnmount = createAction<void>("AUTH_UNMOUNT");
export const logout = createAction<void>("LOGOUT");

export const authExit = (): ThunkAction<
  void,
  RootState,
  undefined,
  any
> => dispatch => {
  dispatch(authUnmount());
};

const auth = (type: "singIn" | "singUp") => (
  data: AuthData
): ThunkAction<void, RootState, undefined, any> => async dispatch => {
  dispatch(authRequest(data));
  try {
    const userInfo = await ajaxService.makeAuthCall(AuthEndpoint[type], data);
    dispatch(authSuccess(userInfo));
  } catch (e) {
    dispatch(authFailure(e.message));
  }
};

export const signUp = () => auth("singUp");
export const signIn = () => auth("singIn");

export const signOut = (): ThunkAction<
  void,
  RootState,
  undefined,
  any
> => async dispatch => {
  securityService.reset();
  dispatch(logout());
};

import React, { FC } from "react";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import useMount from "react-use/esm/useMount";
import { history } from "./features/routing/history";
import {
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_RESET_PASSWORD,
  ROUTE_BIRD_INFO
} from "./features/routing/routes";
import { RootNav } from "./features/nav/RootNav";
import { SignUpFormConnected } from "./features/auth/signup/SignUpFormConnected";
import { SignInFormConnected } from "./features/auth/signin/SignInFormConnected";
import { ResetPasswordFormConnected } from "./features/auth/resetpassword/ResetPasswordFormConnected";
import { ProtectedRouteConnected } from "./features/routing/ProtectedRouteConnected";
import { BirdInfoForm } from "./features/bird-info/BirdInfoConnected";

export const App: FC<{
  getUser: () => void;
}> = ({ getUser }) => {
  useMount(getUser);

  return (
    <ConnectedRouter history={history}>
      <RootNav />

      <Switch>
        <Route exact path="/">
          [Landing here]
        </Route>

        <ProtectedRouteConnected
          exact
          {...ROUTE_BIRD_INFO}
          component={BirdInfoForm}
        />

        <ProtectedRouteConnected
          exact
          {...ROUTE_SIGN_UP}
          component={SignUpFormConnected}
        />
        <ProtectedRouteConnected
          exact
          {...ROUTE_SIGN_IN}
          component={SignInFormConnected}
        />
        <ProtectedRouteConnected
          exact
          {...ROUTE_RESET_PASSWORD}
          component={ResetPasswordFormConnected}
        />
      </Switch>
    </ConnectedRouter>
  );
};

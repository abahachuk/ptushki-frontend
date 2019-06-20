import { ConnectedRouter } from "connected-react-router";
import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router";
import useMount from "react-use/esm/useMount";
import { Footer } from "../components/footer/Footer";
import { Scope, UserAction } from "../config/permissions";
import { CanConnected } from "./features/auth/CanConnected";
import { ResetPasswordFormConnected } from "./features/auth/resetpassword/ResetPasswordFormConnected";
import { SignInFormConnected } from "./features/auth/signin/SignInFormConnected";
import { SignUpFormConnected } from "./features/auth/signup/SignUpFormConnected";
import { RootNavConnected } from "./features/nav/RootNav";
import { history } from "./features/routing/history";
import { ProtectedRoute } from "./features/routing/ProtectedRoute";
import { ObservationsRoute } from "./features/observations/ObservationRoute";
import { BirdsRoute } from "./features/birds/BirdsRoute";
import { AboutUsPage } from "./features/about-us/AboutUsPage";
import {
  HOME,
  ROUTE_BIRDS,
  ROUTE_OBSERVATIONS,
  ROUTE_RESET_PASSWORD,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_ABOUT_US
} from "./features/routing/routes";

export const App: FC<{
  getUser: () => void;
  isLoaded: boolean;
}> = ({ getUser, isLoaded }) => {
  useMount(getUser);

  if (!isLoaded) return null;

  return (
    <ConnectedRouter history={history}>
      <RootNavConnected />

      <Switch>
        <Route exact path={HOME}>
          <CanConnected
            I={UserAction.observe}
            a={Scope.observations}
            passThrough
          >
            {can => {
              return (
                <Redirect
                  to={can ? ROUTE_OBSERVATIONS.path : ROUTE_SIGN_IN.path}
                />
              );
            }}
          </CanConnected>
        </Route>

        <ProtectedRoute
          exact
          {...ROUTE_SIGN_UP}
          component={SignUpFormConnected}
        />
        <ProtectedRoute
          exact
          {...ROUTE_SIGN_IN}
          component={SignInFormConnected}
        />
        <ProtectedRoute
          exact
          {...ROUTE_RESET_PASSWORD}
          component={ResetPasswordFormConnected}
        />
        <ProtectedRoute exact {...ROUTE_ABOUT_US} component={AboutUsPage} />

        <BirdsRoute path={ROUTE_BIRDS.path} />
        <ObservationsRoute path={ROUTE_OBSERVATIONS.path} />
        <Redirect to={HOME} />
      </Switch>

      <Footer />
    </ConnectedRouter>
  );
};

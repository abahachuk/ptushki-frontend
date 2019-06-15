import { ConnectedRouter } from "connected-react-router";
import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router";
import useMount from "react-use/esm/useMount";
import { Footer } from "../components/footer/Footer";
import { Scope, UserAction } from "../config/permissions";
import { AddObservation } from "./features/add-observation/AddObservationForm";
import { CanConnected } from "./features/auth/CanConnected";
import { ResetPasswordFormConnected } from "./features/auth/resetpassword/ResetPasswordFormConnected";
import { SignInFormConnected } from "./features/auth/signin/SignInFormConnected";
import { SignUpFormConnected } from "./features/auth/signup/SignUpFormConnected";
import { BirdInfoForm } from "./features/bird-info/BirdInfoForm";
import { BirdsPage } from "./features/birds/BirdsPage";
import { RootNavConnected } from "./features/nav/RootNav";
import { ObservationsPage } from "./features/observations/ObservationsPage";
import { history } from "./features/routing/history";
import { ProtectedRoute } from "./features/routing/ProtectedRoute";
import {
  HOME,
  ROUTE_ADD_OBSERVATION,
  ROUTE_BIRD_INFO,
  ROUTE_BIRDS,
  ROUTE_OBSERVATIONS,
  ROUTE_RESET_PASSWORD,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP
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

        <ProtectedRoute exact {...ROUTE_BIRD_INFO} component={BirdInfoForm} />

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
        <ProtectedRoute
          exact
          {...ROUTE_OBSERVATIONS}
          component={ObservationsPage}
        />
        <ProtectedRoute exact {...ROUTE_BIRDS} component={BirdsPage} />

        <ProtectedRoute
          exact
          {...ROUTE_ADD_OBSERVATION}
          component={AddObservation}
        />
      </Switch>

      <Footer />
    </ConnectedRouter>
  );
};

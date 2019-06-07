import { ConnectedRouter } from "connected-react-router";
import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router";
import useMount from "react-use/esm/useMount";
import { Footer } from "../components/footer/Footer";
import { AddObservation } from "./features/add-observation/AddObservationForm";
import { UserInfo } from "./features/auth/models";
import { ResetPasswordFormConnected } from "./features/auth/resetpassword/ResetPasswordFormConnected";
import { SignInFormConnected } from "./features/auth/signin/SignInFormConnected";
import { SignUpFormConnected } from "./features/auth/signup/SignUpFormConnected";
import { BirdInfoForm } from "./features/bird-info/BirdInfoForm";
import { BirdsPage } from "./features/birds/BirdsPage";
import { RootNavConnected } from "./features/nav/RootNav";
import { ObservationsPage } from "./features/observations/ObservationsPage";
import { history } from "./features/routing/history";
import { ProtectedRouteConnected } from "./features/routing/ProtectedRouteConnected";
import {
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
  user: UserInfo;
  isLoaded: boolean;
}> = ({ getUser, user, isLoaded }) => {
  useMount(getUser);

  if (!isLoaded) return null;

  return (
    <ConnectedRouter history={history}>
      {user && <RootNavConnected />}

      <Switch>
        <Route exact path="/">
          <Redirect to={user ? ROUTE_OBSERVATIONS.path : ROUTE_SIGN_IN.path} />
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
        <ProtectedRouteConnected
          exact
          {...ROUTE_OBSERVATIONS}
          component={ObservationsPage}
        />
        <ProtectedRouteConnected exact {...ROUTE_BIRDS} component={BirdsPage} />

        <ProtectedRouteConnected
          exact
          {...ROUTE_ADD_OBSERVATION}
          component={AddObservation}
        />
      </Switch>

      {user && <Footer />}
    </ConnectedRouter>
  );
};

import React from "react";
import "./App.scss";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { store } from "../store";
import { history } from "./features/routing/history";
import { ROUTE_SIGN_UP } from "./features/routing/routes";
import { RootNav } from "./features/nav/RootNav";

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootNav />

      <Container>
        <Switch>
          <Route exact path="/">
            [Landing here]
          </Route>

          <Route exact path={ROUTE_SIGN_UP}>
            [Sign up page here]
          </Route>
        </Switch>
      </Container>
    </ConnectedRouter>
  </Provider>
);

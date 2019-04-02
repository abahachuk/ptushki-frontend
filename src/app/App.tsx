import React from "react";
import "./App.scss";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { store } from "../store";
import { SampleBirdIncrementerConnected } from "./features/sample/SampleBirdIncrementer";
import { SignUpFormConnected } from "./features/auth/signup/SignUpFormConnected";

export const App = () => (
  <Provider store={store}>
    <Container>
      <SampleBirdIncrementerConnected />
      <SignUpFormConnected />
    </Container>
  </Provider>
);

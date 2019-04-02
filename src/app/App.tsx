import React from "react";
import "./App.scss";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { store } from "../store";
import { SampleBirdIncrementerConnected } from "./features/sample/SampleBirdIncrementer";
import { SignUpForm } from "./features/auth/signup/SignUpForm";

export const App = () => (
  <Provider store={store}>
    <Container>
      <SampleBirdIncrementerConnected />
      <SignUpForm onSubmit={data => console.log("on sign up submit", data)} />
    </Container>
  </Provider>
);

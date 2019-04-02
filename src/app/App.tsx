import React from "react";
import "./App.scss";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { store } from "../store";
import { SampleBirdIncrementerConnected } from "./features/sample/SampleBirdIncrementer";

export const App = () => (
  <Provider store={store}>
    <Container>
      <SampleBirdIncrementerConnected />
    </Container>
  </Provider>
);

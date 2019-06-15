import React, { FC } from "react";
import { RouteProps } from "react-router";
import { ROUTE_OBSERVATIONS } from "../routing/routes";
import { ObservationsPage } from "./ObservationsPage";
import { AddObservation } from "../add-observation/AddObservationForm";
import { ComponentRoute } from "../routing/ComponentRoute";
import { BirdInfoForm } from "../bird-info/BirdInfoForm";

export const ObservationsRoute: FC<RouteProps> = () => {
  return (
    <ComponentRoute
      route={ROUTE_OBSERVATIONS}
      PageComponent={ObservationsPage}
      AddComponent={AddObservation}
      DetailComponent={BirdInfoForm}
    />
  );
};

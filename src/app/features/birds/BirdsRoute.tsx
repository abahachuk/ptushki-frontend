import React, { FC } from "react";
import { RouteProps } from "react-router";
import { ROUTE_BIRDS } from "../routing/routes";
import { AddObservation } from "../add-observation/AddObservationForm";
import { ComponentRoute } from "../routing/ComponentRoute";
import { BirdsPage } from "./BirdsPage";

export const BirdsRoute: FC<RouteProps> = () => {
  return (
    <ComponentRoute
      route={ROUTE_BIRDS}
      PageComponent={BirdsPage}
      AddComponent={AddObservation}
      DetailComponent={AddObservation}
    />
  );
};

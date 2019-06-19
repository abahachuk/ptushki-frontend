import React, { FC } from "react";
import { RouteProps } from "react-router";
import { ROUTE_OBSERVATIONS } from "../routing/routes";
import { ObservationsPage } from "./ObservationsPage";
import { ComponentRoute } from "../routing/ComponentRoute";
import { CreatePageConnected } from "../create-page/CreatePageConnected";
import { Scope } from "../../../config/permissions";
import { circumstancesConfig } from "../create-page/test.data";
import {
  addObservation,
  updateObservation
} from "../../../store/actions/observationActions";
import { InfoPageConnected } from "../info-page/InfoPageConnected";
import { RootState } from "../../../store";
import { ImportObservations } from "../import-observations/ImportObservations";

const commonProps = {
  sendFn: addObservation.request,
  updateFn: updateObservation,
  scope: Scope.observations,
  stateSelector: (state: RootState) => state.observation
};

const AddObservation = () => (
  // @ts-ignore
  <CreatePageConnected {...commonProps} />
);

const InfoPage = () => (
  // @ts-ignore
  <InfoPageConnected {...commonProps} removeFn={addObservation.request} />
);

export const ObservationsRoute: FC<RouteProps> = () => {
  return (
    <ComponentRoute
      route={ROUTE_OBSERVATIONS}
      PageComponent={ObservationsPage}
      AddComponent={AddObservation}
      DetailComponent={InfoPage}
      ImportComponent={ImportObservations}
    />
  );
};

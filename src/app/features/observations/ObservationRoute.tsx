import React, { FC } from "react";
import { RouteComponentProps, RouteProps } from "react-router";
import { Scope } from "../../../config/permissions";
import { RootState } from "../../../store";
import {
  addObservation,
  deleteObservation,
  flushObservation,
  getObservation,
  putObservation,
  updateObservation
} from "../../../store/actions/observationActions";
import { CreatePageConnected } from "../create-page/CreatePageConnected";
import { ImportObservationsConnected } from "../import-observations/ImportObservations";
import { InfoPageConnected } from "../info-page/InfoPageConnected";
import { ComponentRoute } from "../routing/ComponentRoute";
import { ROUTE_OBSERVATIONS } from "../routing/routes";
import { ObservationsGridPage } from "./ObservationsGridPage";

const commonProps = {
  updateFn: updateObservation,
  scope: Scope.observations,
  stateSelector: (state: RootState) => state.observation
};

const AddObservation = () => (
  <CreatePageConnected {...commonProps} sendFn={addObservation.request} />
);

const InfoPage: FC<RouteComponentProps<{ id: string }>> = routeProps => (
  <InfoPageConnected
    {...commonProps}
    {...routeProps}
    removeFn={deleteObservation.request}
    getFn={getObservation.request}
    flushFn={flushObservation}
    sendFn={putObservation.request}
  />
);

export const ObservationsRoute: FC<RouteProps> = () => {
  return (
    <ComponentRoute
      route={ROUTE_OBSERVATIONS}
      GridComponent={ObservationsGridPage}
      AddComponent={AddObservation}
      DetailComponent={InfoPage}
      ImportComponent={() => <ImportObservationsConnected />}
    />
  );
};

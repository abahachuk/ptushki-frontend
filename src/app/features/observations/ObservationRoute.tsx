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
import { GridPage } from "../grid-page/GridPage";
import { ObservationListConnected } from "./ObservationList";

const commonProps = {
  updateFn: updateObservation,
  scope: Scope.observations,
  stateSelector: (state: RootState) => state.observation
};

const AddObservation = () => (
  <CreatePageConnected {...commonProps} sendFn={addObservation.request} />
);

const ObservationsGrid = () => (
  <GridPage route={ROUTE_OBSERVATIONS}>
    <ObservationListConnected />
  </GridPage>
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
      GridComponent={ObservationsGrid}
      AddComponent={AddObservation}
      DetailComponent={InfoPage}
      ImportComponent={() => <ImportObservationsConnected />}
    />
  );
};

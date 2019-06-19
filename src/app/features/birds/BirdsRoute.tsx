import React, { FC } from "react";
import { RouteProps } from "react-router";
import { ROUTE_BIRDS } from "../routing/routes";
import { ComponentRoute } from "../routing/ComponentRoute";
import { BirdsPage } from "./BirdsPage";
import { CreatePageConnected } from "../create-page/CreatePageConnected";
import { Scope } from "../../../config/permissions";
import { InfoPageConnected } from "../info-page/InfoPageConnected";
import { BirdObservationsListConnected } from "../bird-info/BirdObservationsList";
import { addObservation } from "../../../store/actions/observationActions";
import { RootState } from "../../../store";
import { addBird, updateBird } from "../../../store/actions/birdActions";

const commonProps = {
  sendFn: addBird.request,
  updateFn: updateBird,
  scope: Scope.birds,
  stateSelector: (state: RootState) => state.bird
};

const AddBird = () => (
  // @ts-ignore
  <CreatePageConnected {...commonProps} />
);

const InfoPage = () => (
  // @ts-ignore
  <InfoPageConnected
    {...commonProps}
    removeFn={addObservation.request}
    historyComponent={<BirdObservationsListConnected />}
  />
);

export const BirdsRoute: FC<RouteProps> = () => {
  return (
    <ComponentRoute
      route={ROUTE_BIRDS}
      PageComponent={BirdsPage}
      AddComponent={AddBird}
      DetailComponent={InfoPage}
    />
  );
};

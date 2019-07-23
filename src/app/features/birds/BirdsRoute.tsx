import React, { FC } from "react";
import { RouteComponentProps, RouteProps } from "react-router";
import { ROUTE_BIRDS } from "../routing/routes";
import { ComponentRoute } from "../routing/ComponentRoute";
import { BirdsGridPage } from "./BirdsGridPage";
import { CreatePageConnected } from "../create-page/CreatePageConnected";
import { Scope } from "../../../config/permissions";
import { InfoPageConnected } from "../info-page/InfoPageConnected";
import { BirdObservationsListConnected } from "./BirdObservationsList";
import { RootState } from "../../../store";
import {
  addBird,
  deleteBird,
  flushBird,
  getBird,
  putBird,
  updateBird
} from "../../../store/actions/birdActions";

const commonProps = {
  updateFn: updateBird,
  scope: Scope.birds,
  stateSelector: (state: RootState) => state.bird
};

const AddBird = () => (
  <CreatePageConnected {...commonProps} sendFn={addBird.request} />
);

const InfoPage: FC<RouteComponentProps<{ id: string }>> = routeProps => (
  <InfoPageConnected
    {...commonProps}
    {...routeProps}
    removeFn={deleteBird.request}
    historyComponent={
      <BirdObservationsListConnected id={routeProps.match.params.id} />
    }
    getFn={getBird.request}
    flushFn={flushBird}
    sendFn={putBird.request}
  />
);

export const BirdsRoute: FC<RouteProps> = () => {
  return (
    <ComponentRoute
      route={ROUTE_BIRDS}
      GridComponent={BirdsGridPage}
      AddComponent={AddBird}
      DetailComponent={InfoPage}
    />
  );
};

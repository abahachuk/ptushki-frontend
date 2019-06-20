import React, { FC } from "react";
import { RouteComponentProps, RouteProps } from "react-router";
import { ROUTE_BIRDS } from "../routing/routes";
import { ComponentRoute } from "../routing/ComponentRoute";
import { BirdsPage } from "./BirdsPage";
import { CreatePageConnected } from "../create-page/CreatePageConnected";
import { Scope } from "../../../config/permissions";
import { InfoPageConnected } from "../info-page/InfoPageConnected";
import { BirdObservationsListConnected } from "../bird-info/BirdObservationsList";
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
  // @ts-ignore
  <CreatePageConnected {...commonProps} sendFn={addBird.request} />
);

const InfoPage = (routeProps: RouteComponentProps<{ id: string }>) => (
  // @ts-ignore
  <InfoPageConnected
    {...commonProps}
    {...routeProps}
    removeFn={deleteBird.request}
    historyComponent={<BirdObservationsListConnected />}
    getFn={getBird.request}
    // @ts-ignore
    flushFn={flushBird}
    sendFn={putBird.request}
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

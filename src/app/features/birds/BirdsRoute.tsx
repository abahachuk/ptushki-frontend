import React, { FC } from "react";
import { RouteProps } from "react-router";
import { ROUTE_BIRDS } from "../routing/routes";
import { ComponentRoute } from "../routing/ComponentRoute";
import { BirdsPage } from "./BirdsPage";
import { BirdInfoForm } from "../bird-info/BirdInfoForm";
import { CreatePageConnected } from "../create-page/CreatePageConnected";
import { Scope } from "../../../config/permissions";
import { circumstancesConfig } from "../add-observation/test.data";
import { addObservation } from "../../../store/actions/addObservationsActions";

const AddBird = () => (
  <CreatePageConnected
    scope={Scope.birds}
    circumstancesConfig={circumstancesConfig}
    requestFn={addObservation.request}
  />
);

export const BirdsRoute: FC<RouteProps> = () => {
  return (
    <ComponentRoute
      route={ROUTE_BIRDS}
      PageComponent={BirdsPage}
      AddComponent={AddBird}
      DetailComponent={BirdInfoForm}
    />
  );
};

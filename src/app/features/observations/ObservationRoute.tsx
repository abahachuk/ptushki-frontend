import React, { FC } from "react";
import { RouteProps } from "react-router";
import { ROUTE_OBSERVATIONS } from "../routing/routes";
import { ObservationsPage } from "./ObservationsPage";
import { ComponentRoute } from "../routing/ComponentRoute";
import { ObservationInfoFormConnected } from "../observation-info/ObservationInfoConnected";
import { CreatePageConnected } from "../create-page/CreatePageConnected";
import { Scope } from "../../../config/permissions";
import { circumstancesConfig } from "../add-observation/test.data";
import { addObservation } from "../../../store/actions/addObservationsActions";

const AddObservation = () => (
  <CreatePageConnected
    scope={Scope.observations}
    circumstancesConfig={circumstancesConfig}
    requestFn={addObservation.request}
  />
);

export const ObservationsRoute: FC<RouteProps> = () => {
  return (
    <ComponentRoute
      route={ROUTE_OBSERVATIONS}
      PageComponent={ObservationsPage}
      AddComponent={AddObservation}
      DetailComponent={ObservationInfoFormConnected}
    />
  );
};

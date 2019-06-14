import React from "react";
import "../../../components/table/DataGrid.scss";
import { labels } from "../../../config/i18n/labels";
import { ROUTE_ADD_OBSERVATION } from "../routing/routes";
import { ObservationListConnected } from "./ObservationList";
import { TableHeader } from "../../../components/table/TableHeader";
import { Scope } from "../../../config/permissions";

export const ObservationsPage = () => {
  return (
    <div style={{ backgroundColor: "white", flexGrow: 1 }} className="p-3">
      <TableHeader
        title={labels.observations.title}
        addButtonTitle={labels.addObservation.actionTitle}
        addButtonPath={ROUTE_ADD_OBSERVATION.path}
        scope={Scope.observations}
      />
      <ObservationListConnected />
    </div>
  );
};

import React from "react";
import "../../../components/table/DataGrid.scss";
import { labels } from "../../../config/i18n/labels";
import { ROUTE_OBSERVATIONS } from "../routing/routes";
import { ObservationListConnected } from "./ObservationList";
import { TableHeader } from "../../../components/table/TableHeader";

export const ObservationsPage = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch"
      }}
      className="p-3"
    >
      <TableHeader
        title={labels.observations.title}
        addButtonTitle={labels.addObservation.actionTitle}
        route={ROUTE_OBSERVATIONS}
      />
      <ObservationListConnected />
    </div>
  );
};

import React from "react";
import "../../../components/table/DataGrid.scss";
import { ObservationListConnected } from "./ObservationList";

export const ObservationsPage = () => {
  return (
    <div style={{ backgroundColor: "white" }} className="p-5">
      <ObservationListConnected />
    </div>
  );
};
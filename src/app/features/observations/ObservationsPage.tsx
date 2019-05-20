import React from "react";
import "../../../components/table/DataGrid.scss";
import { labels } from "../../../config/i18n/labels";
import { ObservationListConnected } from "./ObservationList";

export const ObservationsPage = () => {
  return (
    <div className="p-4">
      <div>
        <h1>{labels.observations.title}</h1>
      </div>
      <ObservationListConnected />
    </div>
  );
};

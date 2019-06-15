import React, { FC } from "react";
import "../../../components/table/DataGrid.scss";
import { labels } from "../../../config/i18n/labels";
import { ROUTE_BIRDS } from "../routing/routes";
import { BirdsListConnected } from "./BirdsList";
import { TableHeader } from "../../../components/table/TableHeader";

export const BirdsPage = () => {
  return (
    <div style={{ backgroundColor: "white", flexGrow: 1 }} className="p-3">
      <TableHeader
        title={labels.birds.title}
        addButtonTitle={labels.addBird.actionTitle}
        route={ROUTE_BIRDS}
      />
      <BirdsListConnected />
    </div>
  );
};

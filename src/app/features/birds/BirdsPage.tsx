import React from "react";
import "../../../components/table/DataGrid.scss";
import { labels } from "../../../config/i18n/labels";
import { ROUTE_ADD_BIRD } from "../routing/routes";
import { BirdsListConnected } from "./BirdsList";
import { TableHeader } from "../../../components/table/TableHeader";
import { Scope } from "../../../config/permissions";

export const BirdsPage = () => {
  return (
    <div style={{ backgroundColor: "white", flexGrow: 1 }} className="p-3">
      <TableHeader
        title={labels.birds.title}
        addButtonTitle={labels.addBird.actionTitle}
        addButtonPath={ROUTE_ADD_BIRD.path}
        scope={Scope.birds}
      />
      <BirdsListConnected />
    </div>
  );
};

import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { CanConnected } from "../../app/features/auth/CanConnected";
import { RouteDescription } from "../../app/features/routing/routes";
import { labels } from "../../config/i18n/labels";
import { UserAction } from "../../config/permissions";
import { exportObservations } from "../../app/features/export-observations/service";
import "./TableHeader.scss";

export const TableHeader: FC<{
  route: RouteDescription;
}> = ({ route }) => {
  // @ts-ignore
  const { title, actionTitle } = labels.tableHeader[route.scope];
  return (
    <div className="d-flex align-items-center px-3 py-3 table-header">
      {/* TODO refactor layouts, extract common class names */}
      {/* there are at least 3 places where we define page header, wtf??? */}
      <h1 className="font-weight-lighter">{title}</h1>
      <CanConnected I={UserAction.add} a={route.scope}>
        <Button
          size="md"
          className="ml-5 px-3 btn-action-add"
          tag={Link}
          to={`${route.path}/add`}
        >
          {actionTitle}
        </Button>
      </CanConnected>
      <CanConnected I={UserAction.import} a={route.scope}>
        <Button
          size="md"
          className="ml-3 px-3 btn-action"
          tag={Link}
          outline
          to={`${route.path}/import`}
        >
          {labels.importData}
        </Button>
      </CanConnected>
      <div className="mr-auto" />
      <CanConnected I={UserAction.export} a={route.scope}>
        <Button
          size="md"
          className="ml-3 px-3 btn-action"
          outline
          onClick={exportObservations}
        >
          {labels.exportData}
        </Button>
      </CanConnected>
    </div>
  );
};

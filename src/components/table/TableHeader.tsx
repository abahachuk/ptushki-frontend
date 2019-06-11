import { Button, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";
import React, { FC } from "react";
import { labels } from "../../config/i18n/labels";
import { Scope, UserAction } from "../../config/permissions";
import { CanConnected } from "../../app/features/auth/CanConnected";
import { RouteDescription } from "../../app/features/routing/routes";

export const TableHeader: FC<{
  title: string;
  addButtonTitle: string;
  route: RouteDescription;
}> = ({ title, addButtonTitle, route }) => {
  return (
    <div className="d-flex align-items-center">
      {/* TODO refactor layouts, extract common class names */}
      {/* there are at least 3 places where we define page header, wtf??? */}
      <h1 className="font-weight-lighter">{title}</h1>
      <CanConnected I={UserAction.add} a={route.scope}>
        <Button
          size="sm"
          color="orange"
          className="ml-4 px-3"
          tag={Link}
          to={`${route.path}/add`}
        >
          + {addButtonTitle}
        </Button>
        <Button
          size="sm"
          className="ml-3 px-3"
          tag={Link}
          outline
          to={`${route.path}/import`}
        >
          {labels.importData}
        </Button>
      </CanConnected>
      <CanConnected I={UserAction.import} a={route.scope}>
        <UncontrolledDropdown>
          <DropdownToggle outline size="sm" caret className="ml-3 px-3">
            {labels.importData}
          </DropdownToggle>
        </UncontrolledDropdown>
      </CanConnected>
      <div className="mr-auto" />
      <CanConnected I={UserAction.export} a={route.scope}>
        <UncontrolledDropdown>
          <DropdownToggle size="sm" caret className="primary-button ml-3 px-3">
            {labels.exportData}
          </DropdownToggle>
        </UncontrolledDropdown>
      </CanConnected>
    </div>
  );
};

import React from "react";
import { Button, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";
import { ROUTE_ADD_OBSERVATION } from "../routing/routes";
import "../../../components/table/DataGrid.scss";
import { labels } from "../../../config/i18n/labels";
import { ObservationListConnected } from "./ObservationList";

export const ObservationsPage = () => {
  return (
    <div style={{ backgroundColor: "white", flexGrow: 1 }} className="p-5">
      <div className="d-flex align-items-center">
        <h1>{labels.observations.title}</h1>
        <Button
          size="sm"
          color="orange"
          className="ml-4 mr-auto"
          tag={Link}
          to={ROUTE_ADD_OBSERVATION.path}
        >
          {labels.add}
        </Button>
        <UncontrolledDropdown>
          <DropdownToggle size="sm" caret className="primary-button ml-3">
            {labels.import}
          </DropdownToggle>
        </UncontrolledDropdown>
        <UncontrolledDropdown>
          <DropdownToggle size="sm" caret className="primary-button ml-3">
            {labels.export}
          </DropdownToggle>
        </UncontrolledDropdown>
      </div>
      <ObservationListConnected />
    </div>
  );
};

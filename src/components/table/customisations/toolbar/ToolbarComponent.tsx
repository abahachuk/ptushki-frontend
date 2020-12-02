import { Toolbar } from "@devexpress/dx-react-grid-bootstrap4";
import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import { Button } from "reactstrap";
import { labels } from "../../../../config/i18n/labels";
import { setFilters } from "../../dataGridActions";
import { DataGridState } from "../../DataGridModels";
import { GridSelectionInfoConnected } from "../GridSelectionInfo";
import "./ToolbarComponent.scss";

interface Props extends Toolbar.RootProps, DispatchProp {
  enabledFilters: any[];
}

export const ToolbarComponent: FC<Props> = ({
  enabledFilters,
  dispatch,
  children,
  ...props
}) => (
  <div
    {...props}
    className="grid-toolbar d-flex flex-wrap justify-content-end align-items-center mb-3"
  >
    <GridSelectionInfoConnected />

    {enabledFilters.length > 0 && (
      <Button
        color="link"
        className="text-dark"
        style={{ fontSize: "inherit" }}
        onClick={() => dispatch(setFilters([]))}
      >
        {labels.clearFilters}
      </Button>
    )}
    {/* behaviors provided by grid component */}
    {children}
  </div>
);

export const ToolbarConnected = connect((state: DataGridState) => ({
  enabledFilters: state.filtering
}))(ToolbarComponent);

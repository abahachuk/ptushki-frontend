import { Toolbar } from "@devexpress/dx-react-grid-bootstrap4";
import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import { Button } from "reactstrap";
import { labels } from "../../../config/i18n/labels";
import { setFilters } from "../dataGridActions";
import { DataGridState } from "../DataGridModels";
import { LangSelector } from "./LangSelector";
import { ViewModeSelector } from "./ViewModeSelector";

interface Props extends Toolbar.RootProps, DispatchProp {
  enabledFilters: any[];
}

export const ToolbarComponent: FC<Props> = ({
  enabledFilters,
  dispatch,
  ...p
}) => (
  <div
    {...p}
    className="d-flex flex-wrap justify-content-end align-items-center my-2"
  >
    {enabledFilters.length > 0 && (
      <Button size="sm" outline onClick={() => dispatch(setFilters([]))}>
        {labels.clearFilters}
      </Button>
    )}
    {/* behaviors provided by grid component */}
    {p.children}
    <ViewModeSelector />
    <LangSelector />
  </div>
);

export const ToolbarConnected = connect((state: DataGridState) => ({
  enabledFilters: state.filtering
}))(ToolbarComponent);

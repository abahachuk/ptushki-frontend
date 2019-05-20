import { Column } from "@devexpress/dx-react-grid";
import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import { Button } from "reactstrap";
import { labels } from "../../../config/i18n/labels";
import { setFilters } from "../dataGridActions";
import { DataGridState } from "../DataGridModels";

const filterIcon = require("../../../assets/filter-icon.svg");
const filterIconActive = require("../../../assets/filter-icon-active.svg");

export const ColumnFilterToggleButton: FC<
  {
    hasFilter: boolean;
    column: Column;
  } & DispatchProp
> = ({ hasFilter, dispatch, column }) => (
  <Button
    outline
    type="button"
    color="dark"
    size="sm"
    className="ml-auto py-1 border-0 bg-transparent shadow-none"
    onClick={() =>
      dispatch(setFilters([{ columnName: column.name, value: "11" }]))
    }
  >
    <img
      src={hasFilter ? filterIconActive : filterIcon}
      alt={labels.filter}
      height={12}
    />
  </Button>
);

export const ColumnFilterButtonConnected = connect(
  (state: DataGridState, ownProps: { column: Column }) => {
    const columnFilter = state.filtering.find(
      f => f.columnName === ownProps.column.name
    );
    const hasFilter = !!(columnFilter && columnFilter.value);

    return {
      ...ownProps,
      hasFilter
    };
  }
)(ColumnFilterToggleButton);

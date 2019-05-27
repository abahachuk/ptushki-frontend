import { Column } from "@devexpress/dx-react-grid";
import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import { setFilters } from "../dataGridActions";
import { DataGridState } from "../DataGridModels";

const blockName = "filter-toggle-button";

export const ColumnFilterToggleButton: FC<
  {
    hasFilter: boolean;
    column: Column;
  } & DispatchProp
> = ({ hasFilter, dispatch, column }) => (
  <span
    className={`${blockName} ${hasFilter && `${blockName}--active`}`}
    // onClick={() =>
    //   dispatch(setFilters([{ columnName: column.name, value: "11" }]))
    // }
  />
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

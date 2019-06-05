import { Column } from "@devexpress/dx-react-grid";
import { TableHeaderRow } from "@devexpress/dx-react-grid-bootstrap4";
import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import { Autosuggest } from "../../autosuggest/Autosuggest";
import { DataGridCol } from "../DataGrid";
import { setFilters } from "../dataGridActions";
import {
  DataGridFilter,
  DataGridFiltersObj,
  DataGridState
} from "../DataGridModels";
import { ColumnFilterToggleButton } from "./ColumnFilterToggleButton";

export const TableHeaderRowContent: FC<
  TableHeaderRow.ContentProps & {
    isFilterApplied: boolean;
    availableFilters: DataGridFilter[];
    column: Column & DataGridCol<Object>;
  } & DispatchProp
> = ({ column, dispatch, children, availableFilters, isFilterApplied }) => (
  <TableHeaderRow.Content column={column} align="left">
    <div className="d-flex align-items-center align-self-center flex-grow-1 justify-content-between">
      {children}
    </div>
    {availableFilters && !!availableFilters.length && (
      <Autosuggest
        collection={availableFilters.map((filter, i) => ({
          label:
            column.filter && column.filter.getLabel
              ? column.filter.getLabel(filter)
              : (filter.value as string),
          value:
            column.filter && column.filter.getValue
              ? column.filter.getValue(filter)
              : (filter.value as string),
          id: i
        }))}
        onChangeValue={({ value }) =>
          dispatch(setFilters([{ columnName: column.name, value }]))
        }
        toggleButton={
          <ColumnFilterToggleButton isFilterApplied={isFilterApplied} />
        }
      />
    )}
  </TableHeaderRow.Content>
);

export const TableHeaderRowContentConnected = connect(
  (state: DataGridState, ownProps: { column: Column }) => {
    const columnFilter = state.filtering.find(
      f => f.columnName === ownProps.column.name
    );

    const availableFilters = (state.availableFilters as DataGridFiltersObj<
      any
    >)[ownProps.column.name];
    const isFilterApplied = !!(columnFilter && columnFilter.value);

    return {
      ...ownProps,
      availableFilters,
      isFilterApplied
    };
  }
)(TableHeaderRowContent);

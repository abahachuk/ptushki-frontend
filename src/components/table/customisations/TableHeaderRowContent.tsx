import { TableHeaderRow } from "@devexpress/dx-react-grid-bootstrap4";
import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import { Column } from "@devexpress/dx-react-grid";
import { ColumnFilterToggleButton } from "./ColumnFilterToggleButton";
import { Autosuggest } from "../../autosuggest/Autosuggest";
import { DataGridState } from "../DataGridModels";
import { DataGridCol, DataGridFilter } from "../DataGrid";
import { setFilters } from "../dataGridActions";

export const TableHeaderRowContent: FC<
  TableHeaderRow.ContentProps & {
    isFilterApplied: boolean;
    filters: DataGridFilter[];
    column: Column & DataGridCol<Object>;
  } & DispatchProp
> = ({ column, dispatch, children, filters, isFilterApplied }) => (
  <TableHeaderRow.Content column={column} align="left">
    <div className="d-flex align-items-center align-self-center flex-grow-1 justify-content-between">
      {children}
    </div>
    {filters && !!filters.length && (
      <Autosuggest
        collection={filters.map((filter, i) => ({
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
          <ColumnFilterToggleButton
            column={column}
            isFilterApplied={isFilterApplied}
          />
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

    // @ts-ignore
    const filters = state.filters[ownProps.column.name];
    const isFilterApplied = !!(columnFilter && columnFilter.value);

    return {
      ...ownProps,
      filters,
      isFilterApplied
    };
  }
)(TableHeaderRowContent);

import { Column } from "@devexpress/dx-react-grid";
import { TableHeaderRow } from "@devexpress/dx-react-grid-bootstrap4";
import React, { FC, useCallback } from "react";
import { connect, DispatchProp } from "react-redux";
import { Autosuggest, IChangeValue } from "../../autosuggest/Autosuggest";
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
    filterValue?: string;
    availableFilters: DataGridFilter[];
    column: Column & DataGridCol<Object>;
  } & DispatchProp
> = ({ column, dispatch, children, availableFilters, filterValue }) => {
  const getFilterItems = useCallback(
    (filter, i) => {
      const label =
        column.filter && column.filter.getLabel
          ? column.filter.getLabel(filter)
          : (filter.value as string);
      const value =
        column.filter && column.filter.getValue
          ? column.filter.getValue(filter)
          : (filter.value as string);

      return {
        id: i,
        checked: filterValue && filterValue.includes(value),
        value,
        label
      };
    },
    [column, filterValue]
  );

  return (
    <TableHeaderRow.Content column={column} align="left">
      <div className="d-flex align-items-center align-self-center flex-grow-1 justify-content-between">
        {children}
      </div>
      {availableFilters && !!availableFilters.length && (
        <Autosuggest
          collection={availableFilters.map(getFilterItems)}
          type={column.name}
          onChangeValue={({ value, checked }: IChangeValue) => {
            const oldFilterValue = filterValue ? filterValue.split(",") : [];
            const newFilterValue = checked
              ? oldFilterValue.concat(value)
              : oldFilterValue.filter(item => !value.includes(item));
            dispatch(
              setFilters([
                {
                  columnName: column.name,
                  value: newFilterValue.toString() || undefined
                }
              ])
            );
          }}
          toggleButton={
            <ColumnFilterToggleButton isFilterApplied={!!filterValue} />
          }
          multiselect
        />
      )}
    </TableHeaderRow.Content>
  );
};

export const TableHeaderRowContentConnected = connect(
  (state: DataGridState, ownProps: { column: Column }) => {
    const columnFilter = state.filtering.find(
      f => f.columnName === ownProps.column.name
    );

    const availableFilters = (state.availableFilters as DataGridFiltersObj<
      any
    >)[ownProps.column.name];
    const filterValue = columnFilter && columnFilter.value;

    return {
      ...ownProps,
      availableFilters,
      filterValue
    };
  }
)(TableHeaderRowContent);

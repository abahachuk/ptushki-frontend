import useMount from "react-use/esm/useMount";
import useUnmount from "react-use/esm/useUnmount";
import { Table, TableProps } from "@devexpress/dx-react-grid-bootstrap4";
import classNames from "classnames";
import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import { CustomScrollContainer } from "../../scrollbars/CustomScrollContainer";
import { DataGridState, FilteringRule } from "../DataGridModels";
import { setMounted, getData, getFilters } from "../dataGridActions";

export const TableComponent: FC<
  TableProps &
    DispatchProp & {
      fixedPartWidth: number;
      autoHeight: boolean;
      initialFilters: FilteringRule[];
    }
> = ({ fixedPartWidth, autoHeight, dispatch, initialFilters, ...props }) => {
  useMount(() => {
    dispatch(setMounted(true));
    dispatch(getData.request(initialFilters));
    dispatch(getFilters.request());
  });
  useUnmount(() => dispatch(setMounted(false)));

  return (
    <CustomScrollContainer
      autoHeight={autoHeight}
      autoHeightMin={200}
      renderTrackHorizontal={({ style, ...trackProps }) => (
        <div
          {...trackProps}
          style={{
            ...style,
            left: 2 + fixedPartWidth,
            right: 2,
            bottom: 2
          }}
        />
      )}
    >
      <div style={{ height: "100%" }}>
        <Table.Table
          {...props}
          className={classNames(
            (props as any).className,
            "table-striped table-borderless"
          )}
        />
      </div>
    </CustomScrollContainer>
  );
};

export const TableComponentConnected = connect(
  ({ fixedPartWidth }: DataGridState) => ({
    fixedPartWidth
  })
)(TableComponent);

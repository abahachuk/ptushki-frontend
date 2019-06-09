import { Table, TableProps } from "@devexpress/dx-react-grid-bootstrap4";
import classNames from "classnames";
import React, { FC } from "react";
import { connect } from "react-redux";
import { CustomScrollContainer } from "../../scrollbars/CustomScrollContainer";
import { DataGridState } from "../DataGridModels";

export const TableComponent: FC<TableProps & { fixedPartWidth: number }> = ({
  fixedPartWidth,
  ...props
}) => (
  <CustomScrollContainer
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
    <Table.Table
      {...props}
      className={classNames(
        (props as any).className,
        "table-striped table-borderless"
      )}
    />
  </CustomScrollContainer>
);

export const TableComponentConnected = connect(
  ({ fixedPartWidth }: DataGridState) => ({
    fixedPartWidth
  }),
  () => ({})
)(TableComponent);

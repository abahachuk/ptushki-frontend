import { Table, TableProps } from "@devexpress/dx-react-grid-bootstrap4";
import classNames from "classnames";
import React, { FC } from "react";
import { CustomScrollContainer } from "../../scrollbars/CustomScrollContainer";

export const TableComponent: FC<TableProps> = props => (
  <CustomScrollContainer>
    <Table.Table
      {...props}
      className={classNames(
        (props as any).className,
        "table-striped table-borderless"
      )}
    />
  </CustomScrollContainer>
);

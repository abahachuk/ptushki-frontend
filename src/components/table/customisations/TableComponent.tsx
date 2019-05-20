import { Table, TableProps } from "@devexpress/dx-react-grid-bootstrap4";
import classNames from "classnames";
import React, { FC } from "react";
import { CustomScrollContainer } from "../../scrollbars/CustomScrollContainer";

export const TableComponent: FC<TableProps> = p => (
  <CustomScrollContainer>
    <Table.Table
      {...p}
      className={classNames(
        (p as any).className,
        "table-striped table-borderless"
      )}
    />
  </CustomScrollContainer>
);

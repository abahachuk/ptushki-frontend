import React, { FC } from "react";
import { TableProps } from "react-table";
import { F } from "ramda";
import {
  Button,
  ButtonDropdown,
  ButtonGroup,
  DropdownToggle
} from "reactstrap";
import { labels } from "../../config/i18n/labels";
import "./BaseTablePagination.scss";

export const BaseTablePagination: FC<TableProps> = ({
  page,
  pageSize,
  onPageChange
}) => (
  <div className="base-table-pagination">
    <div className="pagination-text small">
      {page * pageSize}
      {" - "}
      {(page + 1) * pageSize} {labels.of} {1700}
    </div>
    <div className="pagination-buttons m-2">
      <ButtonGroup>
        <Button
          color="outline-dark"
          className="btn-no-outline"
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          {"<"}
        </Button>
        <Button
          color="outline-dark"
          className="btn-no-outline"
          type="button"
          onClick={() => onPageChange(page + 1)}
        >
          {">"}
        </Button>
      </ButtonGroup>
    </div>
    <div className="language-selector">
      {/* not sure this belongs here, but here it is for now */}
      <ButtonDropdown toggle={F}>
        <DropdownToggle
          color="outline-dark"
          className="btn-no-outline btn-sm"
          caret
        >
          <span>Rus&nbsp;&nbsp;</span>
        </DropdownToggle>
      </ButtonDropdown>
    </div>
  </div>
);

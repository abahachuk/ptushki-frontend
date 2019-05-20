import { SearchPanel } from "@devexpress/dx-react-grid-bootstrap4";
import { Search } from "@material-ui/icons";
import classNames from "classnames";
import React, { FC } from "react";
import { labels } from "../../../config/i18n/labels";
import "./SearchPanelInput.scss";

export const SearchPanelInput: FC<SearchPanel.InputProps> = p => (
  <div className="d-flex flex-grow-1 w-100 has-search">
    <span className="form-control-feedback">
      <Search />
    </span>
    <SearchPanel.Input
      {...p}
      className={classNames("form-control w-100")}
      placeholder={labels.search}
    />
  </div>
);

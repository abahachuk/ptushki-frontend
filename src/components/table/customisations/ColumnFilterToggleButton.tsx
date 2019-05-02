import React, { FC } from "react";
import { FilterList } from "@material-ui/icons";
import { Button } from "reactstrap";

export const ColumnFilterToggleButton: FC<{ onToggle(): void }> = ({
  onToggle
}) => (
  <Button
    outline
    type="button"
    color="dark"
    size="sm"
    className="p-0 border-0"
    onClick={onToggle}
  >
    <FilterList />
  </Button>
);

import React, { ButtonHTMLAttributes, FC } from "react";
import { Button } from "reactstrap";

import "./ActionButton.scss";

const deleteImg = require("../../assets/delete.svg");
const editImg = require("../../assets/edit.svg");

const ICON_MAP = {
  edit: editImg,
  delete: deleteImg
};

const blockName = "action-button";

interface IActionButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: "edit" | "delete";
  label: string;
}

export const ActionButton: FC<IActionButton> = ({
  icon,
  label,
  ...restProps
}) => (
  <Button className={blockName} {...restProps}>
    <img className={`${blockName}__icon`} src={ICON_MAP[icon]} alt="" />
    {label}
  </Button>
);

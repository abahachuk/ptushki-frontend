import React, { FC, ButtonHTMLAttributes } from "react";
import { Button } from "reactstrap";
import sn from "classnames";
import { ArrowBack } from "@material-ui/icons";

import "./BackButton.scss";

interface IBackButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
}

const blockName = "back-button";

export const BackButton: FC<IBackButton> = ({
  label,
  className,
  ...restProps
}) => (
  <Button className={sn(blockName, className)} {...restProps}>
    <ArrowBack className={`${blockName}__arrow`} />
    {label}
  </Button>
);

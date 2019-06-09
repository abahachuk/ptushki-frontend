import React, { useState, FC } from "react";
import sn from "classnames";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

import "./Dropdown.scss";

export interface ICustomDropdown {
  placeholder?: string;
  value?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

const blockName = "dropdown";

export const CustomDropdown: FC<ICustomDropdown> = ({
  placeholder,
  value,
  children,
  className,
  id,
  disabled
}) => {
  const [isOpen, toggleOpen] = useState(false);

  const toggleDropdown = () => toggleOpen(!isOpen);

  return (
    <Dropdown
      isOpen={isOpen}
      toggle={toggleDropdown}
      id={id}
      disabled={disabled}
    >
      <DropdownToggle
        disabled
        outline
        className={sn(
          `${blockName}__dropdown`,
          !value && `${blockName}__dropdown--placeholder`,
          className
        )}
      >
        {value || placeholder}
        {!disabled && (
          <span
            className={sn(
              `${blockName}__chevron`,
              isOpen
                ? `${blockName}__chevron--up`
                : `${blockName}__chevron--down`
            )}
          />
        )}
      </DropdownToggle>
      <DropdownMenu className={`${blockName}__menu-container`}>
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

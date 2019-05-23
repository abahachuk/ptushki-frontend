import React, { useState, FC } from "react";
import sn from "classnames";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

import "./Dropdown.scss";

interface CustomDropdown {
  placeholder?: string;
  value?: string;
  className?: string;
}

const blockName = "dropdown";

export const CustomDropdown: FC<CustomDropdown> = ({
  placeholder,
  value,
  children,
  className
}) => {
  const [isOpen, toggleOpen] = useState(false);

  const toggleDropdown = () => toggleOpen(!isOpen);

  return (
    <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
      <DropdownToggle
        outline
        className={sn(
          `${blockName}__dropdown`,
          !value && `${blockName}__dropdown--placeholder`,
          className
        )}
      >
        {value || placeholder}
        <span
          className={sn(
            `${blockName}__chevron`,
            isOpen ? `${blockName}__chevron--up` : `${blockName}__chevron--down`
          )}
        />
      </DropdownToggle>
      <DropdownMenu className={`${blockName}__menu-container`}>
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

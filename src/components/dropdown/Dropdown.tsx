import React, { useState, FC, Fragment, ReactElement, ReactNode } from "react";
import sn from "classnames";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

import "./Dropdown.scss";

export interface ICustomDropdown {
  placeholder?: string;
  value?: string;
  className?: string;
  toggleButton?: ReactNode;
}

interface ICustomDropdownToggle {
  placeholder?: string;
  value?: string;
  isOpen?: boolean;
}

const blockName = "dropdown";

const DefaultCustomDropdownToggle: FC<ICustomDropdownToggle> = ({
  placeholder,
  value,
  isOpen
}) => (
  <Fragment>
    {value || placeholder}
    <span
      className={sn(
        `${blockName}__chevron`,
        isOpen ? `${blockName}__chevron--up` : `${blockName}__chevron--down`
      )}
    />
  </Fragment>
);

export const CustomDropdown: FC<ICustomDropdown> = ({
  placeholder,
  value,
  children,
  className,
  toggleButton
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
        {toggleButton || (
          <DefaultCustomDropdownToggle
            value={value}
            placeholder={placeholder}
            isOpen={isOpen}
          />
        )}
      </DropdownToggle>
      <DropdownMenu className={`${blockName}__menu-container`}>
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

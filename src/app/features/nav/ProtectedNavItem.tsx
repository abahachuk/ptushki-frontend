import React, { FC } from "react";
import { NavItem, NavLink } from "reactstrap";
import { NavLink as Link } from "react-router-dom";
import { UserInfo } from "../auth/models";
import { securityService } from "../../../services";

export const ProtectedNavItem: FC<{
  user: UserInfo;
  permissions: Array<string>;
  path: string;
}> = ({ permissions, user, children, path }) => {
  return securityService.checkPermissions(permissions, user) ? (
    <NavItem>
      <NavLink tag={Link} to={path}>
        {children}
      </NavLink>
    </NavItem>
  ) : null;
};

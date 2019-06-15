import React, { FC } from "react";
import { NavLink as Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
import { UserAction } from "../../../config/permissions";
import { CanConnected } from "../auth/CanConnected";
import { RouteDescription } from "../routing/routes";

export const ProtectedNavItem: FC<RouteDescription> = ({
  scope,
  children,
  path
}) => (
  <CanConnected I={UserAction.observe} a={scope}>
    <NavItem>
      <NavLink tag={Link} to={path}>
        {children}
      </NavLink>
    </NavItem>
  </CanConnected>
);

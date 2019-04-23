import React, { FC } from "react";
import { NavLink as Link } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink
} from "reactstrap";
import { NavUnauthorized } from "./NavUnauthorized";
import { UserInfo } from "../auth/models";
import { ROUTE_OBSERVATIONS } from "../routing/routes";
import { labels } from "../../../config/i18n/labels";

export const RootNav: FC<{
  user: UserInfo;
}> = ({ user }) => (
  <Navbar dark color="dark" expand="sm">
    <NavbarBrand href="/">PTUSHKI</NavbarBrand>
    <Nav navbar>
      <NavItem>
        <NavLink tag={Link} to={ROUTE_OBSERVATIONS.path}>
          {labels.observations.title}
        </NavLink>
      </NavItem>
    </Nav>
    <Collapse isOpen navbar>
      {user ? <div /> : <NavUnauthorized />}
    </Collapse>
  </Navbar>
);

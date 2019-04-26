import React, { FC } from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink
} from "reactstrap";
import { NavLink as Link } from "react-router-dom";

import { NavUnauthorized } from "./NavUnauthorized";
import { UserInfo } from "../auth/models";
import { labels } from "../../../config/i18n/labels";
import { ROUTE_SIGN_UP } from "../routing/routes";

import "./RootNav.scss";

const brandLogo = require("../../../assets/brand-logo.svg");

export const RootNav: FC<{
  user: UserInfo;
}> = ({ user }) => (
  <Navbar dark expand="sm" className="py-1 px-5 root-nav">
    <NavbarBrand href="/">
      <img src={brandLogo} alt={labels.brandName} />
    </NavbarBrand>
    <Collapse isOpen navbar>
      {user ? (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to={ROUTE_SIGN_UP.path}>
              <img
                src="http://i.pravatar.cc/60" // TODO this is a placeholder
                alt="avatar"
                className="nav-user-img"
              />
            </NavLink>
          </NavItem>
        </Nav>
      ) : (
        <NavUnauthorized />
      )}
    </Collapse>
  </Navbar>
);

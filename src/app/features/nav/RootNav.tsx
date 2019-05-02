import React from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink
} from "reactstrap";
import { NavLink as Link } from "react-router-dom";
import { labels } from "../../../config/i18n/labels";
import {
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_USER_INFO,
  ROUTE_BIRD_INFO
} from "../routing/routes";

import "./RootNav.scss";
import { ProtectedNavItemConnected } from "./ProtectedNavItemConnected";

const brandLogo = require("../../../assets/brand-logo.svg");

export const RootNav = () => (
  <Navbar dark expand="sm" className="py-1 px-5 root-nav">
    <NavbarBrand href="/">
      <img src={brandLogo} alt={labels.brandName} />
    </NavbarBrand>
    <Collapse isOpen navbar>
      <Nav className="ml-auto" navbar>
        {/* TODO: should be moved to observation list item */}
        <NavItem>
          <NavLink tag={Link} to={ROUTE_BIRD_INFO.path}>
            Информация о птице
          </NavLink>
        </NavItem>
        <ProtectedNavItemConnected {...ROUTE_SIGN_UP}>
          {labels.signUp.title}
        </ProtectedNavItemConnected>
        <ProtectedNavItemConnected {...ROUTE_SIGN_IN}>
          {labels.signIn.title}
        </ProtectedNavItemConnected>
        <ProtectedNavItemConnected {...ROUTE_USER_INFO}>
          <img
            src="http://i.pravatar.cc/60" // TODO this is a placeholder
            alt="avatar"
            className="nav-user-img"
          />
        </ProtectedNavItemConnected>
      </Nav>
    </Collapse>
  </Navbar>
);

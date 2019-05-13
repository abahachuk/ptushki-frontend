import React from "react";
import { NavLink as Link } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink
} from "reactstrap";
import { labels } from "../../../config/i18n/labels";
import {
  ROUTE_OBSERVATIONS,
  ROUTE_USER_INFO,
  ROUTE_BIRD_INFO
} from "../routing/routes";
import { ProtectedNavItemConnected } from "./ProtectedNavItemConnected";
import "./RootNav.scss";

const brandLogo = require("../../../assets/brand-logo.svg");

export const RootNav = () => (
  <Navbar dark expand="sm" className="py-1 px-5 root-nav">
    <NavbarBrand href="/">
      <img src={brandLogo} alt={labels.brandName} />
    </NavbarBrand>
    <Nav navbar>
      <NavItem>
        <NavLink tag={Link} to={ROUTE_OBSERVATIONS.path}>
          {labels.observations.title}
        </NavLink>
      </NavItem>
    </Nav>
    <Collapse isOpen navbar>
      <Nav className="ml-auto" navbar>
        {/* TODO: should be moved to observation list item */}
        <NavItem>
          <NavLink tag={Link} to={ROUTE_BIRD_INFO.path}>
            Информация о птице
          </NavLink>
        </NavItem>
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

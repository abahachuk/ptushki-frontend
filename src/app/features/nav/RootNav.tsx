import React from "react";
import { Collapse, Nav, Navbar, NavbarBrand } from "reactstrap";
import { labels } from "../../../config/i18n/labels";
import { ROUTE_USER_INFO } from "../routing/routes";
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

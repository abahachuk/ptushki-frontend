import { ExitToApp } from "@material-ui/icons";
import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
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
import { logout } from "../../../store/actions/authActions";
import { ROUTE_OBSERVATIONS, ROUTE_SIGN_IN } from "../routing/routes";
import "./RootNav.scss";

const brandLogo = require("../../../assets/brand-logo.svg");

export const RootNav: FC<DispatchProp> = ({ dispatch }) => (
  <Navbar dark expand="sm" className="p-0 px-3 root-nav">
    <NavbarBrand href="/" className="mr-5">
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
        <NavItem>
          <NavLink
            tag={Link}
            onClick={() => dispatch(logout())} // TODO this should work but it doesn't
            to={ROUTE_SIGN_IN.path}
          >
            <ExitToApp className="mr-2" />
            {labels.logout}
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
);

export const RootNavConnected = connect()(RootNav);

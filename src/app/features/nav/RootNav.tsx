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
import { ROUTE_SIGN_UP, ROUTE_TMP_EXAMPLE } from "../routing/routes";

export const RootNav = () => (
  <Navbar dark color="dark" expand="sm">
    <NavbarBrand href="/">PTUSHKI</NavbarBrand>
    <Collapse isOpen navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to={ROUTE_TMP_EXAMPLE}>
            Temporary example
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={ROUTE_SIGN_UP}>
            Sign up
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
);

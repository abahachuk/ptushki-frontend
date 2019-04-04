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
import { ROUTES } from "../routing/routes";

export const RootNav = () => (
  <Navbar dark color="dark" expand="sm">
    <NavbarBrand href="/">PTUSHKI</NavbarBrand>
    <Collapse isOpen navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to={ROUTES.signUp}>
            Sign up
          </NavLink>
          <NavLink tag={Link} to={ROUTES.signIn}>
            Sign In
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
);

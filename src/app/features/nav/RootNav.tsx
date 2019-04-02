import React from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ROUTE_SIGN_UP, ROUTE_TMP_EXAMPLE } from "../routing/routes";

export const RootNav = () => (
  <Navbar dark color="dark" expand="sm">
    <NavbarBrand href="/">PTUSHKI</NavbarBrand>
    <Collapse isOpen navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <LinkContainer to={ROUTE_TMP_EXAMPLE}>
            <NavLink>Temporary example</NavLink>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to={ROUTE_SIGN_UP}>
            <NavLink>Sign up</NavLink>
          </LinkContainer>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
);

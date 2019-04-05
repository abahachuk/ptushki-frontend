import React, { FC } from "react";
import { Collapse, Navbar, NavbarBrand } from "reactstrap";
import { NavUnauthorized } from "./NavUnauthorized";
import { UserInfo } from "../auth/models";

export const RootNav: FC<{
  user: UserInfo;
}> = ({ user }) => (
  <Navbar dark color="dark" expand="sm">
    <NavbarBrand href="/">PTUSHKI</NavbarBrand>
    <Collapse isOpen navbar>
      {user ? <div /> : <NavUnauthorized />}
    </Collapse>
  </Navbar>
);

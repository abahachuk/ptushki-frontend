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
import { AnyAction } from "redux";
import { labels } from "../../../config/i18n/labels";
import { signOut } from "../../../store/actions/authActions";
import {
  ROUTE_BIRDS,
  ROUTE_OBSERVATIONS,
  ROUTE_SIGN_IN
} from "../routing/routes";
import "./RootNav.scss";
import { ProtectedNavItemConnected } from "./ProtectedNavItemConnected";
import { RootState } from "../../../store";
import { UserInfo } from "../auth/models";

const brandLogo = require("../../../assets/brand-logo.svg");

export const RootNav: FC<DispatchProp & { user: UserInfo }> = ({
  dispatch,
  user
}) => (
  <Navbar dark expand="sm" className="p-0 px-3 root-nav">
    <NavbarBrand href="/" className="mr-5">
      <img src={brandLogo} alt={labels.brandName} />
    </NavbarBrand>
    <Nav navbar>
      <ProtectedNavItemConnected {...ROUTE_BIRDS}>
        {labels.birds.title}
      </ProtectedNavItemConnected>
      <ProtectedNavItemConnected {...ROUTE_OBSERVATIONS}>
        {labels.observations.title}
      </ProtectedNavItemConnected>
    </Nav>
    <Collapse isOpen navbar>
      <Nav className="ml-auto" navbar>
        {user && (
          <NavItem>
            <NavLink tag="span">{`${user.lastName} ${user.firstName}`}</NavLink>
          </NavItem>
        )}
        <NavItem>
          <NavLink
            tag={Link}
            onClick={() => dispatch((signOut() as any) as AnyAction)}
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

export const RootNavConnected = connect((state: RootState) => ({
  user: state.auth.user
}))(RootNav);

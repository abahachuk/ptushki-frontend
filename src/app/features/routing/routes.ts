import { Scope } from "../../../config/permissions";

export interface RouteDescription {
  path: string;
  scope: Scope;
  add?: RouteDescription;
}

export const HOME = "/";

export const ROUTE_SIGN_UP: RouteDescription = {
  path: "/sign-up",
  scope: Scope.auth
};
export const ROUTE_SIGN_IN: RouteDescription = {
  path: "/sign-in",
  scope: Scope.auth
};
export const ROUTE_RESET_PASSWORD: RouteDescription = {
  path: "/reset-password",
  scope: Scope.auth
};

export const ROUTE_OBSERVATIONS: RouteDescription = {
  path: "/observations",
  scope: Scope.observations
};

export const ROUTE_BIRDS: RouteDescription = {
  path: "/birds",
  scope: Scope.birds
};

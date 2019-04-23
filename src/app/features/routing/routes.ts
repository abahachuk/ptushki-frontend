export interface RouteDescription {
  path: string;
  permissions: Array<string>;
  fallback: string;
}

export const ROUTE_SIGN_UP: RouteDescription = {
  path: "/sign-up/",
  permissions: [],
  fallback: "/"
};
export const ROUTE_SIGN_IN: RouteDescription = {
  path: "/sign-in/",
  permissions: [],
  fallback: "/"
};
export const ROUTE_RESET_PASSWORD: RouteDescription = {
  path: "/reset-password/",
  permissions: [],
  fallback: "/"
};

export const ROUTE_OBSERVATIONS: RouteDescription = {
  path: "/observations/",
  permissions: [],
  fallback: "/"
};

import {
  ADMIN,
  MODERATOR,
  OBSERVER,
  RINGER,
  SCIENTIST,
  UNAUTHORIZED
} from "../../../config/roles";

export interface RouteDescription {
  path: string;
  permissions: Array<string>;
  fallback: string;
}

export const ROUTE_SIGN_UP: RouteDescription = {
  path: "/sign-up/",
  permissions: [UNAUTHORIZED],
  fallback: "/"
};
export const ROUTE_SIGN_IN: RouteDescription = {
  path: "/sign-in/",
  permissions: [UNAUTHORIZED],
  fallback: "/"
};
export const ROUTE_RESET_PASSWORD: RouteDescription = {
  path: "/reset-password/",
  permissions: [UNAUTHORIZED],
  fallback: "/"
};
export const ROUTE_USER_INFO: RouteDescription = {
  path: "/user-info/",
  permissions: [OBSERVER],
  fallback: "/"
};

export const ROUTE_BIRD_INFO: RouteDescription = {
  path: "/bird-info/",
  permissions: [OBSERVER, RINGER, SCIENTIST, MODERATOR, ADMIN],
  fallback: "/"
};

export const ROUTE_ADD_OBSERVATION: RouteDescription = {
  path: "/add-observation/",
  permissions: [OBSERVER, RINGER, SCIENTIST, MODERATOR, ADMIN],
  fallback: "/"
};

export const ROUTE_OBSERVATIONS: RouteDescription = {
  path: "/observations/",
  permissions: [OBSERVER, RINGER, SCIENTIST, MODERATOR, ADMIN],
  fallback: "/"
};

export const ROUTE_ADD_BIRD: RouteDescription = {
  path: "/add-bird/",
  permissions: [OBSERVER, RINGER, SCIENTIST, MODERATOR, ADMIN],
  fallback: "/"
};

export const ROUTE_BIRDS: RouteDescription = {
  path: "/birds/",
  permissions: [OBSERVER, RINGER, SCIENTIST, MODERATOR, ADMIN],
  fallback: "/"
};

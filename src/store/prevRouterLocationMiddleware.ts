import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";

let prevPathname = "";

export const prevRouterLocationMiddleware = () => (next: any) => (
  action: any
) => {
  if (action.type === LOCATION_CHANGE) {
    const newAction: LocationChangeActionWithPrevPath = {
      ...action,
      payload: {
        ...action.payload,
        prevPathname
      }
    };
    prevPathname = action.payload.location.pathname;
    return next(newAction);
  }
  return next(action);
};

export interface LocationChangeActionWithPrevPath extends LocationChangeAction {
  payload: LocationChangeAction["payload"] & { prevPathname: string };
}

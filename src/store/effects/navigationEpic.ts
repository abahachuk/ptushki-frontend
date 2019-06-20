import { LOCATION_CHANGE } from "connected-react-router";
import { Epic, ofType } from "redux-observable";
import { EMPTY, merge, of } from "rxjs";
import { flatMap } from "rxjs/operators";
import {
  ROUTE_BIRDS,
  ROUTE_OBSERVATIONS
} from "../../app/features/routing/routes";
import { birdsData, birdsFlush } from "../actions/birdsListActions";
import {
  observationsData,
  observationsFlush
} from "../actions/observationListActions";
import { RootState } from "../index";
import { LocationChangeActionWithPrevPath } from "../prevRouterLocationMiddleware";

// when navigating withing the subroute, preserve the grid state, but clear the data
// when navigating away from subroute, clear all

// this function is quite blunt, but it works in our scenario
const isNavigatingWithinSubRoute = (from: string, to: string) =>
  (from && to && from.startsWith(to)) || to.startsWith(from);

export const navigationEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    ofType((LOCATION_CHANGE as any) as LocationChangeActionWithPrevPath),
    flatMap(action => {
      const { payload } = action as LocationChangeActionWithPrevPath;

      const from = payload.prevPathname;
      const to = payload.location.pathname;

      if (from.includes(ROUTE_OBSERVATIONS.path)) {
        if (isNavigatingWithinSubRoute(from, to)) {
          return merge(
            of(observationsData.success([])),
            of(observationsData.success([]))
          );
        }
        return of(observationsFlush());
      }

      if (from.includes(ROUTE_BIRDS.path)) {
        if (isNavigatingWithinSubRoute(from, to)) {
          return of(birdsData.success([]));
        }
        return of(birdsFlush());
      }

      return EMPTY;
    })
  );

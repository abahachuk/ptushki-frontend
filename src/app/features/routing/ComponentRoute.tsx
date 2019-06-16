import React, { FC } from "react";
import "../../../components/table/DataGrid.scss";
import { Route, Switch } from "react-router";
import { RouteDescription } from "./routes";
import { UserAction } from "../../../config/permissions";
import { ProtectedRoute } from "./ProtectedRoute";

export const ComponentRoute: FC<{
  route: RouteDescription;
  PageComponent: any;
  AddComponent: any;
  DetailComponent: any;
}> = ({ route, PageComponent, AddComponent, DetailComponent }) => {
  return (
    <ProtectedRoute {...route}>
      <Switch>
        <Route path={route.path} exact>
          <PageComponent />
        </Route>
        <ProtectedRoute
          path={`${route.path}/add`}
          scope={route.scope}
          action={UserAction.add}
          fallback={route.path}
          exact
        >
          <AddComponent />
        </ProtectedRoute>
        <Route path={`${route.path}/:id`}>
          <DetailComponent scope={route.scope} />
        </Route>
      </Switch>
    </ProtectedRoute>
  );
};

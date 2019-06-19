import React, { FC } from "react";
import { Route, Switch } from "react-router";
import "../../../components/table/DataGrid.scss";
import { UserAction } from "../../../config/permissions";
import { ProtectedRoute } from "./ProtectedRoute";
import { RouteDescription } from "./routes";

export const ComponentRoute: FC<{
  route: RouteDescription;
  PageComponent: any;
  AddComponent: any;
  DetailComponent: any;
  ImportComponent?: any;
}> = ({
  route,
  PageComponent,
  AddComponent,
  DetailComponent,
  ImportComponent
}) => (
  <ProtectedRoute {...route}>
    <Switch>
      <Route
        path={route.path}
        exact
        component={(p: any) => <PageComponent {...p} />}
      />
      <ProtectedRoute
        path={`${route.path}/add`}
        scope={route.scope}
        action={UserAction.add}
        fallback={route.path}
        exact
        component={(p: any) => <AddComponent {...p} />}
      />

      {/* TODO: remove if condition once import option added to the Birds page */}
      {ImportComponent && (
        <ProtectedRoute
          path={`${route.path}/import`}
          scope={route.scope}
          action={UserAction.import}
          fallback={route.path}
          exact
          component={(p: any) => <ImportComponent {...p} />}
        />
      )}
      <Route
        path={`${route.path}/:id`}
        component={(p: any) => <DetailComponent scope={route.scope} {...p} />}
      />
    </Switch>
  </ProtectedRoute>
);

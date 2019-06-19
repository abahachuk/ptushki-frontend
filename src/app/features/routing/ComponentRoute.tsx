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
}) => {
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
        {/* TODO: remove if condition once import option added to the Birds page */}
        {ImportComponent && (
          <Route path={`${route.path}/import`}>
            <ImportComponent />
          </Route>
        )}
        <Route path={`${route.path}/:id`}>
          <DetailComponent scope={route.scope} />
        </Route>
      </Switch>
    </ProtectedRoute>
  );
};

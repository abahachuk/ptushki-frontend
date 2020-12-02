import React, { FC } from "react";
import { TableHeader } from "../../../components/table/TableHeader";
import { RouteDescription } from "../routing/routes";

export const GridPage: FC<{ route: RouteDescription }> = ({
  route,
  children
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch"
      }}
    >
      <TableHeader route={route} />
      {children}
    </div>
  );
};

import { push } from "connected-react-router";
import React, { FC, useCallback } from "react";
import { connect, DispatchProp } from "react-redux";
import { DataGridLazy } from "../../../components/table/DataGridLazy";
import { RootState } from "../../../store";
import { AsyncResource } from "../../../utils/createAsyncStateReducer";
import { ROUTE_BIRDS } from "../routing/routes";
import { BIRDS_LIST_COLUMNS_CONFIG } from "./columns";
import { BIRDS_GRID_STATE_SELECTOR, BIRDS_LIST_NAMESPACE } from "./conf";
import { BirdData } from "./models";

interface BirdsListProps extends DispatchProp {
  birds: AsyncResource<BirdData[]>;
}

export const BirdsList: FC<BirdsListProps> = ({ birds, dispatch }) => (
  <DataGridLazy
    namespace={BIRDS_LIST_NAMESPACE}
    gridStateSelector={BIRDS_GRID_STATE_SELECTOR}
    rows={birds.error ? [] : birds.value}
    columns={BIRDS_LIST_COLUMNS_CONFIG}
    isLoading={birds.isLoading}
    onRowClick={useCallback(
      r => {
        dispatch(push(`${ROUTE_BIRDS.path}/${r.id}`));
      },
      [dispatch]
    )}
  />
);

export const BirdsListConnected = connect((state: RootState) => ({
  birds: state.birdsList.data
}))(BirdsList);

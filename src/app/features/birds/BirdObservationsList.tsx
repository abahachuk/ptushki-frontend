import React, { FC, useCallback } from "react";
import { connect, DispatchProp } from "react-redux";
import { push } from "connected-react-router";
import { RootState } from "../../../store";
import { AsyncResource } from "../../../utils/createAsyncStateReducer";
import { OBSERVATION_LIST_COLUMNS_CONFIG } from "../observations/columns";
import {
  BIRD_OBSERVATIONS_GRID_STATE_SELECTOR,
  BIRD_OBSERVATIONS_LIST_NAMESPACE
} from "./conf";
import { ObservationData } from "../observations/models";
import { ROUTE_OBSERVATIONS } from "../routing/routes";
import { DataGridLazy } from "../../../components/table/DataGridLazy";

interface ObservationListProps extends DispatchProp {
  observations: AsyncResource<ObservationData[]>;
}

export const BirdObservationsList: FC<
  ObservationListProps & { id: string }
> = ({ observations, dispatch, id }) => (
  <DataGridLazy
    namespace={BIRD_OBSERVATIONS_LIST_NAMESPACE}
    gridStateSelector={BIRD_OBSERVATIONS_GRID_STATE_SELECTOR}
    rows={observations.error ? [] : observations.value}
    columns={OBSERVATION_LIST_COLUMNS_CONFIG}
    isLoading={observations.isLoading}
    onRowClick={useCallback(
      r => {
        dispatch(push(`${ROUTE_OBSERVATIONS.path}/${r.id}`));
      },
      [dispatch]
    )}
    initialFilters={[{ columnName: "ring", value: id }]}
    autoHeight
  />
);

export const BirdObservationsListConnected = connect((state: RootState) => ({
  observations: state.birdObservationsList.data
}))(BirdObservationsList);

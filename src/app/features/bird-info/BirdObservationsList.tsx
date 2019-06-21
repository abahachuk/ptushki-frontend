import React, { FC, useCallback } from "react";
import { connect, DispatchProp } from "react-redux";
import useMount from "react-use/esm/useMount";
import { push } from "connected-react-router";
import { DataGrid } from "../../../components/table/DataGrid";
import { RootState } from "../../../store";
import {
  birdObservationsData,
  observationGridActions,
  observationsFiltersRequest
} from "../../../store/actions/birdObservationsListActions";
import { AsyncResource } from "../../../utils/createAsyncStateReducer";
import { OBSERVATION_LIST_COLUMNS_CONFIG } from "../observations/columns";
import {
  BIRD_OBSERVATIONS_GRID_STATE_SELECTOR,
  BIRD_OBSERVATIONS_LIST_NAMESPACE
} from "./conf";
import { ObservationData } from "../observations/models";
import { ROUTE_OBSERVATIONS } from "../routing/routes";

interface ObservationListProps extends DispatchProp {
  observations: AsyncResource<ObservationData[]>;
}

export const BirdObservationsList: FC<
  ObservationListProps & { id: string }
> = ({ observations, dispatch, id }) => {
  useMount(() => {
    dispatch(observationsFiltersRequest());
    dispatch(
      observationGridActions.setFilters([{ columnName: "ring", value: id }])
    );
    // dispatch(birdObservationsData.request());
  });

  return (
    <DataGrid
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
      autoHeight
    />
  );
};

export const BirdObservationsListConnected = connect((state: RootState) => {
  const observationsState = state.birdObservationsList;
  const { observations } = observationsState;

  return {
    observations
  };
})(BirdObservationsList);

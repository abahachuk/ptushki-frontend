import { push } from "connected-react-router";
import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import useMount from "react-use/esm/useMount";
import { DataGrid } from "../../../components/table/DataGrid";
import { RootState } from "../../../store";
import {
  birdObservationsData,
  observationsFiltersRequest
} from "../../../store/actions/birdObservationsListActions";
import { AsyncResource } from "../../../utils/createAsyncStateReducer";
import { ROUTE_BIRD_INFO } from "../routing/routes";
import { OBSERVATION_LIST_COLUMNS_CONFIG } from "../observations/columns";
import {
  BIRD_OBSERVATIONS_GRID_STATE_SELECTOR,
  BIRD_OBSERVATIONS_LIST_NAMESPACE
} from "./conf";
import { ObservationData } from "../observations/models";

interface ObservationListProps extends DispatchProp {
  observations: AsyncResource<ObservationData[]>;
}

export const BirdObservationsList: FC<ObservationListProps> = ({
  observations,
  dispatch
}) => {
  useMount(() => {
    dispatch(observationsFiltersRequest());
    dispatch(birdObservationsData.request());
  });

  return (
    <DataGrid
      namespace={BIRD_OBSERVATIONS_LIST_NAMESPACE}
      gridStateSelector={BIRD_OBSERVATIONS_GRID_STATE_SELECTOR}
      rows={observations.error ? [] : observations.value}
      columns={OBSERVATION_LIST_COLUMNS_CONFIG}
      isLoading={observations.isLoading}
      onRowClick={r => {
        // TODO pass route param
        dispatch(push(ROUTE_BIRD_INFO.path));
      }}
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

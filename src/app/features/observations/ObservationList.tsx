import { push } from "connected-react-router";
import React, { FC, useCallback } from "react";
import { connect, DispatchProp } from "react-redux";
import useMount from "react-use/esm/useMount";
import { DataGridLazy } from "../../../components/table/DataGridLazy";
import { RootState } from "../../../store";
import {
  observationsData,
  observationsFiltersRequest
} from "../../../store/actions/observationListActions";
import { AsyncResource } from "../../../utils/createAsyncStateReducer";
import { ROUTE_OBSERVATIONS } from "../routing/routes";
import { OBSERVATION_LIST_COLUMNS_CONFIG } from "./columns";
import {
  OBSERVATIONS_GRID_STATE_SELECTOR,
  OBSERVATIONS_LIST_NAMESPACE
} from "./conf";
import { ObservationData } from "./models";

interface ObservationListProps extends DispatchProp {
  observations: AsyncResource<ObservationData[]>;
}

export const ObservationList: FC<ObservationListProps> = ({
  observations,
  dispatch
}) => {
  useMount(() => {
    dispatch(observationsFiltersRequest());
    dispatch(observationsData.request());
  });

  return (
    <DataGridLazy
      namespace={OBSERVATIONS_LIST_NAMESPACE}
      gridStateSelector={OBSERVATIONS_GRID_STATE_SELECTOR}
      rows={observations.error ? [] : observations.value}
      columns={OBSERVATION_LIST_COLUMNS_CONFIG}
      isLoading={observations.isLoading}
      onRowClick={useCallback(
        r => {
          dispatch(push(`${ROUTE_OBSERVATIONS.path}/${r.id}`));
        },
        [dispatch]
      )}
    />
  );
};

export const ObservationListConnected = connect((state: RootState) => {
  const observationsState = state.observationList;
  const { observations } = observationsState;

  return {
    observations
  };
})(ObservationList);

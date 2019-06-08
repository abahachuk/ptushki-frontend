import { push } from "connected-react-router";
import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import useMount from "react-use/esm/useMount";
import { DataGrid } from "../../../components/table/DataGrid";
import { RootState } from "../../../store";
import {
  birdsData,
  birdsFiltersRequest
} from "../../../store/actions/birdsListActions";
import { AsyncResource } from "../../../utils/createAsyncStateReducer";
import { ROUTE_BIRD_INFO } from "../routing/routes";
import { BIRDS_LIST_COLUMNS_CONFIG } from "./columns";
import { BIRDS_GRID_STATE_SELECTOR, BIRDS_LIST_NAMESPACE } from "./conf";
import { BirdData } from "./models";

interface BirdsListProps extends DispatchProp {
  birds: AsyncResource<BirdData[]>;
}

export const BirdsList: FC<BirdsListProps> = ({ birds, dispatch }) => {
  useMount(() => {
    dispatch(birdsFiltersRequest());
    dispatch(birdsData.request());
  });

  return (
    <DataGrid
      namespace={BIRDS_LIST_NAMESPACE}
      gridStateSelector={BIRDS_GRID_STATE_SELECTOR}
      rows={birds.error ? [] : birds.value}
      columns={BIRDS_LIST_COLUMNS_CONFIG}
      isLoading={birds.isLoading}
      onRowClick={r => {
        // TODO pass route param
        dispatch(push(ROUTE_BIRD_INFO.path));
      }}
    />
  );
};

export const BirdsListConnected = connect((state: RootState) => {
  const birdsState = state.birdsList;
  const { birds } = birdsState;

  return {
    birds
  };
})(BirdsList);
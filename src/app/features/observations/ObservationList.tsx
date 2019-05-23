import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import useMount from "react-use/esm/useMount";
import { DataGrid, DataGridCol } from "../../../components/table/DataGrid";
import { labels } from "../../../config/i18n/labels";
import { RootState } from "../../../store";
import { observationsData } from "../../../store/actions/observationListActions";
import { TmpObservation } from "../../../store/reducers/observationListReducer";
import { AsyncResource } from "../../../utils/createAsyncStateReducer";
import { GridColumn } from "../../../utils/grid/columnsConfig";
import { IndexCell } from "./cells/IndexCell";
import { VerificationCell } from "./cells/VerificationCell";
import {
  OBSERVATIONS_GRID_STATE_SELECTOR,
  OBSERVATIONS_LIST_NAMESPACE
} from "./conf";

interface ObservationListProps extends DispatchProp {
  observations: AsyncResource<TmpObservation[]>;
}

const OBSERVATION_LIST_COLUMNS: DataGridCol<TmpObservation>[] = [
  { name: GridColumn.id, title: labels.idx, getCellValue: IndexCell },
  {
    name: GridColumn.species,
    title: labels.species,
    getCellValue: r => r.colorRing
  },
  {
    name: GridColumn.verified,
    title: labels.verification,
    getCellValue: r => <VerificationCell observation={r} />
  },
  {
    name: GridColumn.sex,
    title: labels.sex,
    getCellValue: () => null
  },
  {
    name: GridColumn.ring,
    title: labels.generalIdentificationMethod,
    getCellValue: () => null
  },
  { name: GridColumn.status, title: labels.status, getCellValue: r => r.note },
  {
    name: GridColumn.condition,
    title: labels.condition,
    getCellValue: r => r.note
  }
];

export const ObservationList: FC<ObservationListProps> = ({
  observations,
  dispatch
}) => {
  useMount(() => {
    dispatch(observationsData.request());
  });

  return (
    <DataGrid
      namespace={OBSERVATIONS_LIST_NAMESPACE}
      gridStateSelector={OBSERVATIONS_GRID_STATE_SELECTOR}
      rows={observations.error ? [] : observations.value}
      columns={OBSERVATION_LIST_COLUMNS}
      isLoading={observations.isLoading}
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

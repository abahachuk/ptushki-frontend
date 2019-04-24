import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import useMount from "react-use/esm/useMount";
import { DataGrid, DataGridCol } from "../../../components/table/DataGrid";
import { RootState } from "../../../store";
import { TmpObservation } from "../../../store/reducers/observationListReducer";
import { observationsData } from "../../../store/actions/observationListActions";
import { AsyncResource } from "../../../utils/createAsyncStateReducer";
import { VerificationCell } from "./cells/VerificationCell";
import { labels } from "../../../config/i18n/labels";
import { IndexCell } from "./cells/IndexCell";
import { GridColumn } from "../../../utils/grid/columnsConfig";
import { OBSERVATIONS_LIST_NAMESPACE } from "./conf";

interface ObservationListProps extends DispatchProp {
  observations: AsyncResource<TmpObservation[]>;
}

const OBSERVATION_LIST_COLUMNS: DataGridCol<TmpObservation>[] = [
  { name: GridColumn.id, title: labels.idx, getCellValue: IndexCell },
  {
    name: GridColumn.verified,
    title: labels.verification,
    getCellValue: r => <VerificationCell observation={r} />
  },
  {
    name: "firstName",
    title: "Вид",
    getCellValue: r => r.firstName
  },
  { name: "lastName", title: "Статус", getCellValue: r => r.lastName }
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
      gridStateSelector={(s: RootState) => s.observationList.gridState}
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

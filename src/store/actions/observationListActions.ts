import { OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/observations/conf";
import {
  ObservationData,
  ObservationFilters
} from "../../app/features/observations/models";
import { dataGridActions } from "../../components/table/dataGridActions";

export const observationGridActions = dataGridActions<
  ObservationData[],
  ObservationFilters
>(OBSERVATIONS_LIST_NAMESPACE);

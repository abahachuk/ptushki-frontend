import { BIRD_OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/birds/conf";
import {
  ObservationData,
  ObservationFilters
} from "../../app/features/observations/models";
import { dataGridActions } from "../../components/table/dataGridActions";

export const observationGridActions = dataGridActions<
  ObservationData[],
  ObservationFilters
>(BIRD_OBSERVATIONS_LIST_NAMESPACE);

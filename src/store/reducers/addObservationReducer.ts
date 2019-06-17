import {
  AsyncResource,
  createAsyncStateReducer
} from "../../utils/createAsyncStateReducer";
import { addObservation } from "../actions/addObservationsActions";
import { FormValues } from "../../components/common-bird/CommonBirdModels";

const initialState = {
  value: null,
  isLoading: true,
  error: null as string
} as AsyncResource<FormValues>;

export const addObservationReducer = createAsyncStateReducer(
  initialState,
  addObservation
);

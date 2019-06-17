import {
  AsyncResource,
  createAsyncStateReducer
} from "../../utils/createAsyncStateReducer";
import { initialData } from "../actions/initialDataActions";
import { IInitialData } from "../../app/features/create-page/models";

const initialState = {
  value: null,
  isLoading: true,
  error: null as string
} as AsyncResource<IInitialData>;

export const initialDataReducer = createAsyncStateReducer(
  initialState,
  initialData
);

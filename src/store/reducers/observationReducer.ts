import reduceReducer from "reduce-reducers";
import { handleAction } from "redux-actions";
import {
  AsyncResource,
  createAsyncStateReducer
} from "../../utils/createAsyncStateReducer";
import {
  addObservation,
  updateObservation
} from "../actions/observationActions";
import { FormValues } from "../../components/common-bird/CommonBirdModels";

const initialState = {
  value: {},
  isLoading: true,
  error: null as string
} as AsyncResource<FormValues>;

export const observationReducer = reduceReducer(
  initialState,

  createAsyncStateReducer(initialState, addObservation),

  handleAction(
    updateObservation,
    (state, action) => ({
      ...state,
      value: action.payload
    }),
    initialState
  )
);

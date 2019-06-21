import reduceReducer from "reduce-reducers";
import { handleAction } from "redux-actions";
import {
  AsyncResource,
  createAsyncStateReducer
} from "../../utils/createAsyncStateReducer";
import {
  addObservation,
  deleteObservation,
  flushObservation,
  getObservation,
  putObservation,
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

  createAsyncStateReducer(initialState, getObservation),

  createAsyncStateReducer(initialState, putObservation),

  createAsyncStateReducer(initialState, deleteObservation),

  handleAction(
    updateObservation,
    (state, action) => ({
      ...state,
      value: action.payload
    }),
    initialState
  ),

  handleAction(
    // @ts-ignore
    flushObservation,
    (state, action) => ({
      ...state,
      value: {}
    }),
    initialState
  )
);

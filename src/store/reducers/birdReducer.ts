import reduceReducer from "reduce-reducers";
import { handleAction } from "redux-actions";
import {
  AsyncResource,
  createAsyncStateReducer
} from "../../utils/createAsyncStateReducer";
import { FormValues } from "../../components/common-bird/CommonBirdModels";
import { addBird, updateBird } from "../actions/birdActions";

const initialState = {
  value: {},
  isLoading: true,
  error: null as string
} as AsyncResource<FormValues>;

export const birdReducer = reduceReducer(
  initialState,

  createAsyncStateReducer(initialState, addBird),

  handleAction(
    updateBird,
    (state, action) => ({
      ...state,
      value: action.payload
    }),
    initialState
  )
);

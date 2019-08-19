import reduceReducer from "reduce-reducers";
import { handleAction } from "redux-actions";
import { PayloadAC } from "typesafe-actions";

export interface AsyncResource<TData> {
  isLoading: boolean;
  value: TData;
  error: string;
}

export const createAsyncStateReducer = <
  TData extends {},
  TState extends AsyncResource<TData>
>(
  initState: TState,
  asyncAction: {
    request: PayloadAC<string, any>;
    success: PayloadAC<string, TData>;
    failure: PayloadAC<string, string>;
  }
) =>
  reduceReducer(
    initState,

    handleAction(
      asyncAction.request,
      (state, action) => ({
        ...state,
        isLoading: true
      }),
      initState
    ),

    handleAction(
      asyncAction.success as PayloadAC<string, TData>,
      (state, action) => ({
        ...state,
        value: action.payload,
        isLoading: false,
        error: null
      }),
      initState
    ),

    handleAction(
      asyncAction.failure,
      (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload
      }),
      initState
    )
  );

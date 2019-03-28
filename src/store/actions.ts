import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./index";

export const sampleActionIncrement = createStandardAction(
  "SAMPLE_ACTION_INCREMENT"
)<number>();

export const sampleActionAsyncIncrement = createAsyncAction(
  "ASYNC_INCREMENT_STARTED",
  "ASYNC_INCREMENT_SUCCESS",
  "ASYNC_INCREMENT_FAILURE"
)<number, any, any>();

export const sampleThunkAsyncIncrement = (
  count: number
): ThunkAction<void, RootState, undefined, any> => dispatch => {
  dispatch(sampleActionAsyncIncrement.request(count));

  new Promise<number>(resolve => {
    setTimeout(() => {
      resolve(count);
    }, 500);
  }).then(d => {
    dispatch(sampleActionAsyncIncrement.success(d));
    dispatch(sampleActionIncrement(d));
  });
};

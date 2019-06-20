import reduceReducer from "reduce-reducers";
import { handleAction } from "redux-actions";
import {
  selectLocale,
  selectViewMode
} from "../actions/userPreferencesActions";

export enum Locale {
  ru = "ru",
  en = "en",
  by = "by"
}

export enum ViewMode {
  EURingAndTitle = "EURingAndTitle"
}

const initialState = {
  selectedLocale: Locale.ru,
  selectedViewMode: ViewMode.EURingAndTitle
};

export const userPreferencesReducer = reduceReducer<typeof initialState>(
  initialState,
  handleAction(
    selectLocale,
    (state, action) => ({
      ...state,
      selectedLocale: action.payload
    }),
    initialState
  ),
  handleAction(
    selectViewMode,
    (state, action) => ({
      ...state,
      selectedViewMode: action.payload
    }),
    initialState
  )
);

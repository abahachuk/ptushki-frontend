import { createStandardAction } from "typesafe-actions";
import { Locale, ViewMode } from "../reducers/userPreferencesReducer";

export const selectLocale = createStandardAction("SELECT_LOCALE")<Locale>();
export const selectViewMode = createStandardAction("SELECT_VIEW_MODE")<
  ViewMode
>();

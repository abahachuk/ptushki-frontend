import { RootState } from "./index";

export const langSelector = (state: RootState) =>
  state.userPreferences.selectedLocale;

import { RootState } from "../../store";

export const getLangQuery = (state: RootState) => ({
  lang: state.userPreferences.selectedLocale
});

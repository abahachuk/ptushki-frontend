import { RootState } from "../../store";
import { Locale } from "../../store/reducers/userPreferencesReducer";

export const getLangQuery = (state: RootState) => ({
  lang: {
    [Locale.en]: "eng",
    [Locale.ru]: "rus",
    [Locale.by]: "byn"
  }[state.userPreferences.selectedLocale]
});

import { Locale } from "../store/reducers/userPreferencesReducer";
import { DescriptedField } from "../app/features/observations/models";

export type LocalizedField = {
  [key in Locale]?: string;
};

export default class LocalizeService {
  private getLocalizedValue(locale: Locale, field: LocalizedField) {
    return (
      field[locale] || field[Locale.en] || field[Locale.ru] || field[Locale.by]
    );
  }

  public getFieldDescription(locale: Locale, descriptedField: DescriptedField) {
    const localizedField = {
      [Locale.ru]: descriptedField.desc_rus,
      [Locale.en]: descriptedField.desc_eng,
      [Locale.by]: descriptedField.desc_byn
    };
    return this.getLocalizedValue(locale, localizedField) || descriptedField.id;
  }
}

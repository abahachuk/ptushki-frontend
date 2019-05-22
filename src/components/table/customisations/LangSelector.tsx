import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import { labels } from "../../../config/i18n/labels";
import { RootState } from "../../../store";
import { selectLocale } from "../../../store/actions/userPreferencesActions";
import { Locale } from "../../../store/reducers/userPreferencesReducer";
import { GridSettingsDropdownButton } from "../../gridSettingsDropdownButton/GridSettingsDropdownButton";

interface Props extends DispatchProp {
  selectedLocale: Locale;
}

const LOCALE_LABELS: { [key in Locale]: string } = {
  en: labels.lang.eng,
  ru: labels.lang.rus
};

export const LangSelector: FC<Props> = ({ dispatch, selectedLocale }) => (
  <UncontrolledDropdown>
    <DropdownToggle
      tag={GridSettingsDropdownButton}
      className="border-0 shadow-none bg-transparent text-dark"
    >
      <span>{LOCALE_LABELS[selectedLocale]}</span>
    </DropdownToggle>
    <DropdownMenu right>
      {Object.entries(Locale).map(([key, locale]: [Locale, Locale]) => (
        <DropdownItem
          key={key}
          active={selectedLocale === locale}
          onClick={() => dispatch(selectLocale(locale))}
        >
          {LOCALE_LABELS[locale]}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </UncontrolledDropdown>
);

export const LangSelectorConnected = connect(
  (state: RootState) => state.userPreferences
)(LangSelector);

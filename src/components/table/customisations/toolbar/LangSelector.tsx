import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import { labels } from "../../../../config/i18n/labels";
import { RootState } from "../../../../store";
import { selectLocale } from "../../../../store/actions/userPreferencesActions";
import { Locale } from "../../../../store/reducers/userPreferencesReducer";
import { GridSettingsDropdownButton } from "../../../gridSettingsDropdownButton/GridSettingsDropdownButton";

interface Props extends DispatchProp {
  selectedLocale: Locale;
}

const LOCALE_LABELS: { [key in Locale]: string } = {
  eng: labels.lang.eng,
  rus: labels.lang.rus,
  byn: labels.lang.by
};

export const LangSelector: FC<Props> = ({ dispatch, selectedLocale }) => (
  <UncontrolledDropdown>
    <DropdownToggle tag={GridSettingsDropdownButton}>
      <span>{LOCALE_LABELS[selectedLocale]}</span>
    </DropdownToggle>
    <DropdownMenu right className="grid-settings-dropdown-menu">
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

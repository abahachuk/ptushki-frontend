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
  en: labels.lang.eng,
  ru: labels.lang.rus
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
          onClick={() => {
            // actions emitted through dispatch provided by connect are not passed to redux-observable.
            // probably a bug in redux-subspace observable.
            // as a workaround, now we are using dispatch directly:
            // import("../../../store").then(({ store }) => {
            //   store.dispatch ...
            // });
            // TODO investigate the issue and replace with normal dispatch
            import("../../../../store").then(({ store }) => {
              store.dispatch(selectLocale(locale));
            });
          }}
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

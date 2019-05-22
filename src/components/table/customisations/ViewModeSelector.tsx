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
import { selectViewMode } from "../../../store/actions/userPreferencesActions";
import { ViewMode } from "../../../store/reducers/userPreferencesReducer";
import { GridSettingsDropdownButton } from "../../gridSettingsDropdownButton/GridSettingsDropdownButton";

interface Props extends DispatchProp {
  selectedViewMode: ViewMode;
}

const VIEW_MODE_LABELS: { [key in ViewMode]: string } = {
  EURingAndTitle: labels.viewMode.euRingAndTitle
};

export const ViewModeSelector: FC<Props> = ({ dispatch, selectedViewMode }) => (
  <UncontrolledDropdown>
    <DropdownToggle
      tag={GridSettingsDropdownButton}
      className="border-0 shadow-none bg-transparent text-dark"
    >
      <span>{VIEW_MODE_LABELS[selectedViewMode]}</span>
    </DropdownToggle>
    <DropdownMenu right>
      {Object.entries(ViewMode).map(([key, viewMode]: [ViewMode, ViewMode]) => (
        <DropdownItem
          key={key}
          active={selectedViewMode === viewMode}
          onClick={() => dispatch(selectViewMode(viewMode))}
        >
          {VIEW_MODE_LABELS[viewMode]}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </UncontrolledDropdown>
);

export const ViewModeSelectorConnected = connect(
  (state: RootState) => state.userPreferences
)(ViewModeSelector);

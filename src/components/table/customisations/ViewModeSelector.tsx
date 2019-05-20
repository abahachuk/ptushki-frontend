import React, { FC } from "react";
import { labels } from "../../../config/i18n/labels";
import { GridSettingsDropdownButton } from "../../gridSettingsDropdownButton/GridSettingsDropdownButton";

export const ViewModeSelector: FC<{}> = p => (
  <GridSettingsDropdownButton>
    <span>{labels.viewMode.euRingAndTitle}</span>
  </GridSettingsDropdownButton>
);

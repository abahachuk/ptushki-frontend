import React, { FC } from "react";
import { labels } from "../../../config/i18n/labels";
import { GridSettingsDropdownButton } from "../../gridSettingsDropdownButton/GridSettingsDropdownButton";

export const LangSelector: FC<{}> = p => (
  <GridSettingsDropdownButton>
    <span>{labels.lang.rus}</span>
  </GridSettingsDropdownButton>
);

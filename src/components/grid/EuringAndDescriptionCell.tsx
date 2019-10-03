import * as React from "react";
import { useSelector } from "react-redux";
import { DescriptedField } from "../../app/features/observations/models";
import { localizeService } from "../../services";
import { langSelector } from "../../store/selectors";

export const EuringAndDescriptionCell = (field: DescriptedField) => {
  const currentLang = useSelector(langSelector);
  return (
    <>
      <span className="font-italic">{field.id}</span>
      &ensp;
      <span>{localizeService.getFieldDescription(currentLang, field)}</span>
    </>
  );
};

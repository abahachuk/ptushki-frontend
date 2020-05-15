import * as React from "react";
import { DescriptedField } from "../../app/features/observations/models";

export const EuringAndDescriptionCell = (field: DescriptedField) => (
  <>
    <span className="font-italic">{field.id}</span>
    &ensp;
    <span>{field.desc}</span>
  </>
);

import * as React from "react";
import { DescriptedField } from "../../app/features/observations/models";

export const EuringAndDescriptionCell = ({ id, desc_rus }: DescriptedField) => (
  <>
    <span className="font-italic">{id}</span>
    &ensp;
    <span>{desc_rus}</span>
  </>
);

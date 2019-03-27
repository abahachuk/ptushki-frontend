import { createStandardAction } from "typesafe-actions";

export const sampleActionIncrement = createStandardAction(
  "SAMPLE_ACTION_INCREMENT"
)<number>();

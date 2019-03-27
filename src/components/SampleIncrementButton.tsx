import React, { FC } from "react";
import { Button } from "reactstrap";

export const SampleIncrementButton: FC<{
  incrementAmount: number;
  doIncrement(n: number): void;
}> = ({ incrementAmount, doIncrement }) => (
  <Button className="m-1" onClick={() => doIncrement(incrementAmount)}>
    Increment {incrementAmount}
  </Button>
);

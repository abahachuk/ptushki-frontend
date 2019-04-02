import React, { FC, ReactNode } from "react";
import { Button } from "reactstrap";

export const SampleIncrementButton: FC<{
  incrementAmount: number;
  caption?: ReactNode;
  doIncrement(n: number): void;
}> = ({ incrementAmount, doIncrement, caption = "Increment" }) => (
  <Button className="m-1" onClick={() => doIncrement(incrementAmount)}>
    {caption} {incrementAmount}
  </Button>
);

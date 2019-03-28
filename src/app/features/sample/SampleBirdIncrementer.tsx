import React, { FC } from "react";
import { connect } from "react-redux";
import { Card, CardBody } from "reactstrap";
import { SampleIncrementButton } from "../../../components/SampleIncrementButton";
import { RootState } from "../../../store";
import {
  sampleActionIncrement,
  sampleThunkAsyncIncrement
} from "../../../store/actions";

const SampleBirdIncrementer: FC<{
  birdsCount: number;
  increment(val: number): void;
  asyncIncrement(val: number): void;
}> = ({ birdsCount, increment, asyncIncrement }) => (
  <Card className="m-4">
    <CardBody>
      there are {birdsCount} birds
      <SampleIncrementButton incrementAmount={2} doIncrement={increment} />
      <SampleIncrementButton incrementAmount={10} doIncrement={increment} />
      <SampleIncrementButton
        incrementAmount={1000}
        doIncrement={asyncIncrement}
        caption="Asynchronously increment"
      />
    </CardBody>
  </Card>
);

export const SampleBirdIncrementerConnected = connect(
  (state: RootState) => ({
    birdsCount: state.birdsCount
  }),
  {
    increment: sampleActionIncrement,
    asyncIncrement: sampleThunkAsyncIncrement
  }
)(SampleBirdIncrementer);

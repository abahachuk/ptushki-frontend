import React, { FC } from "react";
import { connect } from "react-redux";
import { Card, CardBody } from "reactstrap";
import { SampleIncrementButton } from "../../../components/SampleIncrementButton";
import { RootState } from "../../../store";
import { sampleActionIncrement } from "../../../store/actions";

const SampleBirdIncrementer: FC<{
  birdsCount: number;
  increment(val: number): void;
}> = ({ birdsCount, increment }) => (
  <Card className="m-4">
    <CardBody>
      there are {birdsCount} birds
      <SampleIncrementButton incrementAmount={2} doIncrement={increment} />
      <SampleIncrementButton incrementAmount={10} doIncrement={increment} />
    </CardBody>
  </Card>
);

export const SampleBirdIncrementerConnected = connect(
  (state: RootState) => ({
    birdsCount: state.birdsCount
  }),
  { increment: sampleActionIncrement }
)(SampleBirdIncrementer);

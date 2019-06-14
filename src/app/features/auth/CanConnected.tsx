import { connect } from "react-redux";
import { Can, CanProps } from "@casl/react";
import { Ability } from "@casl/ability";
import { RootState } from "../../../store";

export const CanConnected = connect<{ ability: Ability }, {}, CanProps>(
  (state: RootState) => ({
    ability: state.auth.permissions
  })
)(Can);

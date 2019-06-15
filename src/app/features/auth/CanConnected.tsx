import { Ability } from "@casl/ability";
import { Can, CanProps } from "@casl/react";
import { ReactNode } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../store";

// casl's typings do not account for the ability to provide
//  children as a function in passThrough mode,
//  so we use this typing instead, to preserve at least some type safety
type ActualCanProps = CanProps & {
  children?: ((can: boolean) => ReactNode) | ReactNode;
};

export const CanConnected = connect<{ ability: Ability }, {}, ActualCanProps>(
  (state: RootState) => ({
    ability: state.auth.permissions
  })
)(Can);

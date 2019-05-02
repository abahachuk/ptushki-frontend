import { SubspaceProviderProps } from "react-redux-subspace";
import React, { FC, useContext, useMemo } from "react";
import { Provider, ReactReduxContext } from "react-redux";
import { subspace } from "redux-subspace";

export const SubspaceProviderHacked = <T, S, A>({
  children,
  mapState,
  namespace
}: SubspaceProviderProps<T, S, A>) => {
  const { store } = useContext(ReactReduxContext);

  return (
    <Provider
      store={useMemo(
        () => subspace(mapState as any, namespace)(store),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [store]
      )}
    >
      {children}
    </Provider>
  );
};

export const BreakOutOfSubspace: FC<{}> = ({ children }) => {
  const { store } = useContext(ReactReduxContext);

  return <Provider store={(store as any).rootStore}>{children}</Provider>;
};

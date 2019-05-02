import { createStandardAction } from "typesafe-actions";

export const prefixActionCreator = <T>(namespace: string, ac: T): T =>
  (createStandardAction<any>(`${namespace}/${ac.toString()}`)() as any) as T;

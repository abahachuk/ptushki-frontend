import { connectRouter } from "connected-react-router";
import { history } from "./history";

export const routerReducer = connectRouter(history);

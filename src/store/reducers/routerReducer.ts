import { connectRouter } from "connected-react-router";
import { history } from "../../app/features/routing/history";

export const routerReducer = connectRouter(history);

import { plusMinus } from "./plusminus";
import { combineReducers } from "redux";

export const rootReducers = combineReducers({
    plusminus: plusMinus,
});
//@ts-nocheck
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as appReducer} from "./app";

const reducers = combineReducers({
    app: appReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: reducers,
        devTools: true,
    });
}

export type RootState = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore();
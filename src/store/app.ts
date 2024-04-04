//@ts-nocheck
import {createSlice} from "@reduxjs/toolkit";
import {Product} from "../api";

export interface IUser {
    login?: string;
    auth: boolean;
}

interface IState {
    selected: Product;
    user: IUser;
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        selected: {},
        user: {auth: false}
    } as IState,
    reducers: {
        setSelected: (state, {payload: selected}) => {
            state.selected = selected;
        },
    }
});

export const {actions, reducer} = appSlice;
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
    items: any[];
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        selected: {},
        user: {auth: false},
        items: []
    } as IState,
    reducers: {
        setSelected: (state, {payload: selected}) => {
            state.selected = selected;
        },
        setItems: (state, {payload: items}) => {
            state.items = items;
        },
    }
});

export const {actions, reducer} = appSlice;
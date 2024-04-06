//@ts-nocheck
import {createSlice} from "@reduxjs/toolkit";
import {Product} from "../api";

interface IState {
    selected: Product;
    items: any[];
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        selected: {},
        items: [],
        page: '',
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
//@ts-nocheck
import {createSlice} from "@reduxjs/toolkit";
import {Product} from "../api";

interface IState {
    selected: Product;
    items: any[];
    editor: boolean;
    page: string;
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        selected: {},
        items: [],
        page: '',
        editor: true
    } as IState,
    reducers: {
        setSelected: (state, {payload: selected}) => {
            state.selected = selected;
        },
        setItems: (state, {payload: items}) => {
            state.items = items;
        },
        setEditor: (state) => {
            state.editor = !state.editor;
        },
    }
});

export const {actions, reducer} = appSlice;
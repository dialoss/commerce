//@ts-nocheck
import {createSlice} from "@reduxjs/toolkit";
import {Product} from "../api";

interface IState {
    selected: Product;
    items: any[];
    // editor: boolean;
    page: string;
    users: object;
    pageData: object;
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        selected: {},
        items: [],
        page: '',
        users: {},
        pageData: {},
        // editor: true
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
        setPage: (state, {payload: page}) => {
            state.page = page;
        },
        setPageData: (state, {payload: data}) => {
            state.pageData = data;
        },
        setUsers: (state, {payload: users}) => {
            for (const user of users) {
                state.users[user.userId] = user;
            }
        },
    }
});

export const {actions, reducer} = appSlice;
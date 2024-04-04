//@ts-nocheck
import {createSlice} from "@reduxjs/toolkit";

export interface IPage {
    id: number;
    title: string;
    path: string;
    views: number;
    slug: string;
    comments: boolean;
    type: "page";
}

let emptyPage: IPage = {
    id:-1,
    title:'',
    path:'',
    views:0,
    slug:'',
    comments:false,
    type:'page',
}

export interface ILocation {
    serverURL: string,
    fullURL: string;
    relativeURL: string;
    pages: {key: number, value: IPage};
    currentPage: IPage;
    pageSlug: string;
    tab: number;
}

export const locationSlice = createSlice({
    name: "location",
    initialState: {
        pages : {},
        fullURL : '',
        relativeURL : '',
        currentPage: {},
        pageSlug: '',
        tab: 0,
    } as ILocation,
    reducers: {
        setLocation: (state : ILocation) => {
            let url = decodeURI(window.location.href);
            url = url.split('?')[0];
            state.relativeURL = url.split('/').slice(3).join('/');
            if (state.relativeURL[0] !== '/') state.relativeURL = '/' + state.relativeURL;
            if (state.relativeURL.slice(-1) !== '/') state.relativeURL = state.relativeURL + '/';
            state.fullURL = url;
            state.pageSlug = state.relativeURL.split('/').slice(-2, -1)[0];
            for (const p in state.pages) {
                if ('/' + state.pages[p].path + '/' === state.relativeURL) {
                    state.currentPage = state.pages[p];
                    state.currentPage.type = 'page';
                    return;
                }
            }
            state.currentPage = emptyPage;
        },
        setPages: (state: ILocation, {payload: pages}) => {
            let pagesObj = {};
            pages.forEach(page => {
                pagesObj[page.id] = page;
            });
            state.pages = pagesObj;

        },
        setTab: (state: ILocation, {payload: tab}) => {
            state.tab = tab;
        }
    }
});

export const { actions, reducer } = locationSlice;
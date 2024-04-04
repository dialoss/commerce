//@ts-nocheck

import Main from "../../Main";
import Products from "../../Products";
import ItemsList from "../../../components/ItemsList";
import MediaCard from "../../../components/MediaCard";
import {api} from "../../../index";

export const routes = [
    {path: "/main/", element: <Main></Main>},
    {path: "/models/", element: <Products></Products>},
    {path: "/gallery/", element: <ItemsList getItems={() => api.apiGalleryList()} component={MediaCard}></ItemsList>},
];

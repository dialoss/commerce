//@ts-nocheck

import Intro from "../../Main/Intro";
import Products from "../../Products";
import ItemsList from "../../../components/ItemsList";
import MediaCard from "../../../components/MediaCard";
import {api} from "../../../index";
import ProductPage from "../../ProductPage";
import ShopCard from "../../../components/ShopCard";
import UserPage from "../../UserPage";

export const routes = [
    {path: "/main/", element: <Intro></Intro>},
    {path: "/models/", element: <Products></Products>},
    {path: "/models/:id/", element: <ProductPage></ProductPage>},
    {path: "/orders/:id/", element: <ProductPage></ProductPage>},
    {
        path: "/orders/",
        element: <ItemsList key={'orders'} getItems={(page) => api.apiOrderList(page)}
                            component={MediaCard}></ItemsList>
    },

    {
        path: "/gallery/",
        element: <ItemsList key={'gallery'} getItems={(page) => api.apiGalleryList(page)}
                            component={MediaCard}></ItemsList>
    },
    {
        path: "/shop/",
        element: <ItemsList key={'shop'} getItems={(page) => api.apiShopList(page)} component={ShopCard}></ItemsList>
    },
    {
        path: "/profile/",
        element: <UserPage/>
    },
];

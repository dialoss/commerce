//@ts-nocheck

import Intro from "../../Main/Intro";
import ItemsList from "../../../components/ItemsList";
import MediaCard from "../../../components/MediaCard";
import OrderCard from "../../../components/OrderCard";

import ProductPage from "../../ProductPage";
import ShopCard from "../../../components/ShopCard";
import UserPage from "../../UserPage";
import ProductCard from "../../../components/ProductCard";
import React from "react";
import Orders from "../../Orders";
import OrderPage from "../../OrderPage";

export const routes = [
    {path: "/blueprints/", element: <div></div>},
    {path: "/login/", element: null},
    {path: "/main/", element: <Intro></Intro>},
    {
        path: "/models/", element: <ItemsList key={'products'} key_={'product'} component={ProductCard}></ItemsList>
    },
    {path: "/models/:id/", element: <ProductPage></ProductPage>},
    {path: "/orders/:id/", element: <OrderPage></OrderPage>},
    {
        path: "/orders/",
        element: <Orders></Orders>
    },

    {
        path: "/gallery/",
        element: <ItemsList key={'gallery'} key_={'gallery'}
                            component={MediaCard}></ItemsList>
    },
    {
        path: "/shop/",
        element: <ItemsList key={'shop'} key_={'shop'}
                            component={ShopCard}></ItemsList>
    },
    {
        path: "/profile/",
        element: <UserPage/>
    },
    {
        path: "/profile/:id/",
        element: <UserPage/>
    },
];

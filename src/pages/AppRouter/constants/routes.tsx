//@ts-nocheck

import Intro from "../../Main/Intro";
import ItemsList from "../../../components/ItemsList";
import MediaCard from "../../../components/MediaCard";
import ShopCard from "../../../components/ShopCard";
import ProductCard from "../../../components/ProductCard";
import React from "react";
import Orders from "../../Orders";
import {ContentPage} from "../../ContentPage";
import Typography from "@mui/material/Typography";
import {OrderStatus} from "../../../components/OrderCard";
import Models from "../../Models";
import SettingsPage from "../../SettingsPage";
import UserPage from "../../UserPage";


export const pages = {
    'main': "Главная",
    'models': "Модели",
    'orders': "Заказы",
    'blueprints': "Чертежи",
    'shop': "В продаже",
    'gallery': "Галерея",
}

export const routes = [
    {
        path: "/blueprints/", element:
            <ItemsList customPagination={{productType: "Чертёж"}}
                       key={'blueprints'}
                       cacheKey={'blueprints'}
                       endpoint={'product'}
                       component={ProductCard}></ItemsList>
    },
    {path: "/login/", element: <div></div>},

    {path: "/main/", element: <Intro></Intro>},
    {
        path: "/models/", element: <Models></Models>
    },
    {path: "/models/:id/", element: <ContentPage key={'product'} endpoint={'product'}></ContentPage>},
    {
        path: "/orders/:id/", element: <ContentPage key={'order'}
                                                    endpoint={'order'}
                                                    extra={({data}) => <><Typography variant={'h6'}
                                                                                     textAlign={'center'}>Дата начала
                                                        изготовления: {window.formatDate(data.dateCreated)}</Typography>
                                                        <div style={{textAlign:'center'}}><OrderStatus status={data.status}></OrderStatus></div></>}
        ></ContentPage>
    },
    {
        path: "/orders/",
        element: <Orders></Orders>
    },

    {
        path: "/gallery/",
        element: <ItemsList key={'gallery'} cacheKey={'gallery'} endpoint={'gallery'}
                            component={MediaCard}></ItemsList>
    },
    {
        path: "/shop/",
        element: <ItemsList key={'shop'} cacheKey={'shop'} endpoint={'shop'}
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
    {
        path: "/settings/",
        element: <SettingsPage/>
    },
];

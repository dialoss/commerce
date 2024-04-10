//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import Userfront from "@userfront/toolkit/react";
import {useAppSelector} from "../store/redux";
import ProductCard from "../components/ProductCard";
import dayjs from "dayjs";
import OrderCard from "../components/OrderCard";
import {Stack} from "@mui/material";


const SettingsPage = () => {

    return (
        <div>
            <h2>Настройки профиля</h2>
            получать уведомления
        </div>
    );
};

export default SettingsPage;
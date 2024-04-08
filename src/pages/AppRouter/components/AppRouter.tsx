// @ts-nocheck

import React, {useLayoutEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {pages, routes} from "../constants/routes";
import {useAppSelector} from "../../../store/redux";

const AppRouter = () => {
    const navigate = useNavigate();
    window.navigate = (url: string) => navigate("/" + url);
    useLayoutEffect(() => {
        let page = window.location.pathname.split('/')[1];
        document.title = ((pages[page] || '') + " | ").toUpperCase() + 'MyMount';
    }, [navigate])
    return (
        <Routes>
            {
                routes.map((route) =>
                    <Route element={route.element || <div></div>}
                           path={route.path}
                           key={route.path}/>
                )
            }
            <Route path={'*'} element={<Navigate to={'/main/'}/>}/>
        </Routes>
    );
};

export default AppRouter;
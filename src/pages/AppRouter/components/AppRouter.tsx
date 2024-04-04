// @ts-ignore

import React from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {routes} from "../constants/routes";

const AppRouter = () => {
    const navigate = useNavigate();
    let p = window.location.href.split('/').slice(-1)[0]
    document.title = p.toUpperCase() + ' | MyMount';
    window.navigate = (url: string) => navigate("/" + url);
    return (
        <Routes>
            {
                routes.map((route) =>
                    <Route element={route.element}
                           path={route.path}
                           key={route.path}/>
                )
            }
            <Route path={'*'} element={<Navigate to={'/main/'}/>}/>
        </Routes>
    );
};

export default AppRouter;
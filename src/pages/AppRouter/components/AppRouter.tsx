// @ts-ignore

import React, {useLayoutEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {routes} from "../constants/routes";
import {useCurrentPath} from "../../../tools/routes";

const AppRouter = () => {
    const page = useCurrentPath();
    const navigate = useNavigate();

    window.navigate = (url: string) => navigate("/" + url);
    useLayoutEffect(() => {
        document.title = "" + ' | MyMount';
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
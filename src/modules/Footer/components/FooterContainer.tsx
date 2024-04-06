//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import {request} from "../api/metrica";
import Footer from "../../../ui/Footer/Footer";

const FooterContainer = () => {
    const [views, setViews] = useState({currentViews: 0, totalViews: 0});
    // const location = useAppSelector(state => state.location);
    // useLayoutEffect(() => {
    //     request().then(data => {
    //         let currentViews = 0;
    //         let pageMetrics = data.data.filter(p => p.dimensions[0].name === location.relativeURL)[0];
    //         if (pageMetrics) currentViews = pageMetrics.metrics[0];
    //         let stats = {
    //             totalViews: data.totals[0] + 41908,
    //             currentViews
    //         }
    //         setViews(stats);
    //     });
    // }, [location.relativeURL]);
    return (
        <Footer totalViews={views.totalViews} currentViews={views.currentViews}></Footer>
    );
};

export default FooterContainer;
//@ts-nocheck
import React from 'react';
import Images from './components/Photos';
import {Container} from "./ui/Container";

import Bar from "./Bar";
import {AppRouter} from "./pages/AppRouter";
import {BrowserRouter} from 'react-router-dom';
import Chat from "./modules/Chat";
import FooterContainer from './modules/Footer/components/FooterContainer';
import AuthContainer from "./modules/Auth/AuthContainer";
import {LoginForm} from "@userfront/toolkit/react";
import "tools/date"
import "./notifications"
import {UploadWidget} from "./modules/UploadWidget";
import PageComments from "./modules/PageComments/PageComments";
import Alerts from "./ui/Alerts";
import {pages} from "./pages/AppRouter/constants/routes";

function Admin() {
    return (
        <div className="App">
            <div style={{display: 'none'}}><LoginForm></LoginForm></div>
            <BrowserRouter>
                <Bar current={Object.keys(pages).indexOf(window.location.pathname.replace('/', ''))}
                     tabs={pages}
                     onChange={t => window.navigate(Object.keys(pages)[t])}></Bar>
                <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                    <div style={{height: 70}}></div>
                    <Container>
                        <AppRouter></AppRouter>
                    </Container>
                    <PageComments></PageComments>
                    <div style={{flexGrow: 1}}></div>
                    <FooterContainer/>
                </div>
            </BrowserRouter>
            <UploadWidget></UploadWidget>
            <Chat></Chat>
            <AuthContainer></AuthContainer>
            <Images></Images>
            <Alerts></Alerts>
        </div>
    );
}

export default Admin;

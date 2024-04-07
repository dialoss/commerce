//@ts-nocheck
import React, {useEffect} from 'react';
import Bar from "./Bar";
import {AppRouter} from "./pages/AppRouter";
import {BrowserRouter, useNavigate} from 'react-router-dom';
import FileManager from "./modules/FileManager";
import DataForm from './modules/DataForm';
import Chat from "./modules/Chat";
import Images from './components/Photos';
import {Container} from "./ui/Container";
import FooterContainer from './modules/Footer/components/FooterContainer';
import PageComments from "./modules/PageComments/PageComments";
import AuthContainer from "./modules/Auth/AuthContainer";
import Alerts from "./ui/Alerts";
import Auth from "./modules/Auth/Auth";
import {LoginForm} from "@userfront/toolkit/react";

interface IFilemanager {
    getFiles: () => Promise<any>;
}

interface IAuth {
    open: () => any;

}

interface ImagesViewer {
    open: (data: any) => any;
}

interface IApp {
    update?: (data: any) => void;
    filemanager?: IFilemanager;
    auth?: IAuth;
    images?: ImagesViewer;
    alert: (data: object) => any;
}

declare global {
    interface Window {
        cloudinary: any;
        navigate: any;
        app: IApp;
    }
}

window.app = {};

const pages = {
    'main': "Главная",
    'models': "Модели",
    'orders': "Заказы",
    'blueprints': "Чертежи",
    'shop': "В продаже",
    'gallery': "Галерея",
}

function App() {
    return (
        <div className="App">
            <div style={{display:'none'}}><LoginForm></LoginForm></div>
            <Bar current={0} tabs={Object.values(pages)} onChange={t => window.navigate(Object.keys(pages)[t])}></Bar>
            <BrowserRouter>
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
            <FileManager></FileManager>
            <Chat></Chat>
            <DataForm></DataForm>
            <AuthContainer></AuthContainer>
            <Images></Images>
            <Alerts></Alerts>
            <div className="windows"></div>
        </div>
    );
}

export default App;

//@ts-nocheck
import React, {useEffect} from 'react';
import Bar from "./Bar";
import {AppRouter} from "./pages/AppRouter";
import {BrowserRouter, useNavigate} from 'react-router-dom';
import FileManager from "./modules/FileManager";
import DataForm from './modules/DataForm';
import Chat from "./modules/Chat";
import AuthContainer from "./modules/AuthContainer";
import Images from './components/Photos';
import {Container} from "./ui/Container";
import FooterContainer from './modules/Footer/components/FooterContainer';
import PageComments from "./modules/PageComments/PageComments";

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
            <BrowserRouter>
                <Bar current={0} tabs={Object.values(pages)} onChange={t => window.navigate(Object.keys(pages)[t])}></Bar>
                <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                    <div style={{height: 70}}></div>
                    <Container>
                        <AppRouter></AppRouter>
                    </Container>
                    <PageComments></PageComments>
                    <div style={{flexGrow: 1}}></div>
                    <FooterContainer/>
                </div>
                <FileManager></FileManager>
                <Chat></Chat>
                <DataForm></DataForm>
                <AuthContainer></AuthContainer>
                <Images></Images>
            </BrowserRouter>
            <div className="windows"></div>
        </div>
    );
}

export default App;

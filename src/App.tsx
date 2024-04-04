import React, {useEffect} from 'react';
import Windows from "./Window";
import Bar from "./Bar";
import {AppRouter} from "./pages/AppRouter";
import {BrowserRouter} from 'react-router-dom';
import FileManager from "./modules/FileManager";
import DataForm from './modules/DataForm';
import Chat from "./modules/Chat";
import {MyModal} from "./components/MyModal";
import Auth from "./modules/Auth";
import AuthContainer from "./modules/AuthContainer";

interface IFilemanager {
    getFiles: () => Promise<any>;
}

interface IAuth {
    open: () => any;

}

interface IApp {
    update?: (data: any) => void;
    filemanager?: IFilemanager;
    auth?: IAuth;
}

declare global {
    interface Window {
        cloudinary: any;
        ml: any;
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

function Container({children}: {children: React.ReactElement}) {
    return (
        <div style={{maxWidth: 1200, width: '95%', margin:'0 auto'}}>
            {children}
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Bar tabs={Object.values(pages)} onChange={t => window.navigate(Object.keys(pages)[t])}></Bar>
                <FileManager></FileManager>
                <Chat></Chat>
                <DataForm></DataForm>
                <Container>
                    <AppRouter></AppRouter>
                </Container>
                <AuthContainer></AuthContainer>
            </BrowserRouter>

        </div>
    );
}

export default App;

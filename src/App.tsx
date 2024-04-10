//@ts-nocheck
import React from 'react';
import Bar from "./Bar";
import {AppRouter} from "./pages/AppRouter";
import {BrowserRouter} from 'react-router-dom';
import FileManager from "./modules/FileManager";
import Chat from "./modules/Chat";
import Images from './components/Photos';
import {Container} from "./ui/Container";
import FooterContainer from './modules/Footer/components/FooterContainer';
import PageComments from "./modules/PageComments/PageComments";
import AuthContainer from "./modules/Auth/AuthContainer";
import Alerts from "./ui/Alerts";
import Userfront, {LoginForm} from "@userfront/toolkit/react";
import {ApiApi, Configuration, ErrorContext} from "./api";
import {BASE_PATH} from "./config";
import "tools/date"
import {pages} from "./pages/AppRouter/constants/routes";
import "./notifications"
import {UploadWidget} from "./modules/UploadWidget";

interface IFilemanager {
    getFiles: () => Promise<any>;
    uploadWidget: () => Promise<any>;
    open: () => void;
}

interface IAuth {
    open: () => any;

}

interface ImagesViewer {
    open: (data: any) => any;
}

interface PageEditor {
    insert: (files: any) => any;
}

interface IApp {
    update?: (data: any) => void;
    remove?: (data: any) => void;
    create?: (data: any) => void;
    dataForm?: () => void;
    editor: PageEditor;

    filemanager?: IFilemanager;
    auth?: IAuth;
    images?: ImagesViewer;
    alert: (data: object) => any;
    contextMenu: (event: any) => any;
    toast: () => any;
    dialog: () => any;
    authAction: () => any;
}

function apiRequest(apiPromise) {
    return apiPromise.catch(er => {
        window.app.alert({message: "Страница не найдена", type: 'error'});
        window.navigate("main")
    }).then(r => {
        if (r && [200, 204].includes(r.status)) window.app.alert({duration: 1000, message: "Изменения применены"});
    })
}

declare global {
    interface Window {
        cloudinary: any;
        navigate: any;
        app: IApp;
        api: ApiApi;
        request: (apiPromise: Promise<any>) => Promise<any>;
        formatDate: (date: any) => any;
    }
}

window.app = {};
window.request = apiRequest;
window.app.authAction = () => {
    if (!Userfront.user.userId) {
        window.app.auth?.open();
        return false;
    }
    return true;
}
window.api = new ApiApi(new Configuration({
    basePath: BASE_PATH,
    middleware: [{
        onError(context: ErrorContext): Promise<Response | void> {
            console.log(context.error)
            return new Promise(resolve => resolve({x:'y'}));
        }
    }],
    headers: {
        "Authorization": Userfront.tokens.accessToken,
        "User": Userfront.user.userUuid,
    }
}));

function App() {
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
            {/*<FileManager></FileManager>*/}
            <Chat></Chat>
            <AuthContainer></AuthContainer>
            <Images></Images>
            <Alerts></Alerts>
            {/*<div className="windows"></div>*/}
        </div>
    );
}

export default App;

//@ts-nocheck
import React from 'react';
import Bar from "./Bar";
import {AppRouter} from "./pages/AppRouter";
import {BrowserRouter} from 'react-router-dom';
import FileManager from "./modules/FileManager";
import DataForm from './modules/DataForm';
import Chat from "./modules/Chat";
import Images from './components/Photos';
import {Container} from "./ui/Container";
import FooterContainer from './modules/Footer/components/FooterContainer';
import PageComments from "./modules/PageComments/PageComments";
import AuthContainer from "./modules/Auth/AuthContainer";
import Alerts from "./ui/Alerts";
import Userfront, {LoginForm} from "@userfront/toolkit/react";
import ContextMenu from "./components/ContextMenu";
import {ApiApi, Configuration} from "./api";
import {BASE_PATH} from "./config";
import "tools/date"
import {pages} from "./pages/AppRouter/constants/routes";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import {MediaField} from "./components/Form";
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
    basePath: BASE_PATH
}));

function App() {
    return (
        <div className="App">
            {/*<Editor></Editor>*/}
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
            <FileManager></FileManager>
            <Chat></Chat>
            <AuthContainer></AuthContainer>
            <Images></Images>
            <Alerts></Alerts>
            <ContextMenu></ContextMenu>
            <div className="windows"></div>
        </div>
    );
}

export default App;



const config = {
    components: {
        HeadingBlock: {
            fields: {
                children: {
                    type: "text",
                },
            },
            render: ({ children }) => {
                return <h1>{children}</h1>;
            },
        },
        Product: {
            fields: {
                media: {
                    type: "custom",
                    render: ({ name, onChange, value }) => (
                        <MediaField field={{value:[]}} setValue={files => onChange(files)}></MediaField>
                    ),
                },
                model: {
                    type: 'text',
                    default: "привет"
                },
                summary: {
                    type: 'text',
                },
                price: {
                    type: 'number',
                },
            },
            render: ({...data}) => {
                return <h1>{JSON.stringify(data)}</h1>;
            },
        }
    },
};

const initialData = {
    content: [],
    root: {},
};

const save = (data) => {
    console.log(data)
};

export function Editor() {
    return <Puck config={config} data={initialData} onPublish={save} />;
}
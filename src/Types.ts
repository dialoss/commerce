//@ts-nocheck
import {ApiApi, Configuration, ErrorContext} from "./api";
import Userfront from "@userfront/toolkit/react";
import {BASE_PATH} from "./config";

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
    headers: {
        "Authorization": Userfront.tokens.accessToken,
        "User": Userfront.user.userUuid,
    }
}));

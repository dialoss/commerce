// @ts-nocheck

import React, {useLayoutEffect, useState} from 'react';
import Windows from "../Window";
import {DetailsView, FileManagerComponent, Inject, NavigationPane, Toolbar} from '@syncfusion/ej2-react-filemanager';

let inited = false;

const FileManager = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [opened, setOpened] = useState(false);
    // useEffect(() => {
    //     const int = setInterval(() => {
    //         if (inited) return;
    //         inited = true;
    //         const config = {
    //             cloud_name: 'drlljn0sj',
    //             api_key: '421485169161565',
    //             username: 'matthewwimsten@gmail.com',
    //             button_class: 'myBtn',
    //             button_caption: 'Insert Images',
    //             inline_container: '.explorer',
    //             remove_header: true,
    //
    //             default_transformations: [
    //                 [{quality: "auto"}, {fetch_format: "auto"}],
    //                 [{width: 80, height: 80, crop: "fill", gravity: "auto", radius: "max"}, {
    //                     fetch_format: "auto",
    //                     quality: "auto"
    //                 }]
    //             ],
    //         }
    //         window.app.filemanager = {
    //             getFiles: () => {
    //                 setOpened(true);
    //                 return new Promise((resolve) => {
    //                     window.addEventListener("files:selected", (e) => {
    //                         resolve(e.detail);
    //                         setOpened(false);
    //                     });
    //                 })
    //             }
    //         }
    //         window.ml = window.cloudinary.createMediaLibrary(config, {
    //             insertHandler: (d: any) => {
    //                 console.log(d.assets)
    //                 window.dispatchEvent(new CustomEvent("files:selected", {detail: d.assets}));
    //             }
    //         })
    //
    //         window.ml.show()
    //         clearInterval(int);
    //     }, 1000);
    // }, [])
    let hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";

    useLayoutEffect(() => {
        const bannerRemove = setInterval(() => {
            const b = document.querySelector("body")
            const x = [...b.children];
            for (const child of x) {
                if ([...child.querySelectorAll("a")].filter(el => el.innerText.includes("Claim your")).length > 0) {
                    b.removeChild(child);
                    clearInterval(bannerRemove);
                    return;
                }
            }
        }, 50);
    }, []);
    let fileObj;

    function onFileDragStart(args) {
        console.log(args, fileObj);
    }

    function onFileDragging(args) {
        // console.log(args, fileObj);
    }

    function onFileDropped(args) {

    }

    return (
        <Windows title={'Файлы'} open={opened}>

            <FileManagerComponent
                ref={s => (fileObj = s)}
                allowDragAndDrop={true}
                allowMultiSelection={true}
                fileDragging={onFileDragging.bind(this)}
                fileDropped={onFileDropped.bind(this)}
                fileDragStart={onFileDragStart.bind(this)}
                id="file"
                ajaxSettings={{
                    url: hostUrl + "api/FileManager/FileOperations",
                    downloadUrl: hostUrl + 'api/FileManager/Download',
                    getImageUrl: hostUrl + "api/FileManager/GetImage",
                    uploadUrl: hostUrl + 'api/FileManager/Upload',
                }}>
                <Inject services={[NavigationPane, DetailsView, Toolbar]}/>
            </FileManagerComponent>

        </Windows>
    );
};

export default FileManager;
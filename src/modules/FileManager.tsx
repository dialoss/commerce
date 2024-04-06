// @ts-nocheck

import React, {useEffect, useLayoutEffect, useState} from 'react';
import Windows from "../Window";
import {DetailsView, FileManagerComponent, Inject, NavigationPane, Toolbar} from '@syncfusion/ej2-react-filemanager';
import {uploadAutodeskFile} from "../components/Model/Autodesk/api/api";

let inited = false;

const FileManager = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [opened, setOpened] = useState(false);
    useEffect(() => {
        const int = setInterval(() => {
            if (inited) return;
            inited = true;
            const config = {
                cloud_name: 'drlljn0sj',
                api_key: '421485169161565',
                username: 'matthewwimsten@gmail.com',
                button_caption: 'Добавить',
                remove_header: true,
                inline_container: '.filemanager',
                language: 'ru',
            }
            window.app.filemanager = {
                getFiles: () => {
                    setOpened(true);
                    return new Promise((resolve) => {
                        window.addEventListener("files:selected", (e) => {
                            resolve(e.detail);
                            setOpened(false);
                        });
                    })
                }
            }
            const ml = window.cloudinary.createMediaLibrary(config, {
                insertHandler: (d: any) => {
                    console.log(d.assets)
                    window.dispatchEvent(new CustomEvent("files:selected", {detail: d.assets}));
                }
            })
            ml.show();

            ml.on("upload", (data) => {
                console.log(data)
                if (data.event === "upload-added") {
                    let file = data.info.file;
                    if (file.name.split('.').slice(-1)[0].toLowerCase() === 'sldprt') {
                        uploadAutodeskFile(file).then(id => {

                        })
                    }
                }
                if (data.event === "queues-end") {
                    console.log(data.info.files);
                }
            });

            clearInterval(int);
        }, 1000);
    }, [])

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

    return (
        <Windows title={'Файлы'} open={opened}>
            <div className="filemanager"></div>
        </Windows>
    );
};

export default FileManager;
// @ts-nocheck

import React, {useEffect, useLayoutEffect, useState} from 'react';
import Windows from "../Window";
import {formatCloudFiles} from "../components/Form";
import axios from 'axios';

let manager = null;

const FileManager = () => {
    useEffect(() => {
        const int = setInterval(() => {
            const config = {
                cloud_name: 'drlljn0sj',
                api_key: '421485169161565',
                username: 'matthewwimsten@gmail.com',
                button_caption: 'Добавить',
                remove_header: true,
                view_mode: 'list',
                inline_container: '.filemanager',
                language: 'ru',
                text: {
                    "ru": {
                        "queue": {
                            "title": "Файлы для загрузки",
                            "title_uploading_with_counter": "Загружается {{num}} файлов"
                        },
                    }
                },
            }
            const eventName = "files:selected";
            let hasCallback = false;
            window.app.filemanager = {
                getFiles: () => {
                    window.openWindow("files")
                    return new Promise((resolve) => {
                        function selected(e) {
                            resolve(e.detail);
                            window.closeWindow("files")
                            hasCallback = false;
                            window.removeEventListener(eventName, this);
                        }

                        hasCallback = true;
                        window.addEventListener(eventName, selected);
                    })
                },
                open: () => {
                    hasCallback = false;
                    window.openWindow("files")
                }
            }
            manager = window.cloudinary.createMediaLibrary(config, {
                insertHandler: (d: any) => {
                    console.log(d.assets)
                    window.closeWindow("files")
                    if (!hasCallback) {
                        window.app.editor.insert(formatCloudFiles(d.assets))
                    } else window.dispatchEvent(new CustomEvent(eventName, {detail: d.assets}));
                }
            })
            manager.show();

            function checkModel(name) {
                return name.split('.').slice(-1)[0].toLowerCase() === 'sldprt';
            }

            const files = {};
            manager.on("upload", (data) => {
                const file = data.info.file;
                if (data.event === "upload-added" && checkModel(file.name)) {
                    files[data.info.id] = file;
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

        const url = "https://api.cloudinary.com/v1_1/drlljn0sj/image/upload";

        function ondrop(e) {
            let files = e.dataTransfer.files;
            if (!files.length) return;
            let uploaded = [];
            const config = {
                onUploadProgress: progressEvent => {
                    console.log(progressEvent)
                    window.app.toast(progressEvent.progress);
                }
            }
            Promise.all([...files].map(file => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "hwub8goj");
                return axios.post(url, formData, config).then(r => r.data);
            })).then(uploaded => {
                console.log('UPLOADED', uploaded)
                window.app.editor.insert(formatCloudFiles(uploaded));
            })
        }

        window.addEventListener("drop", ondrop);
        return () => window.removeEventListener("drop", ondrop);
    }, []);

    return (
        <Windows key_={'files'} title={'Файлы'}>
            <div className="filemanager w-100 h-100"></div>
        </Windows>
    );
};

export default FileManager;

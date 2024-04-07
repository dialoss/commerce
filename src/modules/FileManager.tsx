// @ts-nocheck

import React, {useEffect, useLayoutEffect, useState} from 'react';
import Windows from "../Window";
import {uploadAutodeskFile} from "../components/Model/Autodesk/api/api";
import {BASE_PATH} from "../index";

const FileManager = () => {
    const [opened, setOpened] = useState(false);
    useEffect(() => {
        const int = setInterval(() => {
            const config = {
                cloud_name: 'drlljn0sj',
                api_key: '421485169161565',
                username: 'matthewwimsten@gmail.com',
                button_caption: 'Добавить',
                remove_header: true,
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
            window.app.filemanager = {
                getFiles: () => {
                    setOpened(true);
                    return new Promise((resolve) => {
                        function selected(e) {
                            resolve(e.detail);
                            setOpened(false);
                            window.removeEventListener("files:selected", this);
                        }

                        window.addEventListener("files:selected", selected);
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

            function checkModel(name) {
                return name.split('.').slice(-1)[0].toLowerCase() === 'sldprt';
            }

            const files = {};
            ml.on("upload", (data) => {
                const file = data.info.file;
                if (data.event === "upload-added" && checkModel(file.name)) {
                    files[data.info.id] = file;
                }
                if (data.event === "queues-end") {
                    console.log(data.info.files);
                    for (const file of data.info.files) {
                        if (checkModel(file.name)) {
                            uploadAutodeskFile(files[file.id]).then(id => {
                                fetch(BASE_PATH + `/add_tag/?file=${file.uploadInfo.public_id}&tag=${id}`)
                                    .then(() => ml.show());
                            })
                        }
                    }
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
        <Windows title={'Файлы'} open={opened} callback={setOpened}>
            <div className="filemanager"></div>
        </Windows>
    );
};

export default FileManager;
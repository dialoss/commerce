//@ts-nocheck


import {useLayoutEffect} from "react";

export function UploadWidget() {
    useLayoutEffect(() => {
        const widgetEvent = "files:upload";
        let widget = window.cloudinary.createUploadWidget({
                cloudName: 'drlljn0sj',
                uploadPreset: 'hwub8goj',
                maxFiles: 3,
                maxFileSize: 10000000,
                // prepareUploadParams: (cb, params) => {
                //     params = [].concat(params);
                //     Promise.all(params.map((req) => {
                //             console.log(req)
                //             return Object.assign({
                //                 // signature: response.signature,
                //                 // apiKey: response.api_key,
                //             }, {})
                //             // if (checkModel(file.name)) {
                //             //     uploadAutodeskFile(files[file.id]).then(id =>
                //             //         Object.assign({
                //             //             signature: response.signature,
                //             //             apiKey: response.api_key,
                //             //         }, response.upload_params)
                //             //     )
                //             // }
                //         }
                //     )).then((results) =>
                //         cb(results.length === 1 ? results[0] : results));
            }, (error, result) => {
                if (!error && result) {
                    console.log(result)
                    if (result.event === "success")
                        window.dispatchEvent(new CustomEvent(widgetEvent, {detail: [result.info]}));
                }
            }
        )
        window.app.filemanager = {
            uploadWidget: () => {
                widget.open();
                return new Promise((resolve) => {
                    function selected(e) {
                        resolve(e.detail);
                        window.removeEventListener(widgetEvent, this);
                    }

                    window.addEventListener(widgetEvent, selected);
                })
            }
        }
    }, [])
    return <></>
}
//@ts-nocheck
import React, {Component, useEffect} from "react";

function UploadWidget() {
    useEffect(() => {
        let widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "drlljn0sj",
                uploadPreset: "hwub8goj"
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log(result)
                }
            }
        );
        widget.open()

    }, [])
    return (
        <></>
    )
}


export default UploadWidget;

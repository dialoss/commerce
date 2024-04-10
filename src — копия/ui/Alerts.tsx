//@ts-nocheck
import {Bounce, toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {MyModal} from "./MyModal";

function UpdatedToast({progress}) {
    const toastId = React.useRef(null);

    React.useLayoutEffect(() => {
        if (progress === 1) {
            toast.done(toastId.current);
            return;
        }
        if (toastId.current === null) {
            toastId.current = toast('Upload in Progress', {progress});
        } else {
            toast.update(toastId.current, {progress});
        }
    }, [progress]);

    return (
        <></>
    )
}

export default function Alerts() {
    window.app.alert = (d) => {
        const {message, type, duration} = d;
        toast(message, {type: type || "success", pauseOnHover: false, autoClose: duration || 2000})
    }

    window.app.toast = (d) => {
        return <UpdatedToast progress={d}></UpdatedToast>
    }

    const [dialog, setDialog] = React.useState(null);
    window.app.dialog = (d) => {
        setDialog(d);
    }

    return (
        <>
            <MyModal open={dialog != null} title={dialog ? dialog.form : ""} callback={b => {
                setDialog(null);
                dialog.callback(b);
            }} buttons={dialog ? dialog.buttons : ['Закрыть']}></MyModal>
            <ToastContainer
                position="bottom-left"
                hideProgressBar={false}
                newestOnTop
                rtl={false}
                closeButton={false}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                theme="colored"
                transition={Bounce}></ToastContainer>
        </>
    )
}
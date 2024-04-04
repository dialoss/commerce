import React, {useState} from 'react';
import Auth from "./Auth";
import {MyModal} from "../components/MyModal";

const AuthContainer = () => {
    const [open, setOpen] = useState(false);
    window.app.auth = {
        open: () => {
            setOpen(true);
            console.log(123)
        }
    }
    return (
        <>
            <MyModal title={'Авторизация'} open={open} onHide={() => setOpen(false)}><Auth></Auth></MyModal>
        </>
    );
};

export default AuthContainer;
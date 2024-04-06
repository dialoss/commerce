//@ts-nocheck
import React, {useState} from 'react';
import {MyModal} from "../components/MyModal";
import Userfront, {LoginForm, LogoutButton, SignupForm} from "@userfront/toolkit/react";
import Auth from "./Auth";

Userfront.addInitCallback((d)=>console.log(Userfront.user))
Userfront.init("8nwwwmpn");

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
            <MyModal title={'Авторизация'} open={open} onHide={() => setOpen(false)}>
                <Auth></Auth>
            </MyModal>
        </>
    );
};

export default AuthContainer;
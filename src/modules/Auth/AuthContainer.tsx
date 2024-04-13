//@ts-nocheck
import React, {useState} from 'react';
import Userfront, {LoginForm, LogoutButton, SignupForm} from "@userfront/toolkit/react";
import Auth from "./Auth";
import {MyModal} from "../../ui/MyModal";

const AuthContainer = () => {
    const [open, setOpen] = useState(false);
    window.app.auth = {
        open: () => {
            setOpen(true);
        }
    }
    return (
        <>
            <div style={{display: 'none'}}><LoginForm></LoginForm></div>
            <MyModal buttons={["Закрыть"]} style={{padding: 0}} title={'Авторизация'} open={open} callback={() => setOpen(false)}>
                <Auth></Auth>
            </MyModal>
        </>
    );
};

export default AuthContainer;
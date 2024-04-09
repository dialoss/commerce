//@ts-nocheck
import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleButton from "./GoogleButton/AuthButton";
import Typography from "@mui/joy/Typography";
import Userfront from "@userfront/toolkit/react";
import {Form} from "../../components/Form";
import store from "../../store";
import {actions} from "../../store/app";
import {BASE_PATH} from "../../config";

Userfront.init("7n8ddmqn");

fetch("https://api.userfront.com/v0/tenants/8nwwwqpn/users", {
    headers: {
        "Authorization": "Bearer uf_test_readonly_7n8ddmqn_9e4b26cde378139c16fa96895bdecd86"
    }
}).then(r => r.json()).then(d =>
    store.dispatch(actions.setUsers(d.results)))

interface IFields {
    [key: number]: string[];
}

const ru = {
    name: "Имя Фамилия",
    password: "Пароль",
    email: "Почта"
}

const autocomplete = {
    0: {
        'password': 'password',
        'email': 'username',
    },
    1: {
        "name": '',
        'password': 'new-password',
        'email': 'username'
    }
}

export default function Auth() {
    const [stage, setStage] = useState(0);

    const fields = {
        0: ["email", "password"],
        1: ["name", "email", "password"]
    } as IFields
    const caption = stage === 0 ? "Войти" : "Зарегистрироваться"
    const text = stage === 0 ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"

    function auth(response: Promise<any>) {
        response.catch(er => {
            window.app.alert({type: 'error', message: er.message})
        });
    }

    function submit(data: any, e: any) {
        if (stage === 1) {
            if (window.PasswordCredential) {
                let c = new PasswordCredential(e.target);
                navigator.credentials.store(c);
            }
            auth(Userfront.signup({
                method: 'password',
                email: data.email,
                name: data.name,
                password: data.password,
            }));
        } else auth(Userfront.login({
            method: "password",
            email: data.email,
            password: data.password,
        }))
    }

    return (<Grid container component="main" sx={{height: '70vh'}}>
        <CssBaseline/>

        <Grid item xs={12} sm={8} md={5} container>
            <Box
                sx={{
                    my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <GoogleButton callback={() =>
                    auth(Userfront.login({method: "google"}))}>Войти с Google</GoogleButton>
                или
                <Form
                    caption={caption}
                    fields={fields[stage].map((f: string) => ({
                        name: f,
                        autocomplete: autocomplete[stage][f],
                        label: ru[f],
                        value: ""
                    }))}
                    button={caption}
                    onSubmit={submit}>
                </Form>

                {text && <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Typography sx={{textDecoration: "underline"}} className={"hover:cursor-pointer"}
                                    onClick={() => setStage(s => 1 - s)}>
                            {text}
                        </Typography>
                    </Grid>
                </Grid>}
            </Box>
        </Grid>
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    </Grid>)
}
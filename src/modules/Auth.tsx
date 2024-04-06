//@ts-nocheck
import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useForm} from "react-hook-form";
import {Checkbox, FormControlLabel} from "@mui/material";
import {Form} from "../components/Form";
import Userfront from "@userfront/toolkit/react";
import GoogleButton from "./GoogleButton/AuthButton";
import Typography from "@mui/joy/Typography";

interface IFields {
    [key: number]: string[];
}

const ru = {
    name: "Имя Фамилия",
    password: "Пароль",
    email: "Почта"
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
        response.catch(er => console.log(er));
    }

    function submit(data: any) {
        if (stage === 1) auth(Userfront.signup({
            method: 'password',
            email: data.email,
            name: data.name,
            password: data.password,
            data: {
                customData: "Some custom information",
            },
        }))
        else auth(Userfront.login({
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
                <Typography component="h1">
                    {caption}
                </Typography>
                <GoogleButton callback={() =>
                    auth(Userfront.login({method: "google"}))}>Войти с Google</GoogleButton>
                или
                <Form
                    caption={caption}
                    fields={fields[stage].map((f: string) => ({name: f, label: ru[f], value: ""}))}
                    button={caption}
                    onSubmit={submit}>
                </Form>

                {text && <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link onClick={() => setStage(s => 1 - s)} variant="caption">
                            {text}
                        </Link>
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
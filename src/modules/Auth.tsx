//@ts-nocheck
import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {useForm} from "react-hook-form";
import {Checkbox, FormControlLabel} from "@mui/material";
import {Form} from "../components/Form";
import Userfront, { SignupForm } from "@userfront/toolkit/react";

Userfront.init("demo1234");

interface IFields {
    [key: number]: string[];
}



export default function Auth() {
    const [stage, setStage] = useState(0);

    const fields = {
        0: ["login", "password"],
        1: ["name", "login", "password"]
    } as IFields
    const caption = stage === 0 ? "Войти" : "Зарегистрироваться"
    const text = stage === 0 ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"

    const {
        register, handleSubmit,
    } = useForm();

    function submit(data: any) {
        console.log(data)
        // handleSubmit(d => Bridge.call(stage === 0 ? "login" : "register", {...data, ...d}).then(() =>
        //     store.dispatch(actions.setAuth(true))
        // ))();
    }

    return (<Grid container component="main" sx={{height: '70vh'}}>
        <CssBaseline/>
        <SignupForm></SignupForm>
        <Grid item xs={12} sm={8} md={5} container >
            <Box
                sx={{
                    my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Form
                    caption={caption}
                    fields={fields[stage].map((f: string) => ({name:f,value:""}))}
                    button={caption}
                    onSubmit={submit}>
                    <FormControlLabel
                        control={<Checkbox {...register("remember", {value: false})}/>
                        } label={"Запомнить меня"}/>
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
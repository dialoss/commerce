// @ts-nocheck
import {useForm} from "react-hook-form";
import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";
import {Button, capitalize, TextField} from "@mui/material";
import React, {useLayoutEffect} from "react";
import {Uploader} from "./uploader";

interface Field {
    name: string;
    value: any;
}

export interface IForm {
    caption: string;
    button?: string;
    fields: Field[];
    onSubmit?: (data: any) => any;
    children?: React.ReactElement;
}

export function Form({
                         caption, button = "Submit", fields, onSubmit = () => {
    }, children
                     }: IForm) {
    const {
        register, handleSubmit, setValue, reset
    } = useForm();
    useLayoutEffect(() => {
        reset();
    }, [fields]);
    return (
        <>
            <Typography component="h1">
                {caption}
            </Typography>
            <Box component="form" onSubmit={handleSubmit((data) => onSubmit(data))} sx={{mt: 3}}>
                {fields.map(f => getFormField(f, register, setValue))}
                {children}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {button}
                </Button>
            </Box>
        </>

    )
}

const MediaField = ({field, setValue}) => {
    const [files, setFiles] = React.useState(field.media);

    function set(files) {
        setValue("media", files);
        setFiles(files);
    }

    function select() {
        window.app.filemanager?.getFiles().then(files => {
            files = files.map(f => ({
                url: f.url,
                type: f.resource_type,
                width: f.width,
                height: f.height,
            }))
            set(files);
        });
    }

    return (
        <>
            <Button onClick={select}>Выбрать файлы</Button>
            <Uploader files={files} setFiles={set}></Uploader>
        </>
    )
}

function getFormField(field, register, setValue) {

    if (FormMap[field.name]) return React.createElement(FormMap[field.name], {setValue, field});
    else return <TextField
        required
        fullWidth
        variant="standard"
        size={'small'}
        sx={{marginBottom: 2}}
        {...register(field.name, {value: field.value})}
        label={capitalize(field.name)}
        autoFocus
    />
}

const FormMap = {
    "media": MediaField,
}

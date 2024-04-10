// @ts-nocheck
import {useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import {Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField} from "@mui/material";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {Uploader} from "./uploader";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import HTMLEditor from "../ui/HTMLEditor";

interface Field {
    name: string;
    value: any;
    autocomplete?: string;
}

export interface IForm {
    caption: string;
    button?: string;
    fields: Field[];
    onSubmit?: (data: any, e: any) => any;
    children?: React.ReactElement;
}

function InnerForm({fields, register, setValue}) {
    return (
        <>
            {fields.map(f => getFormField(f, register, setValue))}
        </>
    )
}

export function Form({
                         caption, button = "Подтвердить", fields, onSubmit = () => {
    }, children
                     }: IForm) {
    const {
        register, handleSubmit, setValue, reset
    } = useForm();

    useEffect(() => {
        reset();
        for (const f of fields) {
            setValue(f.name, f.value);
        }
    }, [fields])
    return (
        <>
            <Box component="form" onSubmit={e => {
                e.preventDefault();
                handleSubmit(data => onSubmit(data, e))(e)
            }} sx={{mt: 3}}>
                <InnerForm fields={fields} register={register} setValue={setValue}></InnerForm>
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

export function formatCloudFiles(files) {
    return files.map(f => {
        let url = f.public_id;
        let type = f.resource_type;
        let name = url.split('/').slice(-1)[0];
        if (type === "raw") {
            if (f.context && f.context.custom) {
                url = f.context.custom.model;
                type = 'model';
            } else if (['mp4', 'avi'].includes(name.split('.').slice(-1)[0].toLowerCase())) {
                type = 'video';
            } else {
                type = 'file';
            }
        }
        return {
            url,
            type,
            filename: name,
            width: f.width,
            height: f.height,
        }
    })
}

export const MediaField = ({field, setValue, simple = false}) => {
    const [files, setFiles] = React.useState([]);

    useLayoutEffect(() => {
        if (field.name === 'media') setFiles(JSON.parse(files));
        else setFiles(field.value);
    }, [field])

    function set(files) {
        if (field.name === 'media') setValue(JSON.stringify(files));
        else setValue(files);
        setFiles(files);
    }

    function setRaw(files) {
        files = formatCloudFiles(files);
        set(files);
    }

    function select() {
        if (!window.app.authAction()) return;
        if (simple) {
            window.app.filemanager?.uploadWidget().then(files => setRaw(files));
        } else {
            window.app.filemanager?.getFiles().then(files => setRaw(files));
        }
    }

    return (
        <>
            <Stack direction={'row'} alignItems={'center'}>
                <Typography>Медиа</Typography>
                <Button onClick={select}>Выбрать файлы</Button>
            </Stack>
            <Uploader files={files} setFiles={set}></Uploader>
        </>
    )
}

function getFormField(field, register, setValue) {
    if (FormMap[field.type]) return React.createElement(FormMap[field.type], {
        setValue: data => setValue(field.name, data),
        field
    });
    else return <TextField
        fullWidth
        autoComplete={field.autocomplete || ''}
        variant="standard"
        size={'small'}
        sx={{marginBottom: 2}}
        {...register(field.name, {value: field.value})}
        label={field.label || field.name}
        type={field.type}
        autoFocus
    />
}

export function SelectField({field, setValue}) {
    const [v, setV] = React.useState(field.value);
    useEffect(() => {
        setV(field.value)
    }, [field])

    return (
        <TextField
            label={field.label}
            select
            style={{width: '100%'}}
            value={v}
            onChange={e => {
                setV(e.target.value)
                setValue(e.target.value)
            }}
        >
            {
                field.choices.map(t =>
                    <MenuItem key={t} value={t}>{t}</MenuItem>
                )
            }
        </TextField>
    )
}

function CheckField({field, setValue}) {
    const [v, setV] = useState(false);
    useEffect(() => {
        setV(field.value)
    }, [field])
    return <FormGroup>
        <FormControlLabel control={<Checkbox checked={v} onChange={e => {
            setValue(e.target.checked);
            setV(e.target.checked);
        }}/>} label={field.label}/>
    </FormGroup>
}

function Editor({field, setValue}) {
    const [v, setV] = useState(field.value);
    useEffect(() => {
        setV(field.value)
    }, [field]);
    return <HTMLEditor updateValue={true} value={v} setHTML={d => {setV(d); setValue(d)}}></HTMLEditor>
}

const FormMap = {
    "boolean": CheckField,
    "media": MediaField,
    'select': SelectField,
    'bigtext': Editor,
}

// @ts-nocheck
import {useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import {Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField} from "@mui/material";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {Uploader} from "./uploader";
import MenuItem from "@mui/material/MenuItem";
import HTMLEditor from "../ui/HTMLEditor";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {getFields} from "../modules/DataForm";

interface Field {
    name: string;
    value: any;
    autocomplete?: string;
}

export interface IForm {
    button?: string;
    fields: Field[];
    onSubmit?: (data: any, e: any) => any;
    children?: React.ReactElement;
    submit?: boolean;
    onChange?: (data: any, e: any) => any;
}

let formId = 1;

export function Form({
                         button = "Подтвердить",
                         fields,
                         onSubmit = () => {
                         },
                         children,
                         style = {},
                         onChange = () => {
                         }, submit = true
                     }: IForm) {
    const {
        register, handleSubmit, setValue, reset, getValues
    } = useForm();

    useEffect(() => {
        formId++;
    }, [])

    useEffect(() => {
        reset();
        for (const f of fields) {
            setValue(f.name, f.value);
        }
    }, [fields])
    console.log(fields)
    return (
        <>
            <Box id={formId.toString()} component="form" style={style} onSubmit={e => {
                e.preventDefault();
                handleSubmit(data => onSubmit(data, e))(e)
            }} sx={{mt: 3}}>
                {fields.map(f => getFormField(f, data => {
                    setValue(f.name, data);
                    onChange(getValues());
                }))}
                {children}
                {submit && <Button
                    target={formId.toString()}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {button}
                </Button>}
            </Box>
        </>

    )
}

export function formatCloudFiles(files) {
    return files.map(f => {
        let url = f.public_id;
        let type = f.resource_type;
        let ext = url.split('.').slice(-1)[0].toLowerCase().trim();
        if (type === "raw") {
            if (f.context && f.context.custom) {
                url = f.context.custom.model;
                type = 'model';
            } else if (['mp4', 'avi'].includes(ext)) {
                type = 'video';
            } else {
                type = 'file';
            }
        }
        console.log(f)
        return {
            url,
            type,
            filename: f.original_filename + "." + ext,
            width: f.width,
            height: f.height,
            size: f.bytes,
        }
    })
}

export const MediaField = ({field, setValue, simple = false}) => {
    const [files, setFiles] = React.useState([]);

    useLayoutEffect(() => {
        if (typeof field.value === 'string') {
            setFiles(JSON.parse(field.value));
        } else setFiles(field.value);

    }, [field])

    function set(files) {
        setValue(files);
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

    console.log(files)
    return (
        <div>
            <Stack direction={'row'} alignItems={'center'}>
                <Button startIcon={<AttachFileIcon/>} onClick={select}>Прикрепить файлы</Button>
            </Stack>
            <Uploader files={files} setFiles={set}></Uploader>
        </div>
    )
}

export function getFormField(field, setValue) {
    if (FormMap[field.type]) return React.createElement(FormMap[field.type], {field, setValue});
    else return React.createElement(Text, {field, setValue});
}

export function Text({field, setValue}) {
    const [v, setV] = React.useState(field.value);
    useEffect(() => {
        setV(field.value)
    }, [field])

    return <TextField
        fullWidth
        autoComplete={field.autocomplete || ''}
        variant="standard"
        size={'small'}
        sx={{marginBottom: 2}}
        value={v}
        onChange={e => {
            setV(e.target.value)
            setValue(e.target.value)
        }}
        label={field.label || field.name}
        type={field.type}
        autoFocus
    />
}

export function SelectField({field, setValue}) {
    const [v, setV] = React.useState(field.default);
    useEffect(() => {
        setV(field.value.id || field.value)
    }, [field])

    return (
        <TextField
            label={field.label}
            select
            style={{width: '100%'}}
            value={v}
            onChange={e => {
                setV(e.target.value)
                if (field.name === 'status') window.api.apiStatusRetrieve({id: e.target.value}).then(d => setValue(d));
                else setValue(e.target.value);
            }}
        >
            {
                field.choices.map(t =>
                    <MenuItem key={t.value} value={t.value}>{t.name}</MenuItem>
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
    return <HTMLEditor updateValue={true} value={field.value} setHTML={d => setValue(d)}></HTMLEditor>
}

function InnerForm({field, setValue}) {
    const [form, setForm] = useState([]);
    useLayoutEffect(() => {
        setForm(getFields(field.name, field.value || null))
    }, [field]);
    console.log(form)
    return (
        <>
            <h5>{field.label}</h5>
            <Form submit={false} onChange={d => {
                console.log(d)
                setValue(d)
            }} fields={form}></Form>
        </>
    )
}

export const FormMap = {
    "boolean": CheckField,
    "media": MediaField,
    'select': SelectField,
    'bigtext': Editor,
    'foreignkey': InnerForm
}


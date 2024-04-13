// @ts-nocheck
import {useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import {Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField} from "@mui/material";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {Uploader} from "./uploader";
import MenuItem from "@mui/material/MenuItem";
import HTMLEditor from "../ui/HTMLEditor";
import AttachFileIcon from '@material-ui/icons/AttachFile';

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
    console.log(fields, getValues())
    return (
        <>
            <Box id={formId.toString()} component="form" style={style} onSubmit={e => {
                e.preventDefault();
                handleSubmit(data => onSubmit(data, e))(e)
            }} sx={{mt: 3}}>
                {fields.map(f => getFormField(f, data => {
                    console.log(f.name, data)
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
        let width = f.width;
        let height = f.height;
        if (type === 'model') width = height = 1;
        return {
            url,
            type,
            filename: f.original_filename + "." + ext,
            width,
            height,
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
    }, [])

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
    if (FormMap[field.type]) return React.createElement(FormMap[field.type], {key:field.name, field, setValue});
    else return React.createElement(Text, {key:field.name, field, setValue});
}

export function Text({field, setValue}) {
    const [v, setV] = React.useState('');
    useEffect(() => {
        setV(field.value)
    }, [])
    useLayoutEffect(() => {
        !!field.safeUpdate && setV(field.value)
    }, [field.value])

    return <TextField
        fullWidth
        autoComplete={field.autocomplete || ''}
        variant="standard"
        size={'small'}
        sx={{marginBottom: 2}}
        multiline
        value={v}
        onChange={e => {
            setV(e.target.value)
            setValue(e.target.value)
        }}
        label={field.label || field.name}
        type={field.type}
    />
}

export function SelectField({field, setValue}) {
    console.log(field)
    const [v, setV] = React.useState(field.value || field.default);

    function set(value) {
        setV(value)
        if (field.name === 'status') window.api.apiStatusRetrieve({id: value}).then(d => setValue(d));
        else setValue(value);
    }

    useEffect(() => {
        let v;
        if (field.defaultFunction) {
            v = window[field.defaultFunction]();
        }
        if (!v) v = field.value.id || field.value
        if (field.value !== v) set(v);
    }, [])

    return (
        <TextField
            label={field.label}
            select
            style={{width: '100%'}}
            value={v}
            onChange={e => set(e.target.value)}
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
        setForm(getFields(field.name, field.value || {inStock: true}))
    }, []);
    const [newForm, setNewForm] = useState({})
    console.log(form)
    console.log(field)
    return (
        <>
            <h5>{field.label}</h5>
            <Form submit={false} onChange={d => {
                console.log("!!!", d)
                setNewForm(d);
            }} fields={form}></Form>
            <Button onClick={() => {
                let data = {...newForm}
                if (typeof data.media !== 'string')
                    data.media = JSON.stringify(data.media)
                if (field.value === undefined) {
                    window.api.request({
                        method: "POST",
                        path: "/api/" + field.name + "/",
                        body: JSON.stringify(data),
                        headers: {
                            'content-type': "application/json"
                        }
                    }).then(r => r.json()).then(d => setValue({...d, media:JSON.parse(d.media)}));
                } else {
                    window.api.request({
                        method: "PATCH",
                        path: "/api/" + field.name + "/" + field.value.id + "/",
                        body: JSON.stringify(data),
                        headers: {
                            'content-type': "application/json"
                        }
                    }).then(r => r.json()).then(d => setValue({...d, media:JSON.parse(d.media)}));
                }
            }}>Подтвердить</Button>
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


const schema = require("../api/schema.json");

export function getFields(page, item) {
    let d = [];
    for (const p of schema[page]) {
        if (p.name) {
            let v = "";
            if (item) v = item[p.name]
            if (!v) v = p.default;
            d.push({...p, value: v})
        }
    }
    return d;
}

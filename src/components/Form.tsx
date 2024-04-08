// @ts-nocheck
import {useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import React, {useEffect} from "react";
import {Uploader} from "./uploader";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
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

    console.log(fields)
    useEffect(() => {
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
    const [files, setFiles] = React.useState(() => {
        if (field.name === 'mediaUrl') return [{url: field.value}];
        return field.value;
    });

    function set(files) {
        if (field.name === 'mediaUrl') setValue(files.length ? files[0].url : '');
        else setValue(files);
        setFiles(files);
    }

    function setRaw(files) {
        files = formatCloudFiles(files);
        set(files);
    }

    function select() {
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
        autoFocus
    />
}

function SelectField({label, setValue, fields = [], defaultValue = ""}) {
    const [v, setV] = React.useState(defaultValue);
    return (
        <TextField
            label={label}
            select
            style={{width: '100%'}}
            value={v}
            onChange={e => {
                setV(e.target.value)
                setValue(e.target.value)
            }}
        >
            {
                fields.map(t =>
                    <MenuItem key={t.name} value={t.value}>{t.name}</MenuItem>
                )
            }
        </TextField>
    )
}

const FormMap = {
    "boolean": ({field, setValue}) => <FormGroup>
        <FormControlLabel control={<Checkbox checked={field.value || false} onChange={e =>
            setValue(e.target.checked)
        }/>} label={field.label}/>
    </FormGroup>,
    "media": MediaField,
    'productType': ({field, setValue}) =>
        <SelectField defaultValue={field.value || 'Монтировка'}
                     fields={[{name: "Монтировка", value: "Монтировка"}, {name: "Чертёж", value: "Чертёж"}]}
                     setValue={setValue}
                     label={"Тип продукта"}></SelectField>,
    "status": ({field, setValue}) =>
        <SelectField defaultValue={field.value || ""}
                     fields={statuses}
                     setValue={setValue}
                     label={"Статус заказа"}></SelectField>,
}

const statuses = [
    {
        name: "Принят - Ожидает оплаты", value: 1
    },
    {
        name: "Принят - Начало изготовления", value: 3
    },
    {
        name: "Подготовка материала - Ожидание доставки", value: 4
    },
    {
        name: "Завершён", value: 2
    }
]

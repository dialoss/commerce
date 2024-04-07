// @ts-nocheck
import {useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";
import React from "react";
import {Uploader} from "./uploader";

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
    // useLayoutEffect(() => {
    //     reset();
    // }, [fields]);
    console.log(fields)
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
        if (type === "raw") {
            if (f.context && f.context.custom) {
                url = f.context.custom.model;
                type = 'model';
            } else {
                type = 'file';
            }
        }
        return {
            url,
            type,
            filename: url.split('/').slice(-1)[0],
            width: f.width,
            height: f.height,
        }
    })
}

export const MediaField = ({field, setValue, simple = false}) => {
    const [files, setFiles] = React.useState(field.value);

    function set(files) {
        setValue(field.name, files);
        setFiles(files);
    }

    function setRaw(files) {
        files = formatCloudFiles(files);
        setFiles(f => {
            let newFiles = [...f, ...files];
            setValue("media", newFiles)
            return newFiles
        });
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
            <Button onClick={select}>Выбрать файлы</Button>
            <Uploader files={files} setFiles={set}></Uploader>
        </>
    )
}

function getFormField(field, register, setValue) {
    if (FormMap[field.type]) return React.createElement(FormMap[field.type], {setValue, field});
    else return <TextField
        // required
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

const FormMap = {
    "media": MediaField,
}

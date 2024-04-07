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
                         caption, button = "Submit", fields, onSubmit = () => {
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

export const MediaField = ({field, setValue, simple = false}) => {
    const [files, setFiles] = React.useState(field.value);

    function set(files) {
        setValue("media", files);
        setFiles(files);
    }

    function setRaw(files) {
        files = files.map(f => {
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
        setFiles(f => {
            let newFiles = [...f, ...files];
            setValue("media", newFiles)
            return newFiles
        });
    }

    function select() {
        if (simple) {
            let widget = cloudinary.createUploadWidget({
                    cloudName: 'drlljn0sj',
                    uploadPreset: 'hwub8goj',
                    maxFiles: 3,
                    maxFileSize: 5000000
                }, (error, result) => {
                    if (!error && result) {
                        console.log(result)
                        if (result.event === "success") setRaw([result.info]);
                        if (result.event === "upload-added") {
                            console.log(result)
                        }
                    }
                }
            )
            widget.open();
        } else {
            window.app.filemanager?.getFiles().then(files => {
                setRaw(files)
            });
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
    if (typeof field.value === 'object') {
        console.log(field)
        // return <InnerForm
        //     fields={Object.keys(field).map(k => ({name: k, value: field[k]}))} register={register} setValue={setValue}></InnerForm>
    }
    if (FormMap[field.name]) return React.createElement(FormMap[field.name], {setValue, field});
    else return <TextField
        required
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

// @ts-nocheck

import React from 'react';
import type {CellPlugin} from '@react-page/editor';
import Editor from "@react-page/editor";
import {createGenerateClassName} from '@material-ui/core/styles';
import '@react-page/editor/lib/index.css'
import {connectField} from 'uniforms';
import HTMLEditor from "../ui/HTMLEditor";
import Typography from "@mui/joy/Typography";
import {scaleImage} from "../components/CardImage";
import MuiInput from '@mui/material/Input';
import {Button, TextField} from "@mui/material";

import Viewer from "../components/Model/Viewer";
import background, {ModeEnum} from "@react-page/plugins-background";
import {MediaField} from "../components/Form";
import {useAppSelector} from "../store/redux";
import {api} from "../index";
import {Slider} from "@mui/material";
import store from "../store";

const generateClassName = createGenerateClassName({
    disableGlobal: true,
    seed: 'mui-jss',
});

type EditorData = {
    html: string;
}

const textPlugin: CellPlugin<EditorData> = {
    Renderer: ({data}) => (
        <div style={{minHeight: 20, padding: 10}} dangerouslySetInnerHTML={{__html: data.html}}>
        </div>
    ),
    id: 'textPlugin',
    title: 'Редактор текста',
    description: '',
    version: 1,
    controls: {
        type: 'autoform',
        schema: {
            properties: {
                html: {
                    type: 'string',
                    uniforms: {
                        component: connectField(({value, onChange}) => {
                            return <HTMLEditor value={value} setHTML={onChange}></HTMLEditor>
                        }),
                    },
                },
            },
            required: ['html'],
        },
    },
};

const spacerPlugin: CellPlugin = {
    Renderer: ({data}) => (
        <div style={{minHeight: data.height}}>
        </div>
    ),
    id: 'spacerPlugin',
    title: 'Добавляет пространство',
    description: '',
    version: 1,
    controls: {
        type: 'autoform',
        schema: {
            properties: {
                height: {
                    type: 'number',
                    uniforms: {
                        component: connectField(({value, onChange}) => {
                            const [v, setValue] = React.useState(30);
                            function change(v) {
                                setValue(v);
                                onChange(v)
                            }

                            return <div>Высота: {v}px <Slider
                                value={v}
                                max={500}
                                onChange={(e, n) => change(n)}
                            />
                                <TextField
                                    value={v}
                                    label={"Высота"}
                                    onChange={e => change(+e.target.value)}
                                    type={'number'}
                                /></div>
                        }),
                        default: 30,
                    },
                },
            },
            required: ['height'],
        },
    },
};

type MediaData = {
    title: string;
    text: string;
}


const mediaPlugin: CellPlugin<MediaData> = {
    Renderer: ({data}) => (
        <div style={{minHeight: 50, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            {data.files && data.files[0] &&
                <>{
                    data.files[0].type === 'image' ?
                        <div style={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            padding: 4,
                            maxHeight: '80vh',
                            width: data.width ? '100%' : 'auto'
                        }}>
                            <img onClick={() => {
                                window.app.images.open({
                                    images: [scaleImage(data.files[0].url, 2)],
                                    start: 0,
                                    id:1
                                })
                            }}
                                style={{width: '100%', height: '100%', borderRadius: 5, boxShadow: data.border ? '0 0 2px 0 grey' : ''}}
                                 src={scaleImage(data.files[0].url, 0, data.quality)} alt=""/>
                        </div> :
                        <div className={'h-[400px] w-100'}>
                            <Viewer data={{
                                show_ui: true,
                                urn: data.files[0].url,
                                id: 1,
                                rotation: true
                            }}></Viewer>
                        </div>
                }
                </>
            }
            {/*<CardImage carousel={true} id={data.id} url={data.url}></CardImage>*/}
            {!!data.title && <Typography level="title-lg">{data.title}</Typography>}
            <Typography sx={{
                flexGrow: 1,
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center'
            }}
                        level={'body-md'}>{data.text}</Typography>
        </div>
    ),
    id: 'mediaPlugin',
    title: 'Медиа',
    description: 'Изображения/видео/3D модели',
    version: 1,
    controls: {
        type: 'autoform',
        schema: {
            properties: {
                files: {
                    uniforms: {
                        component: connectField(({value, onChange}) =>
                            <MediaField field={{value}} setValue={(_, files) => onChange(files)}></MediaField>
                        ),
                    },
                    default: [],
                },
                title: {
                    type: 'string',
                    default: '',
                },
                text: {
                    type: 'string',
                    default: '',
                },
                width: {
                    type: 'boolean',
                    default: false,
                },
                border: {
                    type: 'boolean',
                    default: true,
                },
                quality: {
                    type: 'number',
                    default: 400,
                },
            },
            required: ['files'],
        },
    },
};

const cellPlugins = [mediaPlugin, spacerPlugin, textPlugin, background({
    enabledModes:
        ModeEnum.COLOR_MODE_FLAG |
        ModeEnum.IMAGE_MODE_FLAG |
        ModeEnum.GRADIENT_MODE_FLAG,
}),];

let updates = 0;

const PageEditor = ({id, data}: { id: number; data: object }) => {
    const [value, setValue] = React.useState(data);
    const editor = useAppSelector(state => state.app.editor);

    // window.x = d => useRemoveCell(d);
    function update(data) {
        updates++;
        if (updates % 10 === 0) api.apiProductUpdate({id, product: {page: JSON.stringify(data)}})
        setValue(data);
    }

    React.useEffect(() => {
        window.addEventListener("keydown", e => {
            if (e.key === "Delete") {
                remove(focused)
            }
        })
    }, [])

    console.log(value)

    return (
        <Editor readOnly={!editor} cellPlugins={cellPlugins} value={value} onChange={update}/>
    );
};

export default PageEditor;
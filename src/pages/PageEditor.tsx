// @ts-nocheck

import React, {useEffect} from 'react';
import type {CellPlugin} from '@react-page/editor';
import Editor, {createValue} from "@react-page/editor";
import '@react-page/editor/lib/index.css'
import {connectField} from 'uniforms';
import {Button, Slider, TextField, Typography} from "@mui/material";
import background, {ModeEnum} from "@react-page/plugins-background";
import {getFormField, MediaField} from "../components/Form";
import {useAppSelector} from "../store/redux";
import MenuItem from "@mui/material/MenuItem";
import Pay from "../components/Pay";
import {BusinessLogic} from "../modules/BusinessLogic";
import {MediaItem} from "../components/MediaItems";
import ReactDOM from "react-dom/client";
import ProductCard from "../components/ProductCard";
import store from "../store";
import {actions} from "../store/app";
import ShopCard from "../components/ShopCard";
import OrderCard from "../components/OrderCard";
import MediaCard, {openImages} from "../components/MediaCard";
import HTMLEditor from "../ui/HTMLEditor";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@mui/material/IconButton";

type EditorData = {
    html: string;
}

const buttonPlugin: CellPlugin<EditorData> = {
    Renderer: ({data}) => (
        <>
            {data.type === "buy" && <Pay product={store.getState().app?.pageData}></Pay>}
            {data.type === "order" &&
                <Button style={{margin: 'auto', padding:10}} variant={'contained'} onClick={() => BusinessLogic.order()}>
                    заказать изготовление
                </Button>
            }
        </>
    ),
    id: 'buttonPlugin',
    title: 'Кнопка',
    description: 'Цена/заказ/действие',
    version: 1,
    controls: {
        type: 'autoform',
        columnCount: 1,
        schema: {
            properties: {
                type: {
                    type: 'string',
                    uniforms: {
                        component: connectField(({value, onChange}) =>
                            <TextField
                                label="Тип"
                                select
                                style={{width: 200}}
                                onChange={e => onChange(e.target.value)}
                            >
                                {
                                    [{n: "Покупка", t: 'buy'}, {n: "Заказ", t: 'order'}].map(f =>
                                        <MenuItem key={f.n} value={f.t}>{f.n}</MenuItem>
                                    )
                                }
                            </TextField>
                        )
                    },
                    default: "order"
                },
            },
        },
    },
};


const textPlugin: CellPlugin<EditorData> = {
    Renderer: ({data}) => (
        <div style={{minHeight: 20, padding: 10}}>
            {data.showDate && <p style={{fontWeight: 600}}>{window.formatDate(+data.date)}</p>}
            <div dangerouslySetInnerHTML={{__html: data.html}}></div>
        </div>
    ),
    id: 'textPlugin',
    title: 'Текст',
    description: '',
    version: 1,
    controls: {
        type: 'autoform',
        columnCount: 1,
        schema: {
            properties: {
                html: {
                    type: 'string',
                    uniforms: {
                        component: connectField(({value, onChange}) =>
                            <HTMLEditor value={value} setHTML={onChange}></HTMLEditor>
                        )
                    },
                },
                showDate: {
                    type: 'boolean',
                    uniforms: {
                        component: connectField(({value, onChange}) =>
                            getFormField({
                                type: "boolean",
                                name: 'date',
                                label: "Дата создания",
                                value,
                            }, onChange)
                        )
                    },
                    default: false,
                },
                date: {
                    type: "string",
                    uniforms: {
                        component: connectField(({value, onChange}) => {
                            if (value) return <></>;
                            onChange(new Date().getTime().toString());
                            return <></>;
                        })
                    },
                    default: ""
                }
            },
            required: ['html'],
        },
    },
};

function SliderField({onChange, label, min, max, defaultValue, number = true}) {
    const [v, setValue] = React.useState(defaultValue);

    function change(v) {
        setValue(v);
        if (!number) v = v.toString();
        else if (typeof v !== 'number') v = +v;
        onChange(v)
    }

    return <div style={{paddingRight: 30}}>{label}: {v} <Slider
        value={v}
        max={max}
        min={min}
        onChange={(e, n) => change(n)}
    />
        <TextField
            value={v}
            label={label}
            onChange={e => change(e.target.value)}
            type={'number'}
        /></div>
}

const spacerPlugin: CellPlugin = {
    Renderer: ({data}) => (
        <div style={{minHeight: data.height || 30}}>
        </div>
    ),
    id: 'spacerPlugin',
    title: 'Разделитель',
    description: "Добавляет пространство между блоками",
    version: 1,
    controls: {
        type: 'autoform',
        schema: {
            properties: {
                height: {
                    type: 'number',
                    uniforms: {
                        component: connectField(({value, onChange}) =>
                            <SliderField onChange={onChange} label={'Высота'} max={500} min={30}
                                         defaultValue={30}></SliderField>),
                    },
                    default: 30,
                },
            },
            required: ['height'],
        },
    },
};

type MediaData = {
    mediaTitle: string;
    mediaText: string;
}


function pluginGenerator(fields, title, id, render) {
    let props = {};
    for (const f of fields) {
        if (!f.type) continue;
        if (f.name === 'productType') {
            f.defaultFunction = 'getTab'
        }
        props[f.name] = {
            default: f.default,
            uniforms: {
                component: connectField(({value, onChange}) => getFormField({...f, value}, onChange))
            }
        }
    }
    return {
        Renderer: ({data}) => (
            <>{Object.values(data).length > 0 && React.createElement(render, {data})}</>
        ),
        id: id + "plugin",
        title: <p className={"plugin-item " + id}>{title}</p>,
        description: "",
        version: 1,
        controls: {
            type: 'autoform',
            schema: {
                properties: {
                    ...props,
                    viewId: {
                        uniforms: {
                            component: connectField(({value, onChange}) => <></>),
                        },
                    },
                }
            },
        },
    }
}

function getMediaCallback(data) {
    if (data.media[0].type !== 'image') return
    return openImages(data.media[0], [data.media[0]])
    // if (data.media[0].type === 'image')
    //
}

const fields = [
    {name:'media',type:'media',label:'Медиа',default:[]},
    {name:'mediaTitle',type:'text',label:'Медиа заголовок',default:''},
    {name:'mediaText',type:'text',label:'Медиа текст'},
    {name:'border',type:'boolean',label:'Показывать рамку',default:true},
    {name:'quality',type:'number',label:'Качество картинки (в пикселях)',default:800},
]

let props = {};
for (const f of fields) {
    props[f.name] = {
        default: f.default,
        uniforms: {
            component: connectField(({value, onChange}) => getFormField({...f, value}, onChange))
        }
    }
}

const mediaPlugin: CellPlugin<MediaData> = {
    Renderer: ({data}) => (
        <div style={{minHeight: 50, height:'100%'}}>
            {data.media && data.media[0] &&
                <MediaItem
                    callback={getMediaCallback(data)}
                    data={{...data, ...data.media[0]}}></MediaItem>}
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
                ...props,
                rotation: {
                    type: 'boolean',
                    uniforms: {
                        component: connectField(({value, onChange}) =>
                            getFormField({name: 'rotation', label: "Вращать модель", value, type: 'boolean'}, onChange)
                        ),
                        showIf: (data) => data.media && !!data.media[0] && data.media[0].type === "model",
                    },
                    default: false,
                },
                customWidth: {
                    type: 'string',
                    uniforms: {
                        component: connectField(({value, onChange}) =>
                            <SliderField onChange={onChange} label={'Ширина'} max={100} min={10}
                                         defaultValue={value}
                                         number={false}></SliderField>
                        ),
                    },
                    default: '100',
                },
                viewId: {
                    uniforms: {
                        component: connectField(({value, onChange}) => {
                                if (value) return <></>
                                onChange(new Date().getTime());
                                return <></>
                            }
                        ),
                    },
                },
            },
            required: ['media'],
        },
    },
};

const introPlugin: CellPlugin = {
    Renderer: ({data}) => (
        <div style={{minHeight: data.height || 30}}>
        </div>
    ),
    id: 'introPlugin',
    title: 'Шапка',
    description: <div>Шаблон шапки продукта
        <div onClick={e => {
            e.stopPropagation();
            window.templateIntro(store.getState().app?.pageData)
        }} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}}></div>
    </div>,
    version: 1,
    controls: {
        type: 'autoform',
        schema: {},
    },
};
const schema = require("../api/schema.json");

const plugins = {
    'product': pluginGenerator(schema.product, "Продукт", "product", ProductCard),
    'order': pluginGenerator(schema.order, "Заказ", "order", OrderCard),
    'shop': pluginGenerator(schema.shop, "Продажа", "shop", ShopCard),
    'gallery': pluginGenerator(schema.gallery, "Галерея", "gallery", MediaCard),
}
const cellPlugins = [...Object.values(plugins), introPlugin, buttonPlugin, mediaPlugin, spacerPlugin, textPlugin, background({
    enabledModes:
        ModeEnum.COLOR_MODE_FLAG |
        ModeEnum.IMAGE_MODE_FLAG |
        ModeEnum.GRADIENT_MODE_FLAG,
}),];

function escape(el) {
    for (const k of ["keydown", "keypress", 'keyup']) {
        el.dispatchEvent(
            new KeyboardEvent(k, {
                altKey: false,
                code: "Escape",
                ctrlKey: false,
                isComposing: false,
                key: "Escape",
                location: 0,
                metaKey: false,
                repeat: false,
                shiftKey: false,
                which: 27,
                bubbles: true,
                cancelable: true,
                target: el,
                charCode: 0,
                keyCode: 27,
            }));
    }
}

export const myCellPlugins = cellPlugins.map<CellPlugin<Styling>>((plugin) => {
    if (!plugin.controls.schema) return plugin;
    plugin.controls.schema.properties = {
        ...plugin.controls.schema.properties,
        closeWindow: {
            type: "string",
            uniforms: {
                component: connectField(({value, onChange}) => <IconButton size={'small'}
                                                                           style={{
                                                                               color: "#000",
                                                                               position: 'fixed',
                                                                               zIndex: 1000,
                                                                               top: 10,
                                                                               right: 10
                                                                           }} onClick={() => {
                        let t = document.querySelector(".react-page-cell-focused");
                        escape(t);
                    }}><CloseIcon style={{fontSize: 40}}></CloseIcon></IconButton>
                    // <Button startIcon={<CloseIcon></CloseIcon>} className={'my-btn-close'} style={{position: 'fixed', zIndex: 1000, top: 10, right: 10}}
                    //         onClick={() => {
                    //             let t = document.querySelector(".react-page-cell-focused");
                    //             escape(t);
                    //         }}>Закрыть</Button>
                ),
            },
        }
    }
    return plugin;
});

export const PageEditor = ({id, data, endpoint}: { id: number; data: object; endpoint: string }) => {
    const [value, setValue] = React.useState(data);

    return (
        <>
            <Editor
                readOnly={true}
                cellPlugins={myCellPlugins}
                value={value} onChange={v => setValue(v)}/>
            {(!value.rows || !value.rows.length) && <Typography textAlign={'center'}>Нет записей</Typography>}
        </>
    );
};

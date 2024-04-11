// @ts-nocheck

import React from 'react';
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
import MediaCard from "../components/MediaCard";
import HTMLEditor from "../ui/HTMLEditor";

type EditorData = {
    html: string;
}

const buttonPlugin: CellPlugin<EditorData> = {
    Renderer: ({data}) => (
        <>
            {data.type === "buy" && <Pay product={store.getState().app?.selected}></Pay>}
            {data.type === "order" && <Button style={{margin:'auto'}} variant={'contained'} onClick={() => BusinessLogic.order()}>
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
        props[f.name] = {
            default: f.default,
            uniforms: {
                component: connectField(({value, onChange}) => getFormField({...f, value}, onChange))
            }
        }
    }
    return {
        Renderer: ({data}) => (
            React.createElement(render, {data})
        ),
        id: id + "plugin",
        title: title,
        description: "",
        version: 1,
        controls: {
            type: 'autoform',
            schema: {
                properties: {
                    ...props,
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
                }
            },
        },
    }
}

const mediaPlugin: CellPlugin<MediaData> = {
    Renderer: ({data}) => (
        <div style={{minHeight: 50}}>
            <MediaItem data={{...data, ...data.media[0]}}></MediaItem>
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
                media: {
                    uniforms: {
                        component: connectField(({value, onChange}) =>
                            <MediaField field={{value}} setValue={files => onChange(files)}></MediaField>
                        ),
                    },
                    default: [],
                },
                mediaTitle: {
                    type: 'string',
                    default: '',
                },
                mediaText: {
                    type: 'string',
                    default: '',
                },
                width: {
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

                border: {
                    type: 'boolean',
                    default: true,
                },
                quality: {
                    type: 'number',
                    default: 800,
                },
            },
            required: ['media'],
        },
    },
};
const schema = require("../api/schema.json");

const plugins = {
    'product': pluginGenerator(schema.product, "Продукт", "product", ProductCard),
    'order': pluginGenerator(schema.order, "Заказ", "order", OrderCard),
    'shop': pluginGenerator(schema.shop, "Магазин", "shop", ShopCard),
    'gallery': pluginGenerator(schema.gallery, "Галерея", "gallery", MediaCard),
}
console.log(plugins)
const cellPlugins = [...Object.values(plugins), buttonPlugin, mediaPlugin, spacerPlugin, textPlugin, background({
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
                component: connectField(({value, onChange}) =>
                    <Button style={{position: 'fixed', zIndex: 1000, bottom: 10, left: 10}}
                            onClick={() => {
                                let t = document.querySelector(".react-page-cell-focused");
                                escape(t);
                            }}>Закрыть</Button>
                ),
            },
        }
    }
    return plugin;
});

let initItems = [];

export const PageEditor = ({id, data, endpoint}: { id: number; data: object; endpoint: string }) => {
    const [value, setValue] = React.useState(data);
    // const editor = useAppSelector(state => state.app.editor);

    function submit() {
        window.api.request({
            path: `/api/${endpoint}/${id}/`,
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: {page: JSON.stringify(value)}
        })
    }

    // useInitCallbacks(editor)
    //
    // window.app.editor = {
    //     insert: files => {
    //         setValue(value => ({
    //             ...value, rows: [...value.rows, templateFiles(files)]
    //         }))
    //     }
    // }
    return (
        <>
            {/*{editor && <Button onClick={submit}>Сохранить изменения</Button>}*/}
            <Editor
                readOnly={true}
                cellPlugins={myCellPlugins}
                value={value} onChange={v => setValue(v)}/>
            {(!value.rows || !value.rows.length) && <Typography textAlign={'center'}>Нет записей</Typography>}
        </>
    );
};

function useInitCallbacks(editor) {
    React.useEffect(() => {
        function removeBlock(e) {
            if (e.key === "Delete") {
                let a = document.querySelector(".MuiButtonBase-root.css-1gws2xf-MuiButtonBase-root-MuiIconButton-root");
                a && a.click();
            }
        }

        window.addEventListener("keydown", removeBlock)

        const int = setInterval(() => {
            let el = document.querySelector(".react-page-toolbar-draggable")
            if (el) {
                const drawer = el.closest(".MuiPaper-root");
                const rootElement = document.createElement('div');
                const root = ReactDOM.createRoot(rootElement);
                root.render(<Button style={{position: 'fixed', zIndex: 1000, bottom: 10, left: 10}}
                                    onClick={() => escape(document.body)}>Закрыть</Button>);
                drawer.appendChild(rootElement)
                clearInterval(int)
            }
        }, 1000);
        return () => window.removeEventListener("keydown", removeBlock)

    }, [editor])
}


export const ItemsEditor = ({items, endpoint}: { items: object[]; endpoint: string }) => {
    const [value, setValue] = React.useState({rows: items});
    React.useEffect(() => {
        initItems = items;
        let data = {
            rows: initItems.map(it => [{
                plugin: plugins[endpoint].id, data: {...it, media: JSON.parse(it.media)}
            }])
        };
        const value = createValue(data, {cellPlugins: myCellPlugins, lang: 'default'});
        setValue(value);
    }, [items]);
    const editor = useAppSelector(state => state.app.editor);

    function update(newData) {
        setValue(newData);
    }

    console.log(value)
    useInitCallbacks(editor);

    function submit() {
        let values = [];
        for (const newIt of value.rows) {
            values.push({...findValue(newIt, 'default')});
        }
        for (const it of initItems) {
            let found = false;
            for (const v of values) {
                if (v.viewId === it.viewId) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                window.api.request({
                    path: `/api/${endpoint}/${it.id}/`,
                    method: 'DELETE'
                })
                initItems = initItems.splice(initItems.findIndex(it_ => it_.viewId === it.viewId), 1);
            }
        }
        for (const it of values) {
            let data = {...it}
            data.media = JSON.stringify(data.media)
            const id = findItemId(data.viewId)
            if (id !== -1) {
                window.api.request({
                    path: `/api/${endpoint}/${id}/`,
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: data
                })
            } else {
                window.api.request({
                    path: `/api/${endpoint}/`,
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: data
                })
                initItems.push(data)
            }
        }
        window.api.request({
            path: `/reorder/`,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {endpoint, order: values.map(v => v.viewId)}
        })
    }

    return (
        <>
            {editor && <Button onClick={submit}>Сохранить изменения</Button>}
            <Editor
                readOnly={!editor}
                cellPlugins={myCellPlugins}
                value={value} onChange={update}/>
            {!value.rows.length && <Typography textAlign={'center'}>Нет записей</Typography>}
        </>
    );
};

function findValue(object, key) {
    let value;
    Object.keys(object).some(function (k) {
        if (k === key) {
            value = object[k];
            return true;
        }
        if (object[k] && typeof object[k] === 'object') {
            value = findValue(object[k], key);
            return value !== undefined;
        }
    });
    return value;
}

function findItemId(id) {
    for (const it of initItems) {
        if (it.viewId === id) return it.id;
    }
    return -1;
}

export default PageEditor;

function templateFiles(files) {
    let x = new Date().getTime();
    let items = [];
    for (const f of files) {
        items.push({
            "id": x++,
            "size": 12 / files.length,
            "plugin": {
                "id": "mediaPlugin",
                "version": 1
            },
            "dataI18n": {
                "default": {
                    "files": [f],
                    "mediaTitle": "",
                    "mediaText": "",
                    "width": 100,
                    "border": true,
                    "quality": 800
                }
            },
            "rows": [],
            "inline": null
        })
    }
    return {
        "id": x++,
        "cells": items,
    }
}


// window.addEventListener("keydown", e => {
//     if (e.altKey && e.ctrlKey && e.code === 'KeyE') {
//         store.dispatch(actions.setEditor());
//     }
// })
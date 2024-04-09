// @ts-nocheck

import React, {useEffect} from 'react';
import type {CellPlugin} from '@react-page/editor';
import Editor from "@react-page/editor";
import {createGenerateClassName} from '@material-ui/core/styles';
import '@react-page/editor/lib/index.css'
import {connectField} from 'uniforms';
import HTMLEditor from "../ui/HTMLEditor";
import {Button, Checkbox, FormControlLabel, FormGroup, Slider, TextField, Typography} from "@mui/material";
import background, {ModeEnum} from "@react-page/plugins-background";
import {MediaField, SelectField} from "../components/Form";
import {useAppSelector} from "../store/redux";
import MenuItem from "@mui/material/MenuItem";
import Pay from "../components/Pay";
import {BusinessLogic} from "../modules/BusinessLogic";
import {MediaItem} from "../components/MediaItems";
import ReactDOM from "react-dom/client";
import ProductCard from "../components/ProductCard";
import {Product} from "../api";
import store from "../store";
import {actions} from "../store/app";

const generateClassName = createGenerateClassName({
    disableGlobal: true,
    seed: 'mui-jss',
});

type EditorData = {
    html: string;
}

const buttonPlugin: CellPlugin<EditorData> = {
    Renderer: ({data}) => (
        <>
            {data.type === "buy" && <Pay product={{}} text={"Купить"}></Pay>}
            {data.type === "order" && <Button variant={'contained'} onClick={() => BusinessLogic.order()}>
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
                // text: {
                //     type: 'string',
                //     default: ""
                // },
                // action: {
                //     type: 'string',
                //     uniforms: {
                //         component: connectField(({value, onChange}) => {
                //             const [v, setV] = React.useState(value);
                //             return <div><TextField
                //                 label="Действие"
                //                 onChange={e => setV(e.target.value)}
                //             >
                //             </TextField><Button onClick={() => onChange(v)}>OK</Button></div>
                //         })
                //     }
                // },
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
            {data.date && <p style={{fontWeight: 600}}>{window.formatDate(+data.date)}</p>}
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
                        component: connectField(({value, onChange}) => {
                            return <HTMLEditor value={value} setHTML={onChange}></HTMLEditor>
                        }),
                    },
                },
                date: {
                    type: "string",
                    uniforms: {
                        component: connectField(({value, onChange}) => {
                            return <FormGroup>
                                <FormControlLabel control={<Checkbox onChange={e =>
                                    onChange(e.target.checked ? new Date().getTime().toString() : "")
                                }/>} label="Дата создания"/>
                            </FormGroup>
                        }),
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

const productPlugin: CellPlugin<Product> = {
    Renderer: ({data}) => (
            <ProductCard data={data}></ProductCard>
    ),
    id: 'productPlugin',
    title: 'Продукт',
    description: "",
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
                model: {
                    type: 'string',
                    default: '',
                },
                summary: {
                    type: 'string',
                    default: '',
                },
                price: {
                    type: 'number',
                    default: 0,
                },
                productType: {
                    uniforms: {
                        component: connectField(({value, onChange}) =>
                            <SelectField field={{
                                value, "choices": [
                                    "Монтировка",
                                    "Чертёж"
                                ], label: "Тип продукта"
                            }} setValue={onChange}></SelectField>
                        ),
                    },
                    type: 'string',
                    default: "Монтировка"
                }

            },
            required: [],
        },
    },
};

const mediaPlugin: CellPlugin<MediaData> = {
    Renderer: ({data}) => (
        <div style={{minHeight: 50, display: 'flex', justifyContent: 'center'}}>
            <MediaItem data={data}></MediaItem>
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
                title: {
                    type: 'string',
                    default: '',
                },
                text: {
                    type: 'string',
                    default: '',
                },
                width: {
                    type: 'string',
                    uniforms: {
                        component: connectField(({value, onChange}) =>
                            <SliderField onChange={onChange} label={'Ширина'} max={100} min={10} defaultValue={value}
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

const cellPlugins = [productPlugin, buttonPlugin, mediaPlugin, spacerPlugin, textPlugin, background({
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

const myCellPlugins = cellPlugins.map<CellPlugin<Styling>>((plugin) => {
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

let updates = 0;

let initItems = [];

function findVal(object, key) {
    let value;
    Object.keys(object).some(function (k) {
        if (k === key) {
            value = object[k];
            return true;
        }
        if (object[k] && typeof object[k] === 'object') {
            value = findVal(object[k], key);
            return value !== undefined;
        }
    });
    return value;
}

const f = ['media', 'price', 'model', 'summary'];

function equals(a, b) {
    for (const i of f) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export const PageEditor = ({id, data, endpoint}: { id: number; data: object; endpoint: string }) => {
    const [value, setValue] = React.useState(data);
    const editor = useAppSelector(state => state.app.editor);

    function update(data) {
        updates++;
        window.api.request({
            path: `/api/${endpoint}/${id}/`,
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: {page: JSON.stringify(data)}
        })
        setValue(data);
    }

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
    window.app.editor = {
        insert: files => {
            setValue(value => ({
                ...value, rows: [...value.rows, templateFiles(files)]
            }))
        }
    }

    console.log(value)
    return (
        <Editor readOnly={!editor} cellPlugins={cellPlugins} value={value} onChange={update}/>
    );
};

function index(el) {
    let children = el.parentNode.childNodes;
    for (let i = 0; i < children.length; i++) {
        if (children[i] == el) {
            return i;
        }
    }
    return -1;
}

export const ItemsEditor = ({items, endpoint}: { items: object[]; endpoint: string }) => {
    const [value, setValue] = React.useState({rows: items});
    useEffect(() => {
        initItems = items;
        const data = {
            rows: items.map((it, i) => ({id: (i + 5).toString(), cells: [{
                    "id": it.viewId,
                    "size": 12,
                    "plugin": {"id": "productPlugin", "version": 1},
                    "rows": [],
                    "dataI18n": {"default": JSON.parse(it.view)}
                }]})),
            version: 1,
            id: "1"
        };
        setValue(data);
    }, [items]);
    const editor = useAppSelector(state => state.app.editor);

    function update(newData) {
        updates++;
        const items = newData.rows;

        // const el = document.querySelector(".react-page-cell-focused").closest('.react-page-row-droppable-container');
        // console.log(el)
        // console.log(newData)
        // const i = index(el);
        // if (i === -1) return;
        // const it = items[i];
        // let d = findVal(it, 'default');
        // if (!d) return;
        // d = {...d};
        // d.media = JSON.stringify(d.media);
        // d.view = JSON.stringify(it);
        // console.log(initItems[i], it)
        // if (!equals(initItems[i], it)) {
        //     window.api.request({
        //         path: `/api/${endpoint}/${initItems[i].id}/`,
        //         method: 'PUT',
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: d
        //     })
        // }
        // for (const it of initItems) {
        //     let found = false;
        //     for (const newIt of items) {
        //         if (newIt.id === it.viewId) {
        //             found = true;
        //             break;
        //         }
        //     }
        //     if (found) {
        //         if (!equals(initItems[i], it)) {
        //             window.api.request({
        //                 path: `/api/${endpoint}/${c}/`,
        //                 method: 'PUT',
        //                 headers: {
        //                     "Content-Type": "application/json"
        //                 },
        //                 body: d
        //             })
        //         }
        //     }
        //     else {
        //         window.api.request({
        //             path: `/api/${endpoint}/${it.id}/`,
        //             method: 'DELETE'
        //         })
        //     }
        // }

        // initItems = [...items]
        setValue(newData);
    }

    //
    // React.useEffect(() => {
    //     function removeBlock(e) {
    //         if (e.key === "Delete") {
    //             let a = document.querySelector(".MuiButtonBase-root.css-1gws2xf-MuiButtonBase-root-MuiIconButton-root");
    //             a && a.click();
    //         }
    //     }
    //
    //     window.addEventListener("keydown", removeBlock)
    //
    //     const int = setInterval(() => {
    //         let el = document.querySelector(".react-page-toolbar-draggable")
    //         if (el) {
    //             const drawer = el.closest(".MuiPaper-root");
    //             const rootElement = document.createElement('div');
    //             const root = ReactDOM.createRoot(rootElement);
    //             root.render(<Button style={{position: 'fixed', zIndex: 1000, bottom: 10, left: 10}}
    //                                 onClick={() => escape(document.body)}>Закрыть</Button>);
    //             drawer.appendChild(rootElement)
    //             clearInterval(int)
    //         }
    //     }, 1000);
    //     return () => window.removeEventListener("keydown", removeBlock)
    //
    // }, [editor])

    window.app.editor = {
        insert: files => {
            setValue(value => ({
                ...value, rows: [...value.rows, templateFiles(files)]
            }))
        }
    }
    // const focused = useAllFocusedNodeIds();
    // console.log(focused)
    // console.log(value)

    const loggerMiddleware = (store) => (next) => (action) => {
        console.log("action", action);
        switch (action.type) {
            case "CELL_INSERT_AT_END":
                window.api.request({
                    path: `/api/${endpoint}/`,
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: {viewId: action.ids.item, view: JSON.stringify({...action.item, id: action.ids.item})}
                })
                break;
            case "CELL_REMOVE":
                for (const id of action.ids) {
                    let itemId = findItemId(id);
                    if (itemId !== -1)
                        window.api.request({
                            path: `/api/${endpoint}/${itemId}/`,
                            method: 'DELETE'
                        })
                }
                break;
            case "CELL_UPDATE_DATA":
                let itemId = findItemId(action.id);
                console.log(itemId)
                if (itemId === -1) break;
                let data = {...action.data, id: action.id};
                console.log(data)
                data.view = JSON.stringify({...data, dataI18n: {default: {...data}}});

                data.media = JSON.stringify(data.media)
                window.api.request({
                    path: `/api/${endpoint}/${itemId}/`,
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: data
                })
                break;
        }

        next(action);
    };
    console.log(value)
    window.x = setValue
    return (
        <>
            <Editor
                middleware={[loggerMiddleware]}
                readOnly={!editor}
                cellPlugins={myCellPlugins}
                value={value} onChange={update}/>
            {!value.rows.length && <Typography textAlign={'center'}>Нет записей</Typography>}
        </>
    );
};

function findItemId(viewId) {
    for (const it of initItems) {
        if (it.viewId === viewId) return it.id;
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
                    "title": "",
                    "text": "",
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

window.addEventListener("keydown", e => {
    if (e.altKey && e.ctrlKey && e.code === 'KeyE') {
        store.dispatch(actions.setEditor());
    }
})
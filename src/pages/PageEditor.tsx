// @ts-nocheck

import React from 'react';
import type {CellPlugin} from '@react-page/editor';
import Editor from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import spacer from '@react-page/plugins-spacer';
import image from '@react-page/plugins-image';
import {createGenerateClassName} from '@material-ui/core/styles';
import '@react-page/editor/lib/index.css'
import Viewer from "../components/Model/Viewer";
import {api} from "../index";
import Button from "@mui/material/Button";
import { connectField } from 'uniforms';
import {MediaField} from "../components/Form";
import HTMLEditor from "../ui/HTMLEditor";

const generateClassName = createGenerateClassName({
    disableGlobal: true,
    seed: 'mui-jss',
});

type Data = {
    title: string
}

const modelPlugin: CellPlugin<Data> = {
    Renderer: ({data}) => (
        <div className={'h-[400px]'}>
            <Viewer data={{
                show_ui: true,
                urn: data.model,
                id: 1,
                rotation: true
            }}></Viewer>
        </div>
    ),
    id: 'modelPlugin',
    title: '3D model',
    description: '',
    version: 1,
    controls: {
        type: 'autoform',
        schema: {
            properties: {
                model: {
                    type: 'string',
                    uniforms: {
                        component: connectField(({ value, onChange }) => {
                            console.log(value)
                            return <MediaField field={{media: []}} setValue={(_, files) => onChange(files[0].url)}></MediaField>
                        }),
                    },
                },
            },
            required: ['model'],
        },
    },
    cellPlugins: [slate, image],
};

const textPlugin: CellPlugin<Data> = {
    Renderer: ({data}) => (
        <div style={{minHeight:20}} dangerouslySetInnerHTML={{__html: data.html}}>
        </div>
    ),
    id: 'textPlugin',
    title: 'Text editor',
    description: '',
    version: 1,
    controls: {
        type: 'autoform',
        schema: {
            properties: {
                html: {
                    type: 'string',
                    uniforms: {
                        component: connectField(({ value, onChange }) => {
                            return <HTMLEditor setHTML={onChange}></HTMLEditor>
                        }),
                    },
                },
            },
            required: ['html'],
        },
    },
};


const cellPlugins = [slate, image, modelPlugin, spacer, textPlugin];


const PageEditor = ({id, data}: { id: number; data: object }) => {
    const [value, setValue] = React.useState(data);

    function update(data) {
        setValue(data);
        api.apiProductUpdate({id, product: {page: JSON.stringify(data)}})
    }

    return (
        <Editor readOnly={false} cellPlugins={cellPlugins} value={value} onChange={update}/>
    );
};

export default PageEditor;
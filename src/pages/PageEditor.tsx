// @ts-nocheck

import React from 'react';
import type {CellPlugin} from '@react-page/editor';
import Editor from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import {createGenerateClassName} from '@material-ui/core/styles';
import '@react-page/editor/lib/index.css'
import Viewer from "../components/Model/Viewer";
import {api} from "../index";

const generateClassName = createGenerateClassName({
    disableGlobal: true,
    seed: 'mui-jss',
});

type Data = {
    title: string
}

const modelPlugin: CellPlugin<Data> = {
    Renderer: ({data}) => (
        <div className={'h-96'}>
            <Viewer data={{
                show_ui: true,
                urn: 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZGlhbG9zczEzMzc3NS8lRDAlOTMlRDAlQjglRDAlQkIlRDElOEMlRDAlQjclRDAlQjAuU0xEUFJU',
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
                title: {
                    type: 'string',
                    default: 'someDefaultValue',
                },
            },
            required: ['title'],
        },
    },
};


const cellPlugins = [slate(), image, modelPlugin];


const PageEditor = ({id, data}: { id: number; data: object }) => {
    const [value, setValue] = React.useState(data);

    function update(data) {
        setValue(data);
        api.apiProductUpdate({id, product: {page: JSON.stringify(data)}})
    }

    return (
        <Editor cellPlugins={cellPlugins} value={value} onChange={update}/>
    );
};

export default PageEditor;
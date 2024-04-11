//@ts-nocheck

import React from 'react';
import {Form} from "../components/Form";
import Windows from "../Window";
import {useAppSelector} from "../store/redux";

import store from "../store";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const schema = require("../api/schema.json");

const map = {
    'gallery': {
        name: 'Галерея',
    },
    'product': {
        name: "Продукт",
    },
}

export function getFields(page, item) {
    let d = [];
    for (const p of schema[page]) {
        if (p.name) {
            let v = "";
            if (item) v = item[p.name]
            else v = p.default;
            d.push({...p, value: v})
        }
    }
    return d;
}

let formType = 'create';
let formSelected = null;

const DataForm = () => {
    const [fields, setFields] = React.useState([]);
    const page = useAppSelector(state => state.app.page);

    function submit(data) {
        if (!formSelected) return;
        console.log(data)
        if (formType === 'create') window.app.create(data);
        else window.app.update({...data, id: formSelected.id});
        window.closeWindow('form');
    }

    window.app.dataForm = (create) => {
        window.openWindow('form');
        if (create === undefined) return;
        if (!create) formType = 'update'
        else formType = 'create';
        formSelected = store.getState().app.selected;
        setFields(getFields(page, create ? null : formSelected));
    }
    return (
        <>
            {/*<Windows key_={'form'} width={400} title={'Форма'}>*/}
            {/*    <div style={{padding: 10}}>*/}
            {/*        <Form caption={"Форма"}*/}
            {/*              fields={fields}*/}
            {/*              onSubmit={submit}*/}
            {/*        ></Form>*/}
            {/*    </div>*/}
            {/*</Windows>*/}
        </>
    );
};

export default DataForm;
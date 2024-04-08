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

function getFields(page, item) {
    let d = [];
    for (const p of schema[page]) {
        if (p.name && !["id",'page', 'product', 'dateCreated', 'statusChanged', 'user'].includes(p.name)) {
            let v = "";
            if (item) v = item[p.name]
            d.push({...p, value: v})
        }
    }
    return d;
}

let formType = 'create';

const DataForm = () => {
    const [fields, setFields] = React.useState([]);
    const page = useAppSelector(state => state.app.page);

    function submit(data) {
        console.log(data)
        if (formType === 'create') window.app.create(data);
        else window.app.update({...data, id: store.getState().app.selected.id});
    }

    const [open, setOpen] = React.useState(false);

    window.app.dataForm = (create) => {
        if (!create) formType = 'update'
        else formType = 'create';
        setFields(getFields(page, create ? null : store.getState().app.selected));
        setOpen(true);
    }
    return (
        <>
            <Windows callback={setOpen} width={400} title={'Форма'} open={open} defaultOpened={false}>
                <div style={{padding: 10}}>
                    <Form caption={"Форма"}
                          fields={fields}
                          onSubmit={submit}
                    ></Form>
                </div>
            </Windows>
        </>
    );
};

export default DataForm;
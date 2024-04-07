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
        create: data => window.api.apiGalleryCreate({gallery: data})
    },
    'product': {
        name: "Продукт",
        create: data => window.api.apiProductCreate({product: data})
    },
    'order': {
        name: "Заказ",
        create: data => window.api.apiProductCreate({product: data})
    }
}

function getFields(page) {
    let d = [];
    for (const p of schema[page]) {
        if (p.name && p.name != 'id') d.push({...p, value: ''})
    }
    return d;
}

const DataForm = () => {
    const [fields, setFields] = React.useState([]);
    const page = useAppSelector(state => state.app.page);

    function submit(data) {
        console.log(data)
        map[form].create(data).then(d => console.log(d));
        window.app.update(data);
    }

    const [open, setOpen] = React.useState(false);

    window.app.dataForm = (create) => {
        if (create) {
            setFields(getFields(page));
        } else {
            setFields(store.getState().app.selected)
        }
        setOpen(true);
    }

    return (
        <>
            <Windows title={'Форма'} open={open} defaultOpened={false}>
                <div style={{padding: 10}}>
                    <TextField
                        label="Что добавить"
                        select
                        style={{width: 200}}
                        onChange={e => setFields(getFields(e.target.value))}
                    >
                        {
                            Object.keys(map).map(form =>
                                <MenuItem key={form} value={form}>{map[form].name}</MenuItem>
                            )
                        }
                    </TextField>
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
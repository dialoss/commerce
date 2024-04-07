//@ts-nocheck

import React from 'react';
import {Form} from "../components/Form";
import Windows from "../Window";
import {useAppSelector} from "../store/redux";
import {api} from "../index"
import {actions} from "../store/app";
import store from "../store";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";

const map = {
    'Галерея': {
        create: data => api.apiGalleryCreate({gallery: data})
    },
    'Продукт': {
        create: data => api.apiProductCreate({product: data})
    }
}
let form = "";

const DataForm = () => {
    // const data = useAppSelector(state => state.app.selected);
    const [data, setData] = React.useState({});

    function submit(newData) {
        newData = {...data, ...newData}
        api.apiProductUpdate({id: data.id, product: newData}).then(d => window.app.update(d));
    }

    function create() {
        map[form].create(data);

    }

    return (
        <>
            <Windows title={'Форма'} open={false} defaultOpened={false}>
                <div style={{padding: 10}}>
                    <TextField
                        label="Что добавить"
                        select
                        style={{width: 200}}
                        onChange={e => {
                            let t = e.target.value;
                            form = t;
                        }}
                    >
                        {
                            ['Галерея', "Продукт", "Заказ"].map(name =>
                                <MenuItem key={name} value={name}>{name}</MenuItem>
                            )
                        }
                    </TextField>
                    <Button onClick={create}>Создать новый</Button>
                    <Form caption={"Форма"}
                          fields={Object.keys(data).map(k => ({name: k, value: data[k]}))}
                          onSubmit={submit}
                    ></Form>
                </div>
            </Windows>
        </>
    );
};

export default DataForm;
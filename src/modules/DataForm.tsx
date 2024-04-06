//@ts-nocheck

import React from 'react';
import {Form} from "../components/Form";
import Windows from "../Window";
import {useAppSelector} from "../store/redux";
import {api} from "../index"
import {actions} from "../store/app";
import store from "../store";
import Button from "@mui/material/Button";

const DataForm = () => {
    const data = useAppSelector(state => state.app.selected);

    function submit(newData) {
        newData = {...data, ...newData}
        console.log(newData)
        api.apiProductUpdate({id: data.id, product: newData}).then(d => window.app.update(d));
    }

    function clear() {
        store.dispatch(actions.setSelected({}));
    }

    return (
        <>
            <Windows title={'Форма'} open={false} defaultOpened={false}>
                <div style={{padding: 10}}>
                    <Button onClick={clear}>Создать новый</Button>
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
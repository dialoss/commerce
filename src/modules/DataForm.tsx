//@ts-nocheck

import React from 'react';
import {Form} from "../components/Form";
import Windows from "../Window";
import {useAppSelector} from "../store/redux";
import {Product} from "../api";
import {Button} from "@mui/material";
import {api} from "../index"

const DataForm = () => {
    const data: Product = useAppSelector(state => state.app.selected);

    function submit(newData) {
        newData = {...data, ...newData}
        console.log(newData)
        api.apiProductUpdate({id: data.id, product: newData}).then(d => window.app.update(d));

    }
    return (
        <>
            <Windows title={'Форма'} open={false} defaultOpened={false}>
                <div style={{padding: 10}}>
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
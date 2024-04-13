//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import {Form} from "../components/Form";
import Userfront from "@userfront/toolkit/react";
import Typography from "@mui/joy/Typography";

const schema = require("../api/schema.json");

export function useConnectForm(name, id, fieldPrefix) {
    const [data, setD] = useState([]);

    function set(d) {
        let data = [];
        for (const f of schema[name]) {
            if (fieldPrefix && !f.name.includes(fieldPrefix)) continue;
            let field = {...f};
            field.value = d[field.name] || field.default;
            field.safeUpdate = true;
            data.push(field)
        }
        setD(data);
    }

    useLayoutEffect(() => {
        set({});
        window.api.request({
            path: `/api/${name}/` + id + '/',
            method: 'GET'
        }).then(r => r.json()).then(d => {
            set(d);
        })
    }, []);

    function setData(d) {
        window.api.request({
            path: `/api/${name}/` + id + '/',
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(d),
        })
    }

    return {data, setData}
}

const SettingsPage = () => {
    const delivery = useConnectForm('user', Userfront.user.userId, 'delivery');
    const notif = useConnectForm('user', Userfront.user.userId, "notification");
    return (
        <div style={{maxWidth: '500px', margin: '0 auto', }}>
            <h3 className={'text-center'}>Настройки уведомлений</h3>
            <Typography>Уведомления приходят в этих случаях:<ul>
                <li>
                    Изменение статуса заказа
                </li>
                <li>
                    Добавление новых записей в процесс изготовления заказа
                </li>
                <li>
                    Ответ на комментарий
                </li>
            </ul></Typography>
            <Form onSubmit={notif.setData}
                  fields={notif.data}></Form>
            <h3 className={'text-center'}>Данные для доставки</h3>
            <Form onSubmit={delivery.setData}
                  fields={delivery.data}></Form>
            <h3 className={'text-center'}>Данные профиля</h3>
            <Form onSubmit={d => {
                Userfront.user.update({name: d.name});
                window.location.reload();
            }}
                  fields={[{name: "name",label:'Логин', type:'text', value: Userfront.user.name}]}></Form>
        </div>
    );
};

export default SettingsPage;
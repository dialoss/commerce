//@ts-nocheck
import store from "store";
import Userfront from "@userfront/toolkit/react";
import {Product} from "../api";
import {CLIENT_PATH} from "../config";

export class BusinessLogic {
    static order() {
        const data = store.getState().app?.pageData;
        let user = Userfront.user;
        window.api.apiOrderCreate({
            order: {
                product: data.id,
                user: user.userId,
                media: data.media,
                title: data.productType + " " + data.name,
                description: data.summary,
            }
        }).then(d => {
            window.app.dialog({
                callback: (r) => r === "Да" && window.navigate(`orders/${d.id}-${user.name.replaceAll(' ', '').toLowerCase()}`),
                form: "Перейти на страницу заказа?",
                buttons: ["Нет", "Да"]
            })
        });
    }

    static buy(data: Product) {
        const fields = [
            {name: "label", value: ""},
            {name: "billNumber", value: "11TNPCU54FQ.240405"},
            {name: "targets", value: "сбор"},
            {name: "receiver", value: "4100118386566825"},
            {name: "referer", value: CLIENT_PATH},
            {name: "is-inner-form", value: "true"},
            {name: "sum", value: data.price || 0},
            {name: "quickpay-form", value: "button"},
            {name: "successURL", value: CLIENT_PATH + "/profile"},
        ]

        window.api.apiOrderCreate({
            order: {
                user: Userfront.user.userId,
                product: data.id,
                media: data.media,
                title: data.productType + " " + data.name,
                description: data.summary,
            }
        }).then(d => {
            fields[0].value = d.id;
            const form = document.createElement('form');
            form.target = "_blank";
            form.method = 'POST';
            form.action = "https://yoomoney.ru/quickpay/confirm";

            for (const f of fields) {
                const hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
                hiddenField.name = f.name;
                hiddenField.value = f.value;
                form.appendChild(hiddenField);
            }
            document.body.appendChild(form);
            form.submit();
        });
    }
}
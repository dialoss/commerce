//@ts-nocheck
import store from "store";
import Userfront from "@userfront/toolkit/react";
import {Product} from "../api";

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
        window.api.apiOrderCreate({
            order: {
                user: Userfront.user.userId,
                product: data.id,
                media: data.media,
                title: data.productType + " " + data.name,
            }
        });
    }
}
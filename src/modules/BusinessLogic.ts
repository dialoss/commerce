//@ts-nocheck
import store from "store";
import Userfront from "@userfront/toolkit/react";
import {Product} from "../api";

export class BusinessLogic {
    static order() {
        const data = store.getState().app?.pageData;
        window.api.apiOrderCreate({
            order: {
                user: Userfront.user.userId,
                product: data.id,
            }
        });
    }

    static buy(data: Product) {
        window.api.apiOrderCreate({
            order: {
                user: Userfront.user.userId,
                product: data.id,
            }
        });
    }
}
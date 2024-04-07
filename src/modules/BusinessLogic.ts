//@ts-nocheck
import store from "store";
import Userfront from "@userfront/toolkit/react";

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

    static buy() {

    }
}
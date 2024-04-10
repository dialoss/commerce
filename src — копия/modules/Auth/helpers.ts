//@ts-nocheck
import Userfront from "@userfront/toolkit/react";

export function checkUser() {
    let u = Userfront.user
    if (!u.userId) {
        window.app.auth?.open();
        return false
    }
    return true;
}
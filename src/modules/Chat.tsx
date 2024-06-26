//@ts-nocheck

import React, {useEffect} from 'react';
import {md5} from "js-md5";
import Userfront from "@userfront/toolkit/react";
import {checkUser} from "./Auth/helpers";


window.addEventListener('onBitrixLiveChat', function (event) {
    // @ts-ignore
    let widget = event.detail.widget;
    const user = Userfront.user;
    if (!user.userId) return;
    let name = user.name;
    let hash = md5.create();
    hash.update(user.userUuid + "mymountmt");
    hash = hash.hex()
    console.log(user, hash)
    widget.setUserRegisterData({
        'hash': hash,
        'name': name.split(' ')[0],
        'lastName': name.split(' ')[1] || '',
        'avatar': user.image,
        'email': user.email,
    });
    widget.mutateTemplateComponent('bx-livechat-form-welcome', { template: '<div></div>' });
    widget.setOption('checkSameDomain', false);
});

(function(w,d,u){
    var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
    var h=d.getElementsByTagName('script')[0]; // @ts-ignore
    h.parentNode.insertBefore(s,h);
})(window,document,'https://cdn-ru.bitrix24.ru/b29154152/crm/site_button/loader_1_jv0y3u.js');

const Chat = () => {
    return (
        <>
        </>
    );
};

export default Chat;
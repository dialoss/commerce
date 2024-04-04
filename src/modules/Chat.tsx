import React, {useEffect} from 'react';

window.addEventListener('onBitrixLiveChat', function (event) {
    // @ts-ignore
    let widget = event.detail.widget;
    widget.setUserRegisterData({
        'hash': '12b42ebcec7e3c26a313272c26efddbd',
        'name': 'Виктор',
        'lastName': 'Иванов',
        'avatar': 'http://files.shelenkov.com/images/avatar-ivanov.jpg',
        'email': 'victor@ivanov.ru',
        'gender': 'M',
        'position': 'Почетный пользователь'
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
        <div>

        </div>
    );
};

export default Chat;
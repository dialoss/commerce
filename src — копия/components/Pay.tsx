//@ts-nocheck
import React from 'react';
import Button from "@mui/material/Button";
import Userfront from "@userfront/toolkit/react";
import Tooltip from '@mui/material/Tooltip';
import {CLIENT_PATH} from "../config";
import {BusinessLogic} from "../modules/BusinessLogic";

const Pay = ({product}) => {
    const fields = [
        {name: "billNumber", value: "11TNPCU54FQ.240405"},
        {name: "targets", value: "сбор"},
        {name: "receiver", value: "4100118386566825"},
        {name: "referer", value: CLIENT_PATH},
        {name: "is-inner-form", value: "true"},
        {name: "sum", value: product.price},
        {name: "quickpay-form", value: "button"},
        {name: "label", value: Userfront.user.userId + "." + product.id},
        {name: "successURL", value: CLIENT_PATH + "/profile"},
    ]
    return (
        <>
            <form action="https://yoomoney.ru/quickpay/confirm"
                  method={"POST"}
                  target={'_blank'}
                  onSubmit={() => BusinessLogic.buy(product)}>
                {fields.map(f => <input type="text" hidden value={f.value} name={f.name}/>)}
                <Tooltip title={<p style={{fontSize: 13}}>Заказ появится на странице вашего профиля</p>}>
                    <Button style={{margin: 'auto'}} size={'small'} variant={'contained'} type={'submit'}>
                        Купить
                    </Button>
                </Tooltip>
            </form>

        </>
    );
};

export default Pay;
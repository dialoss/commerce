//@ts-nocheck
import React from 'react';
import Button from "@mui/material/Button";
import Userfront from "@userfront/toolkit/react";

const Pay = ({text, product}) => {
    const fields = [
        {name: "billNumber", value: "11TNPCU54FQ.240405"},
        {name: "targets", value: "сбор"},
        {name: "receiver", value: "4100118386566825"},
        {name: "referer", value: "http://localhost:3000"},
        {name: "is-inner-form", value: "true"},
        {name: "sum", value: product.price},
        {name: "quickpay-form", value: "button"},
        {name: "label", value: Userfront.user.userId + "." + product.id},
        {name: "successURL", value: "https://mymountmt.ru/pay"},
    ]
    return (
        <>
        <form action="https://yoomoney.ru/quickpay/confirm" method={"POST"} target={'_blank'}>
            {fields.map(f => <input type="text" hidden value={f.value} name={f.name}/>)}
            <Button variant={'contained'} type={'submit'}>
                {text}
            </Button>
        </form>

        </>
    );
};

export default Pay;
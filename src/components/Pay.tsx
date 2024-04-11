//@ts-nocheck
import React from 'react';
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import {CLIENT_PATH} from "../config";
import {BusinessLogic} from "../modules/BusinessLogic";

const Pay = ({product}) => {
    return (
        <Tooltip title={<p style={{fontSize: 13}}>Заказ появится на странице вашего профиля</p>}>
            <Button style={{margin: '0 auto'}} size={'small'} variant={'contained'}
                    onClick={() => BusinessLogic.buy(product)}>
                Купить
            </Button>
        </Tooltip>
    );
};

export default Pay;
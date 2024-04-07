import React, {useLayoutEffect} from 'react';
import {useAppSelector} from "../store/redux";
import {api} from "../index";
import {Product} from "../api";
import Viewer from '../components/Model/Viewer';
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import {rub} from "../ui/tools";
import PageEditor from "./PageEditor";
import store from "../store";
import {actions} from "../store/app";

const ProductPage = () => {
    const [data, setData] = React.useState<Product | null>(null);
    useLayoutEffect(() => {
        let p = window.location.pathname.split('/').slice(-1)[0].split('-')[0];
        api.apiProductRetrieve({id: +p}).then(d => setData(d))
    }, [])

    function order() {

    }

    return (
        <div>
            {data && <>
            {/*<Typography>Цена: {rub.format(data.price || 0)}</Typography>*/}
            {/*<Button onClick={order}>Заказать изготовление</Button>*/}
            <PageEditor id={data.id} data={JSON.parse(data.page || '{}')}></PageEditor>
                </>}
        </div>
    );
};

export default ProductPage;
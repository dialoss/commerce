import React, {useLayoutEffect} from 'react';
import {useAppSelector} from "../store/redux";
import {api} from "../index";
import {Product} from "../api";
import Viewer from '../components/Model/Viewer';
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import {rub} from "../ui/tools";
import PageEditor from "./PageEditor";

const ProductPage = () => {
    const data = useAppSelector(state => state.app.selected);
    const [info, setInfo] = React.useState<Product>();
    useLayoutEffect(() => {
        api.apiProductRetrieve({id: data.id}).then(d => setInfo(d))
    }, [])
    console.log(info)

    function order() {

    }

    return (
        <div>
            {info && info.id}
            <Typography>Цена: {rub.format(data.price || 0)}</Typography>
            <Button onClick={order}>Заказать изготовление</Button>
            <PageEditor id={data.id} data={JSON.parse(data.page || '{}')}></PageEditor>
        </div>
    );
};

export default ProductPage;
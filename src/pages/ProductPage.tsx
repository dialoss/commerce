import React, {useLayoutEffect} from 'react';

import {Product} from "../api";
import PageEditor from "./PageEditor";
import store from "../store";
import {actions} from "../store/app";

const ProductPage = () => {
    const [data, setData] = React.useState<Product | null>(null);
    useLayoutEffect(() => {
        let p = window.location.pathname.split('/').slice(-1)[0].split('-')[0];
        window.api.apiProductRetrieve({id: +p}).then(d => {
            setData(d);
            store.dispatch(actions.setPageData(d))
        })
    }, [])

    return (
        <div>
            {data && <>
            <PageEditor endpoint={'product'} id={data.id} data={JSON.parse(data.page || '{}')}></PageEditor>
                </>}
        </div>
    );
};

export default ProductPage;
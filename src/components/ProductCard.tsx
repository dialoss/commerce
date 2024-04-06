import React from 'react';
import {Product} from "../api";
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import store from "../store";
import {actions} from "../store/app";
import {rub} from "../ui/tools";
import BaseCard from "./BaseCard";
import CardImage from "./CardImage";

const ProductCard = ({data}: { data: Product }) => {
    return (
        <BaseCard
            onClick={() => {
                window.navigate(`models/${data.id}-${data.model}`);
                store.dispatch(actions.setSelected(data))
            }}>
            <>
                <div>
                    <Typography level="title-lg">{data.name + " " + data.model}</Typography>
                </div>
                <CardImage carousel={false} id={data.id} url={data.cover}></CardImage>
                <CardContent orientation="horizontal">
                    <div>
                        <Typography level={'body-md'}>{data.summary}</Typography>
                        <Typography fontSize="lg" fontWeight="lg">
                            {rub.format(data.price || 0)}
                        </Typography>
                    </div>
                </CardContent>
            </>
        </BaseCard>
    );
};

export default ProductCard;
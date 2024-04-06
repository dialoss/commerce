import React from 'react';
import {Product} from "../api";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import store from "../store";
import {actions} from "../store/app";
import {rub} from '../ui/tools';
import {Button} from "@mui/material";

const ShopCard = ({data}: { data: Product }) => {
    function buy() {

    }
    return (
        <div
            className={"p-1 item-card md:w-1/2 lg:w-1/3 hover:cursor-pointer"}>
            <Card
                color="neutral"
                invertedColors={false}
                orientation="vertical"
                size="sm"
                variant="outlined">
                <div>
                    <Typography level="title-lg">{data.name + " " + data.model}</Typography>
                </div>
                <AspectRatio minHeight="200px" maxHeight="300px">
                    <img
                        style={{objectFit: 'contain'}}
                        src={data.cover}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <CardContent orientation="horizontal">

                    <Typography level={'body-md'}>{data.summary}</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        {data.price ? rub.format(data.price) : "Под заказ"}
                    </Typography>
                    <Button variant={'contained'} onClick={buy}>Купить</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ShopCard;
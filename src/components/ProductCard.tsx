import React from 'react';
import {Product} from "../api";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import store from "../store";
import {actions} from "../store/app";


export const rub = Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: "RUB",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
});

const ProductCard = ({data}: {data: Product}) => {
    return (
        <div style={{padding: 5, width:'33.33%'}} onClick={() => store.dispatch(actions.setSelected(data))}>
        <Card
              color="neutral"
              invertedColors={false}
              orientation="vertical"
              size="sm"
              variant="outlined">
            <div>
                <Typography level="title-lg">{data.type.name.name + " " + data.type.model}</Typography>
            </div>
            <AspectRatio minHeight="200px" maxHeight="300px">
                <img
                    style={{objectFit:'contain'}}
                    src={data.cover}
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <CardContent orientation="horizontal">
                <div>
                    <Typography level={'body-md'}>{data.summary}</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        {rub.format(data.price)}
                    </Typography>
                </div>

            </CardContent>
        </Card>
        </div>
    );
};

export default ProductCard;
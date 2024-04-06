import React from 'react';
import Card from "@mui/joy/Card";

const BaseCard = ({onClick, children, style}: { onClick?: () => any; style?:string; children: React.ReactElement }) => {
    return (
        <div
            className={"p-1 item-card md:w-1/2 lg:w-1/3 hover:cursor-pointer " + style} onClick={onClick}>
            <Card
                color="neutral"
                invertedColors={false}
                orientation="vertical"
                size="sm"
                sx={{gap: 0, height: '100%', padding: 1}}
                variant="outlined">
                {children}
            </Card>
        </div>
    );
};

export default BaseCard;
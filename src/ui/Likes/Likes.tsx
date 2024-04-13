//@ts-nocheck
import React, {useState} from 'react';
import {Stack} from "@mui/material";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "./Likes.scss"
import {useAppSelector} from "../../store/redux";
import Avatar from "../Avatar/Avatar";
import Userfront from "@userfront/toolkit/react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Link} from "react-router-dom";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';

const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

function Likes({likes, style = '', listStyle = {}, like}: { likes: object[]; like: () => any }) {
    const users = useAppSelector(state => state.app.users);
    const [show, setShow] = useState(false);
    const [data, setData] = useState(() => [...likes]);
    const isLiked = data.find(l => l.user === Userfront.user.userId);

    return (
        <div className={'likes bg-slate-100 p-1 rounded-[5px] ' + style}>
            <Stack direction={'row'} alignItems={'center'}>
                {data.length > 0 && <HtmlTooltip title={<div style={{width: 200}}>{data.map(l => {
                    const user = users[l.user] || {name: "Гость", image: ""};
                    return <div >
                        <div style={{display: 'flex', columnGap: 4}}>
                            <Avatar style={{width: 25}} src={user.image}></Avatar>
                            <Link to={"/profile/" + user.userId} style={{fontSize: 14}}>{user.name}</Link>
                        </div>
                    </div>
                })}</div>}>
                    <div className={'hover:cursor-pointer px-1'}
                         style={{textDecoration: 'underline', fontSize: 15,}}
                         onClick={() => setShow(s => !s)}>{data.length}</div>
                </HtmlTooltip>}
                <div style={{marginLeft: !!data.length ? 5 : 0}}>{!isLiked ? <FavoriteBorderIcon style={{width: 20}} className={'hover:cursor-pointer'} onClick={() => {
                        if (!isLiked) {
                            like();
                            setData(d => [...d, {user: Userfront.user.userId}])
                        }
                    }}></FavoriteBorderIcon> :
                    <FavoriteIcon className={'hover:cursor-pointer'}
                                  style={{
                                      width: 20,
                                      filter: "invert(14%) sepia(95%) saturate(6157%) hue-rotate(358deg) brightness(108%) contrast(110%)"
                                  }}></FavoriteIcon>}</div>
            </Stack>
            {show && data.map(l => {
                const user = users[l.user] || {name: "Гость", image: ""};
                return <div style={listStyle}>
                    <div style={{display: 'flex', columnGap: 4}}>
                        <Avatar style={{width: 25}} src={user.image}></Avatar>
                        <Link to={"/profile/" + user.userId} style={{fontSize: 14}}>{user.name}</Link>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Likes;
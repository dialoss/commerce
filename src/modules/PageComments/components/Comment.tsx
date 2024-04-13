//@ts-nocheck
import React, {useContext, useEffect, useRef, useState} from 'react';
import "./Comment.scss";
import {CommentsContext, CommentsInput} from "./CommentsContainer";
import Avatar from "../../../ui/Avatar/Avatar";
import {useAppSelector} from "../../../store/redux";
import {Link} from "react-router-dom";
import {MediaItem} from "../../../components/MediaItems";
import {openImages} from "../../../components/MediaCard";
import Likes from "../../../ui/Likes/Likes";

const Comment = ({data, depth}) => {
    const users = useAppSelector(state => state.app.users);
    const [reply, setReply] = useState(false);
    const user = users[data.user] || {};
    const addComment = useContext(CommentsContext);
    const ref = useRef();
    useEffect(() => {
        if (reply) ref.current.classList.add('visible');
    }, [reply]);

    function closeInput() {
        ref.current.classList.remove('visible');
        setTimeout(() => setReply(r => !r), 180)
    }

    function like() {
        window.api.request({
            method: "PATCH",
            path: "/api/comment/" + data.id + "/?like=true"
        });
    }

    return (
        <div className={"comment item"} style={{display:'flex', columnGap:8}} data-id={data.id} data-type={'comment'}>
            <Avatar style={{width: 30,minWidth:30}} user={user} src={user.image}></Avatar>
            <div style={{flexGrow:1}}>
            {data.text && <div id={data.id} style={{wordBreak:'break-word'}} type={'comment'} dangerouslySetInnerHTML={{__html: data.text}}></div>}
            <UploadPreview data={data}></UploadPreview>

            <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', columnGap: 5}}>
                <div className="comment-block">
                    <div className="comment-block__text ">
                        <Link to={"/profile/" + user.userId}
                              className={"comment-username hover:cursor-pointer text-decoration-none"}>{user.name || 'Гость'}</Link>
                        <p className={"comment-date"}>{window.formatDate(data.time)}</p>
                    </div>
                </div>

                <div style={{display: 'flex'}}>
                    {depth < 2 && <div className={"comment-reply__button"} onClick={() => {
                        if (ref.current) closeInput();
                        else setReply(r => !r)
                    }}>Ответить</div>}
                    <span><Likes listStyle={{zIndex: 2, backgroundColor: "#fff", position: 'absolute'}}
                                 style={"bg-white text-sm !p-0"} like={like} likes={data.likes || []}></Likes></span>
                </div>
            </div>
            {reply &&
                <div className={"comment-reply"} ref={ref}>
                    <CommentsInput callback={comment => {
                        closeInput();
                        addComment(comment);
                    }} parent={data.id}></CommentsInput>
                </div>}
            </div>
        </div>
    );
};

export default Comment;

function UploadPreview({data}) {
    const files = JSON.parse(data.media || '[]');
    console.log(files)
    return (
        <div style={{marginTop: !!files.length ? 10 : 0}}>
            {
                files.map(f =>
                    <div className={f.type !== 'file' && 'shadow-sm mb-2'} style={{display: 'inline-block'}}>
                        <MediaItem
                            callback={() => {
                                console.log(123131)
                                f.type === 'image' && openImages(f, files.filter(f => f.type === 'image'))()
                            }}
                            data={f}></MediaItem>
                    </div>
                )
            }
        </div>
    );
}
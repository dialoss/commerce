//@ts-nocheck
import React, {useContext, useEffect, useRef, useState} from 'react';
import "./Comment.scss";
import {CommentsContext, CommentsInput} from "./CommentsContainer";
import Avatar from "../../../ui/Avatar/Avatar";
import {useAppSelector} from "../../../store/redux";
import {Link} from "react-router-dom";
import {MediaItem} from "../../../components/MediaItems";
import {openImages} from "../../../components/MediaCard";

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

    return (
        <div className={"comment item"} data-id={data.id} data-type={'comment'}>
            <div className="comment-block">
                <Avatar user={user} src={user.image}></Avatar>
                <div className="comment-block__text ">
                    <Link to={"/profile/" + user.userId}
                          className={"comment-username hover:cursor-pointer text-decoration-none"}>{user.name || 'Гость'}</Link>
                    <p className={"comment-date"}>{window.formatDate(data.time)}</p>
                </div>
            </div>

            <UploadPreview data={data}></UploadPreview>

            {data.text && <div id={data.id} type={'comment'} dangerouslySetInnerHTML={{__html: data.text}}></div>}
            {depth < 2 && <div className={"comment-reply__button"} onClick={() => {
                if (ref.current) closeInput();
                else setReply(r => !r)
            }}>Ответить</div>}
            {reply &&
                <div className={"comment-reply"} ref={ref}>
                    <CommentsInput callback={comment => {
                        closeInput();
                        addComment(comment);
                    }} parent={data.id}></CommentsInput>
                </div>}
        </div>
    );
};

export default Comment;

function UploadPreview({data}) {
    const files = JSON.parse(data.media || '[]');
    return (
        <div>
            {
                files.map(f =>
                    <div className={f.type !== 'file' && 'shadow-sm mb-2'} style={{display: 'inline-block'}}>
                        <MediaItem
                            callback={() => f.type === 'image' && openImages(f, files.filter(f => f.type === 'image'))}
                            data={f}></MediaItem>
                    </div>
                )
            }
        </div>
    );
}
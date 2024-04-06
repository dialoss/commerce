//@ts-nocheck
import React, {useContext, useEffect, useRef, useState} from 'react';
import dayjs from "dayjs";
import "./Comment.scss";
import {CommentsContext, CommentsInput} from "./CommentsContainer";
import Avatar from "../../../ui/Avatar/Avatar";

const Comment = ({data, depth}) => {
    // const users = useAppSelector(state => state.users.users);
    const [reply, setReply] = useState(false);
    const user = {};
    // users[data.user] || data.user;
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
                <Avatar user={user} src={user.picture}></Avatar>
                <div className="comment-block__text">
                    <p className={"comment-username"}>{user.name || 'Гость'}</p>
                    <p className={"comment-date"}>{dayjs(data.timeSent).format("HH:mm DD.MM.YYYY")}</p>
                </div>
            </div>
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
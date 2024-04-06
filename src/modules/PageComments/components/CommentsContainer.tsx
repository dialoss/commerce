//@ts-nocheck
import React, {createContext, useEffect, useLayoutEffect, useState} from 'react';
import Comments from "./Comments";
import "./Comments.scss";
import CommentsTools from "./CommentsTools";
import {createCommentsTree, sortFunction} from "./helpers";
import Button from "@mui/material/Button";
import {api} from "../../../index";
import HTMLEditor from "../../../ui/HTMLEditor";
import Userfront from "@userfront/toolkit/react";

export const CommentsInput = ({callback, parent = null}: { parent?: number }) => {
    const [message, setMessage] = useState('');

    function send() {
        const comment = {
            id: new Date().getTime(),
            page: decodeURI(window.location.pathname + "/"),
            user: Userfront.user.userId,
            text: message,
            parent,
        };
        api.apiCommentCreate({
            comment
        })
        callback(comment)
        setMessage('')
    }

    return (
        <div className="input-wrapper">
            <div className={"input-field"}>
                <div className="editor-wrapper">
                    <HTMLEditor setHTML={setMessage}></HTMLEditor>
                </div>
            </div>
            <Button onClick={send}>Отправить</Button>
        </div>
    );
};

export const CommentsContext = createContext();

const CommentsContainer = ({page}) => {
    const [search, setSearch] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentsTree, setCommentsTree] = useState({});
    const [sorting, setSorting] = useState(() => sortFunction('default'));

    useLayoutEffect(() => {
        api.apiCommentList({page}).then(d => setComments([...d.results]));
    }, [page]);

    useEffect(() => {
        setSearch(comments);
    }, [comments]);
    const limitStep = 40;
    const [limit, setLimit] = useState(limitStep);
    useEffect(() => {
        setCommentsTree(createCommentsTree(comments, sorting, search, limit));
    }, [sorting, search, limit]);

    function addComment(comment) {
        setComments(c => [...c, comment]);
    }

    return (
        <CommentsContext.Provider value={addComment}>
            <div className={"comments-section"}>
                <CommentsInput callback={addComment}></CommentsInput>
                <div className="comments-section__header">
                    <div className={"comments-tools__wrapper"}>
                        <CommentsTools callback={(e) => setSorting(() => sortFunction(e.target.value))}></CommentsTools>
                    </div>
                </div>
                <div className={"comments"}>
                    <p id={'counter'}>Всего комментариев: {search.length}</p>
                    <Comments comments={commentsTree}></Comments>
                </div>
            </div>
        </CommentsContext.Provider>
    );
};

export default CommentsContainer;
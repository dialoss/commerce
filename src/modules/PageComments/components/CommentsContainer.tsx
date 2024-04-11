//@ts-nocheck
import React, {createContext, useEffect, useLayoutEffect, useState} from 'react';
import Comments from "./Comments";
import "./Comments.scss";
import CommentsTools from "./CommentsTools";
import {createCommentsTree, sortFunction} from "./helpers";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import Textarea from '@mui/joy/Textarea';

import HTMLEditor from "../../../ui/HTMLEditor";
import Userfront from "@userfront/toolkit/react";
import {MediaField} from "../../../components/Form";
import {Stack} from "@mui/material";

export const CommentsInput = ({callback, parent = null}: { parent?: number }) => {
    const [message, setMessage] = useState('');
    const [media, setMedia] = useState([]);

    function send() {
        if (!window.app.authAction()) return;
        if (!message && !media.length) return;
        let clearedMessage = message.replace(/<[^>]*>?/gm, '');
        const comment = {
            id: new Date().getTime(),
            time: new Date().getTime(),
            page: decodeURI(window.location.pathname + "/"),
            user: Userfront.user.userId,
            text: clearedMessage,
            media: JSON.stringify(media),
            parent,
        };
        window.api.apiCommentCreate({
            comment
        })
        callback(comment)
        setMessage('')
        setMedia([]);
    }

    return (
        <div className="input-wrapper">
            <div className={"input-field"}>
                <div className="editor-wrapper">
                    <Textarea
                        disabled={false}
                        minRows={2}
                        sx={{width: '100%'}}
                        placeholder="Напишите комментарий"
                        variant="outlined"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>
            </div>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Button onClick={send}>Отправить</Button>
                <MediaField simple={true} field={{value: media}} setValue={setMedia}></MediaField>
            </Stack>
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
        window.api.apiCommentList({page}).then(d => setComments([...d.results]));
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
                <CommentsTools callback={d => setSorting(() => sortFunction(d))}></CommentsTools>
                <div className={"comments"}>
                    <p id={'counter'}>Всего комментариев: {search.length}</p>
                    <Comments comments={commentsTree}></Comments>
                </div>
            </div>
        </CommentsContext.Provider>
    );
};

export default CommentsContainer;
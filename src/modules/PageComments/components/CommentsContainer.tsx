//@ts-nocheck
import React, {createContext, useEffect, useLayoutEffect, useState} from 'react';
import Comments from "./Comments";
import "./Comments.scss";
import CommentsTools from "./CommentsTools";
import {createCommentsTree, sortFunction} from "./helpers";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import {MediaField} from "../../../components/Form";
import HTMLEditor from "../../../ui/HTMLEditor";

export const CommentsInput = ({callback, parent = null}: { parent?: number }) => {
    const [message, setMessage] = useState('');
    const [media, setMedia] = useState([]);
    const clear = React.useRef(false);

    function send() {
        if (!window.app.authAction()) return;
        if (!message && !media.length) return;
        let clearedMessage = message.replace(/<[^>]*>?/gm, '');
        const comment = {
            page: decodeURI(window.location.pathname + "/"),
            text: clearedMessage,
            media: JSON.stringify(media),
            parent,
        };
        window.api.apiCommentCreate({
            comment
        }).then(data => callback(data))
        setMessage('')
        setMedia([]);
        clear.current = true;
    }

    return (
        <div className="input-wrapper">
            <div className={"input-field"}>
                <div className="editor-wrapper">
                    <HTMLEditor clear={clear} setHTML={setMessage} placeholder={'Напишите комментарий'}></HTMLEditor>
                    {/*<Textarea*/}
                    {/*    disabled={false}*/}
                    {/*    minRows={2}*/}
                    {/*    sx={{width: '100%'}}*/}
                    {/*    placeholder="Напишите комментарий"*/}
                    {/*    variant="outlined"*/}
                    {/*    value={message}*/}
                    {/*    onChange={e => setMessage(e.target.value)}*/}
                    {/*/>*/}
                </div>
            </div>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Button onClick={send}>Отправить</Button>
                <MediaField key={media.length} simple={true} field={{value: media}} setValue={setMedia}></MediaField>
            </Stack>
        </div>
    );
};

export const CommentsContext = createContext();
const cache = {};
const limit = 30;

const CommentsContainer = ({page}) => {
    const [comments, setComments] = useState([]);
    const [commentsTree, setCommentsTree] = useState({});
    const [sorting, setSorting] = useState(() => sortFunction('newest'));
    const all = React.useRef(0);

    useLayoutEffect(() => {
        if (cache[page]) setComments(cache[page]);
        else window.api.apiCommentList({page, limit, offset:0}).then(d => {
            setComments([...d.results])
            cache[page] = [...d.results];
            all.current = d.count;
        });
    }, [page]);

    useEffect(() => {
        setCommentsTree(createCommentsTree(comments, sorting));
    }, [comments]);

    function addComment(comment) {
        setComments(c => [...c, comment]);
    }

    function load() {
        window.api.apiCommentList({page, limit, offset: comments.length }).then(d => {
            cache[page] = [...cache[page], ...d.results];
            setComments(cache[page])
        });
    }

    return (
        <CommentsContext.Provider value={addComment}>
            <div className={"comments-section"}>
                <p className={'p-2'} id={'counter'}>Всего комментариев: {all.current}</p>
                <CommentsInput callback={addComment}></CommentsInput>
                <div className={"comments"}>
                    <Comments comments={commentsTree}></Comments>
                </div>
                {all.current !== comments.length && <Button onClick={load}>Показать больше</Button>}
            </div>
        </CommentsContext.Provider>
    );
};

export default CommentsContainer;
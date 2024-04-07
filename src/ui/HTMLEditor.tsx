//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import draftToHtml from 'draftjs-to-html';
import {EditorState,ContentState} from 'draft-js';

import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import htmlToDraft from 'html-to-draftjs';

const HtmlEditor = ({clear, value, setHTML}) => {
    const [editor, setEditor] = useState(EditorState.createEmpty())

    useLayoutEffect(() => {
        if (!value) return;
        const contentBlock = htmlToDraft(value);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditor(editorState);
        }
    }, []);

    if (clear && clear.current) {
        setEditor(EditorState.createEmpty());
        clear.current = false;
    }

    return (
        <Editor placeholder={"Напишите комментарий"} onContentStateChange={e => setHTML(draftToHtml(e))}
                editorState={editor}
                onEditorStateChange={setEditor}/>
    );
};

export default HtmlEditor;
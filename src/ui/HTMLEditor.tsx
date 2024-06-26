//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import draftToHtml from 'draftjs-to-html';
import {EditorState,ContentState} from 'draft-js';

import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import htmlToDraft from 'html-to-draftjs';

const HtmlEditor = ({placeholder="", clear, value, setHTML, updateValue=false, simple=false}) => {
    const [editor, setEditor] = useState(EditorState.createEmpty());
    const lastValue = React.useRef('');

    useLayoutEffect(() => {
        if (!value) return;
        lastValue.current = value;
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
        <Editor placeholder={placeholder} onContentStateChange={e => setHTML(draftToHtml(e))}
                editorState={editor}
                onEditorStateChange={setEditor}/>
    );
};

export default HtmlEditor;
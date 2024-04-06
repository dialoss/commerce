//@ts-nocheck
import React, {useState} from 'react';
import draftToHtml from 'draftjs-to-html';
import {EditorState} from 'draft-js';

import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const HtmlEditor = ({setHTML}) => {
    const [editor, setEditor] = useState(EditorState.createEmpty())

    return (
        <Editor onContentStateChange={e => setHTML(draftToHtml(e))}
                editorState={editor}
                onEditorStateChange={setEditor}/>
    );
};

export default HtmlEditor;
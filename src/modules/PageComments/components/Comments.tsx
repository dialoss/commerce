//@ts-nocheck
import React from 'react';
import Comment from "./Comment";

const Comments = ({comments, depth=0}) => {
    return (
        <div className={"comments-block comments-child"}>
            {
                Object.values(comments).map(c =>
                    <div className={'comments-parent'} key={c.comment.id}>
                        <Comment data={c.comment} depth={depth}></Comment>
                        {!!Object.values(c.comments).length &&
                            // <AccordionContainer defaultOpened={true}>
                                <div className="comments-wrapper">
                                    <div className={"comments-connector"}></div>
                                    <Comments depth={depth + 1} comments={c.comments}></Comments>
                                </div>
                            // </AccordionContainer>
                    }
                    </div>
                )
            }
        </div>
    );
};

export default Comments;
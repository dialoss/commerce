//@ts-nocheck
import React from 'react';
import Comments from "./components/CommentsContainer";
import {Container} from "../../ui/Container";
import {useCurrentPath} from "../../tools/routes";

const PageComments = () => {
    const page = useCurrentPath();
    return (
        <div className={"comments"} id={'comments'} style={{marginTop: 50, display: page ? 'block' : 'none'}}>
            <Container>
                <div className="comments__inner">
                    {page && <Comments page={page}></Comments>}
                </div>
            </Container>
        </div>
    );
};

export default PageComments;
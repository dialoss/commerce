//@ts-nocheck
import React, {useLayoutEffect, useRef, useState} from 'react';
import Comments from "./components/CommentsContainer";
import {Container} from "../../ui/Container";
import { useLocation } from 'react-router-dom'

const PageComments = () => {
    const location = useLocation();
    const page = location.pathname + '/';
    return (
        <div className={"comments"} id={'comments'} style={{marginTop:50, display: 'block'}}>
            <Container>
                <div className="comments__inner">
                    <Comments page={page}></Comments>
                </div>
            </Container>
        </div>
    );
};

export default PageComments;
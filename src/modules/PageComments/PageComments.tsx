//@ts-nocheck
import React from 'react';
import Comments from "./components/CommentsContainer";
import {Container} from "../../ui/Container";
import {useLocation} from "react-router-dom";
import {useCurrentPath} from "../../tools/routes";

const PageComments = () => {
    const p = useCurrentPath();
    const location = useLocation();
    const [page, setPage] = React.useState('');
    React.useLayoutEffect(() => {
        if (!p) {
            setPage(null);
            return;
        }
        setPage(window.location.pathname.slice(1));
    }, [location]);
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
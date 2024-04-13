//@ts-nocheck
import App from './components/App';
import {token} from "./api/api";

export const AutodeskModel = ({data}) => {

    return (
        <>
            {token && data.urn && <App {...data} token={token}/>}
        </>
    );
}
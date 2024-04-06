//@ts-nocheck
import App from './components/App';
import {token} from "./api/api";

export const AutodeskModel = ({data}) => {
    return (
        <>
            {token && data.urn && <App urn={data.urn}
                                       token={token}
                                       ui={data.show_ui}
                                       id={data.id}
                                       rotate={data.rotation}/>}
        </>
    );
}
import {matchRoutes, useLocation} from "react-router-dom";

const pages = [
    {path: "/models/:id"},
    {path: "/orders/:id"}
]

export const useCurrentPath = () => {
    const location = useLocation()
    const x = matchRoutes(pages, location);
    if (x) return x[0].route.path;
    return ""
}

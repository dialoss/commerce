//@ts-nocheck
export function createCommentsTree(comments, sorting) {
    let tree = {};
    let links = {};
    for (let com of comments) {
        let c = {
            comment: com,
            comments: {},
        };

        if (!com.parent) {
            tree[com.id] = c
            links[com.id] = tree[com.id].comments
        } else {
            links[com.parent][com.id] = c
            links[com.id] = links[com.parent][com.id]['comments']
        }
    }
    return tree;
}

export function sortFunction(type) {
    let sorting = () => {
    };
    const d = (ds) => new Date(ds).getTime();
    switch (type) {
        case "newest":
            sorting = (a, b) => {
                if (a.parent && b.parent || !a.parent && !b.parent) return d(b.time) - d(a.time);
                if (a.parent && !b.parent) return 1;
                return -1;
            }
            break;
        case "oldest":
            sorting = (a, b) => d(a.time) - d(b.time);
            break;
        case "default":
            sorting = (a, b) => {
                if (!a.parent && !b.parent) return d(b.time) - d(a.time);
                if (a.parent && !b.parent) return -1;
                if (!a.parent && b.parent) return 1;
                if (a.parent && b.parent) return d(a.time) - d(b.time);
            }
            break;
    }
    return sorting;
}

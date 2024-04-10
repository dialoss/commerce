//@ts-nocheck
export function createCommentsTree(comments, sorting, search, limit=null) {
    let newComments = comments.sort((a, b) => a.parent - b.parent);
    search = search.sort((a, b) => a.parent - b.parent);
    let tree = {};
    let links = {};
    let searchPos = 0;

    newComments.forEach(c => {
        if (!search[searchPos]) return;
        let searched = c.id === search[searchPos].id;
        if (searched) searchPos++;
        const comment = {
            searched,
            comment: c,
            comments: {},
        };

        if (!!c.parent) {
            let p = links[c.parent];
            p.comments[c.id] = comment;
            links[c.id] = p.comments[c.id];
            if (searched) p.searched = true;
        } else {
            tree[c.id] = comment;
            links[c.id] = tree[c.id];
        }
    });
    let current = 0;
    function siftTree(tree) {
        for (const comm in tree) {
            current += 1
            if (!tree[comm].searched || current > limit) {
                delete tree[comm];
            } else {
                siftTree(tree[comm].comments);
            }
        }
    }
    siftTree(tree);
    return tree;
}

export function sortFunction(type) {
    let sorting = () => {};
    const d = (ds) => new Date(ds).getTime();
    switch (type) {
        case "newest":
            sorting = (a, b) => d(b.timeSent) - d(a.timeSent);
            break;
        case "oldest":
            sorting = (a, b) => d(a.timeSent) - d(b.timeSent);
            break;
        case "default":
            sorting = (a, b) => {
                if (!a.parent && !b.parent) return d(b.timeSent) - d(a.timeSent);
                if (a.parent && !b.parent) return -1;
                if (!a.parent && b.parent) return 1;
                if (a.parent && b.parent) return d(a.timeSent) - d(b.timeSent);
            }
            break;
    }
    return sorting;
}

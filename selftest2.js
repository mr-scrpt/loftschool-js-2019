function deleteTextNodesRecursive(where) {
    let list = where.childNodes;

    if (list.length > 0) {

        for (let item of list) {
            if (item.nodeType === 3) {
                let parent = item.parentNode;

                parent.removeChild(item);
            }
            if (item) {
                deleteTextNodesRecursive(item)
            }
        }
    }
}
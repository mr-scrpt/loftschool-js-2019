function slice(array, from = 0, to = array.length) {
    const res = [];

    if (to < 0) {
        to = array.length + to;
    }
    if (from < 0) {
        from = array.length + from;
    }

    for (let i = from; i < to; i++) {
        if(array[i] !== undefined) {
            res.push(array[i])
        }
    }

    return res;
}
let arr = [1,2,3,4, false ,6];
console.log(slice(arr,0,10));
console.log(arr.slice(0, 10));
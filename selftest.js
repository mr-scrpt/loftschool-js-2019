(function () {
    const response = await fetch(url);
    const json = await response.json();
    return json.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }

        return 0;
    })
})();
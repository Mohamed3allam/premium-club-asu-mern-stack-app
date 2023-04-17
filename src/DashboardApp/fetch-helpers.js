export const fetchJson = async (url, init = {}) => {
    const res = await fetch(url, init);
    if (!res.ok) {
        throw new Error(`${res.status}: ${await res.text()}`);
    }
    return res.json();
};
  
  // get JSON from multiple URLs and pass to setters
export const fetchAndSetAll = async (collection) => {
    // fetch all data first
    const allData = await Promise.all(
    collection.map(({ url, init }) => fetchJson(url, init))
    );

    // iterate setters and pass in data
    collection.forEach(({ setter }, i) => {
    setter(allData[i]);
    });
};
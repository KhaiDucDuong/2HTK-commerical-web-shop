async function fetchData(url) {
    try {
        let response = await fetch(url, { method: 'GET' });
        let data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
        return [];
    }
}

export async function GetShopbyID(ID) {
    let url = `http://localhost:8080/api/shops?ID=` + ID;
    const Shop = await fetchData(url);
    return Shop;
}
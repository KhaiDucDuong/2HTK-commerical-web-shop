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

export async function AllCategory() {
    let url = `http://3.17.159.40:8080/api/category`;
    const Category = await fetchData(url);
    return Category;
}
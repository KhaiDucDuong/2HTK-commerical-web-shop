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
    let url = `https://192.168.1.31:8080/api/category`;
    const Category = await fetchData(url);
    return Category;
}
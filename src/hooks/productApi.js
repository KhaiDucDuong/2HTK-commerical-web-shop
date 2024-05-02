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

export async function AllProducts() {
    let url = `http://localhost:8080/api/products/category`;
    const productList = await fetchData(url);
    return productList;
}

export async function findProducts(name) {
    let url = `http://localhost:8080/api/products/category?search=` + name;
    const productList = await fetchData(url);
    return productList;
}

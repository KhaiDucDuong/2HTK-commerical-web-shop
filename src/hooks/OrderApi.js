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

export async function AllOrdersBySellers(ID) {
    let url = `http://3.17.159.40:8080/api/orders/getSellerOrder/` + ID;
    const orderListBySeller = await fetchData(url);
    return orderListBySeller;
}

export async function AllOrdersByUser(ID){
    let url = `http://3.17.159.40:8080/api/orders/getUserOrder/` + ID;
    const orderListBySeller = await fetchData(url);
    return orderListBySeller;
}
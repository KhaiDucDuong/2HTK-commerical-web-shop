async function fetchData(url, jwt = "") {
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt}`,
      },
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

export async function AllOrdersBySellers(ID) {
  let url = `http://localhost:8080/api/orders/getSellerOrder/` + ID;
  const orderListBySeller = await fetchData(url);
  return orderListBySeller;
}

export async function AllOrdersByUser(jwt) {
  let url = `http://localhost:8080/api/orders/getUserOrder`;
  const orderListBySeller = await fetchData(url, jwt);
  return orderListBySeller;
}

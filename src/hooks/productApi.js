import { fetchApi } from "./useFetch";

async function fetchData(url) {
  try {
    let response = await fetch(url, { method: "GET" });
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
export async function findProductsByCategory(ID) {
  let url = `http://localhost:8080/api/products/category?ID=` + ID;
  const productList = await fetchData(url);
  return productList;
}

export async function sendAddProductToCartRequest(
  userId,
  productId,
  quantity,
  color,
  size
) {
  //console.log(values)
  const jsonData = JSON.stringify({
    productId: productId,
    quantity: quantity,
    color: color,
    size: size,
  });

  const response = await fetchApi(
    process.env.REACT_APP_ADD_TO_CART_API + userId,
    "POST",
    jsonData
  );

  const data = await response.json();
  return data;
}

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

export async function GetShopbyID(ID) {
  let url = `http://localhost:8080/api/shops?ID=` + ID;
  const Shop = await fetchData(url);
  return Shop;
}

export async function fetchUserShop(userId) {
  const response = await fetchApi(
    process.env.REACT_APP_GET_USER_SHOP_API + userId,
    "GET"
  );
  const data = await response.json();
  return data;
}

export async function GetShopDetailbyID(ID) {
  let url = `http://localhost:8080/api/shops/getShopDetails/` + ID;
  const Shop = await fetchData(url);
  return Shop;
}

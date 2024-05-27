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
  let url = `http://3.147.78.250:8080/api/products/category`;
  const productList = await fetchData(url);
  return productList;
}

export async function findProducts(name) {
  let url = `http://3.147.78.250:8080/api/products/category?search=` + name;
  const productList = await fetchData(url);
  return productList;
}
export async function findProductsByCategory(ID) {
  let url = `http://3.147.78.250:8080/api/products/category?ID=` + ID;
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

export async function GetProductByID(ID) {
  let url = `http://3.147.78.250:8080/api/products/detail?product=` + ID;
  try {
  const product = await fetchData(url);
  return product;
  }
  catch (error) {
    console.log("error", error);
    return [];
  }
}

export async function sendUpdateProductImgRequest(productId, color, size, productImgInputId) {
  const formData = new FormData();
  try {
  const fileInput = document.querySelector("#" + productImgInputId);
  // console.log(document.querySelector("#shopImageFileForm"))
  // console.log(shopImageFile)
  if (fileInput.files[0] == null) {
    alert("Please upload an image!");
    return;
  }

  formData.append("image", fileInput.files[0]);
  formData.append("color", color);
  formData.append("size", size);

  // console.log(process.env.REACT_APP_UPDATE_SHOP_IMAGE_API + shopData._id)
  // console.log(formData)
  
    const response = await fetch(
      process.env.REACT_APP_UPDATE_PRODUCT_IMAGE + productId,
      {
        method: "PUT",
        body: formData,
      }
    );

    const data = await response.json();
    return data;
  } catch (e) {
    alert("Failed to update shop image!");
  }
}

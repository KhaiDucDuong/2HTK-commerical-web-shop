import  { useState, useEffect } from 'react'

export function AllProducts(){
    let url = `http://localhost:8080/products/category`;
    let [productList, setProductList] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
        try {
            let response = await fetch(url, {method: 'GET' });
            let data = await response.json();
            setProductList(data);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
}, []);
return productList;
}
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ShopProduct(props) {
  const { product } = props;
  const productImgPath = product.productVariations[0].image
    ? product.productVariations[0].image
    : "../../images/NO_IMG.png";
  return (
    <Card style={{ width: "290px", marginBottom: "15px" }}>
      <Card.Img variant="top" src={productImgPath} style={{width: "288px", height: "288px"}}/>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button variant="primary">View Product</Button>
      </Card.Body>
    </Card>
  );
}

export default ShopProduct;

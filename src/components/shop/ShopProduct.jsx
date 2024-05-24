import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function ShopProduct(props) {
  const { product } = props;
  const productImgPath = product.productVariations[0].image
    ? product.productVariations[0].image
    : "../../images/NO_IMG.png";
  return (
    <Card style={{ width: "290px", marginBottom: "15px" }}>
      <Card.Img
        variant="top"
        src={productImgPath}
        style={{ width: "288px", height: "288px" }}
      />
      <Card.Body>
        <Card.Title
          style={{
            height: "50px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </Card.Title>
        <Card.Text
          style={{
            height: "75px",
            overflow: "hidden",
            marginBottom: "5px",
            textOverflow: "ellipsis",
          }}
        >
          {product.description}
        </Card.Text>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            justifySelf: "end",
          }}
        >
          <Card.Text style={{ fontStyle: "italic", marginBottom: "5px" }}>
            {product.productVariations[0].price}
          </Card.Text>
          {/* <Button variant="primary">View Product</Button> */}
          <Link
            to={`/product/detail?product=${product._id}`}
            reloadDocument
            className="text-decoration-none btn btn-info"
          >
            View Product
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ShopProduct;

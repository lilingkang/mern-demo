import React from "react";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className="py-3 my-3">
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </a>
      </Card.Body>
    </Card>
  );
};

export default Product;

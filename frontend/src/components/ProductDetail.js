import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data))
      .catch((err) => console.error("Error loading product", err));
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ₹{product.retail_price}</p>
      <p><strong>SKU:</strong> {product.sku}</p>
    </div>
  );
}

export default ProductDetail;

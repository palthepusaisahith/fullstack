import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch((err) => console.error("Error loading products", err));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: "pointer" }}>
            {p.name} - ₹{p.retail_price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;

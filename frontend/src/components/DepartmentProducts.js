import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DepartmentProducts() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/departments/${id}/products`)
      .then(res => res.json())
      .then(data => {
        setDepartment(data.department);
        setProducts(data.products);
      });
  }, [id]);

  if (!department) return <p>Loading...</p>;

  return (
    <div>
      <h2>{department}</h2>
      <p>Product Count: {products.length}</p>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>
            {prod.name} - ₹{prod.price}
          </li>
        ))}
      </ul>
      <Link to="/">⬅ Back to All Departments</Link>
    </div>
  );
}

export default DepartmentProducts;

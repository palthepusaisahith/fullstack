import React, { useEffect, useState } from 'react';

function App() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:33400/api/departments')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched departments:', data);
        // Adjust below line based on your backend response structure
        const deptArray = Array.isArray(data) ? data : data.data;
        setDepartments(deptArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>🛍️ E-commerce App<br />Loading departments...</div>;
  }

  return (
    <div>
      <h1>🛍️ E-commerce App</h1>
      <ul>
        {Array.isArray(departments) && departments.map((dept) => (
          <li key={dept.id}>{dept.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;


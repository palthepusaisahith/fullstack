import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

 useEffect(() => {
  fetch('http://localhost:33400/api/departments')
    .then(res => res.json())
    .then(data => setDepartments(data.data))
    .catch(err => console.error(err));
}, []);

  return (
    <div>
      <h2>Departments</h2>
      <ul>
        {departments.map(dept => (
          <li key={dept.id}>
            <Link to={`/departments/${dept.id}`}>{dept.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentList;

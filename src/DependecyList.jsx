import React from 'react';
import { Link } from "react-router-dom";

function DependencyList({ title, packageData }) {
  return (
    <div className="dependecy-list">
      <p className="dependecy-list__header">{title}</p>
      <ul>
        {packageData && packageData.dependencies && packageData.dependencies.map(dependency => (
          <li>
            <Link to={`/packages/${dependency}`}>{dependency}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DependencyList

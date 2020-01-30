import React from 'react';
import { Link } from "react-router-dom";

function DependencyListItem({ dependency, packageMap }) {
  const isArray = Array.isArray(dependency)

  if(isArray) return (
    <li className="dependecy-list__item dependecy-list__item--has-options">
      {dependency.map(optDependecy => (
        packageMap[optDependecy]
        ? <Link 
            to={`/packages/${optDependecy}`}
            key={optDependecy}
          >
            {optDependecy}
          </Link>
        : <p key={optDependecy}>{optDependecy}</p>
      ))}
    </li>
  );

  return (
    packageMap[dependency] 
      ? <li className="dependecy-list__item">
          <Link to={`/packages/${dependency}`}>{dependency}</Link>
        </li>
      : <li className="dependecy-list__item">
          <p>{dependency}</p>
        </li>
  );
}

function DependencyList({ title, packageData, packageMap, accessor }) {
  return (
    <div className="dependecy-list">
      <p className="dependecy-list__header">{title}</p>
      <ul>
        {packageData && packageData[accessor] && packageData[accessor].map(dependency => (
          <DependencyListItem key={dependency} dependency={dependency} packageMap={packageMap} />
        ))}
      </ul>
    </div>
  )
}

export default DependencyList

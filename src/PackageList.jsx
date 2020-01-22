import React from 'react';
import { Link } from "react-router-dom";

function PackageListItem({ name, description }) {
  console.log('package list item: ', name)
  return (
    <li>
      <Link to={`/packages/${name}`}>      {name}</Link>

    </li>
  )
}

function PackageList({ packageNames }) {
  return (
    <ul className="packagelist">
      {packageNames.map(name =>
        <PackageListItem key={name} name={name} />
      )}
    </ul>
  )
}

export default PackageList

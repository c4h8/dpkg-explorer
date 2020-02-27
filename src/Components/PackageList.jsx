import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { storeContext } from '../StoreProvider';

function PackageListItem({ name }) {
  return (
    <li>
      <Link to={`/packages/${name}`}>{name}</Link>
    </li>
  )
}

function PackageList() {
  const state = useContext(storeContext)

  if(!state || !state.packageNames)
    return null;

  return (
    <ul className="packagelist">
      {console.log("rendered filelist")}
      {state.packageNames.map(name =>
        <PackageListItem key={`${name}`} name={name} />
      )}
    </ul>
  )
}

export default PackageList;

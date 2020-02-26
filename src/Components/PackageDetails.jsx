import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import DependencyList from './DependecyList';
import { storeContext } from '../StoreProvider';

function PackageDetails({ match: {params: {packageName}} }) {
  const state = useContext(storeContext)

  if(!state || !state.packageNames || !state.packageMap)
    return <Redirect to="/" />

  const packageData = state.packageMap[packageName]

  return (
    <div className="package-details__container">
      <p className="package-details__header">
        {packageData && packageData.name}
      </p>
      <span className="package-details__description">
        {packageData && packageData.description}
      </span>
      <DependencyList 
        title="Dependencies" 
        accessor="dependencies"
        packageData={packageData}
        packageMap={state.packageMap} />
      <DependencyList 
        title="Reverse Dependencies" 
        accessor="reverseDependencies"
        packageData={packageData}
        packageMap={state.packageMap} />
    </div>
  )
}

export default PackageDetails

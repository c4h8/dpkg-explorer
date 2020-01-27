import React, { useState, useEffect } from 'react';
import DependencyList from './DependecyList';

function PackageDetails({ packageMap, match: {params: {packageName}} }) {
  const [packageData, setPackageData] = useState({})
  
  useEffect(() => {
    if(packageMap && packageName) {
      setPackageData(packageMap[packageName])
    }
  }, [packageMap, packageName])

  return (
    <div className="package-details__container">
      <p className="package-details__header">{packageData && packageData.name}</p>
      <span>{packageData && packageData.description}</span>
      <DependencyList title="Dependencies" packageData={packageData} />
    </div>
  )
}

export default PackageDetails

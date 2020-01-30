export const actionTypes = {
  SET_PACKAGE_DATA: 'SET_PACKAGE_DATA'
}

export function setPackageData(packageNames = {}, packageMap = {}) {
  return ({
    type: actionTypes.SET_PACKAGE_DATA,
    packageNames: packageNames,
    packageMap: packageMap
  })
}
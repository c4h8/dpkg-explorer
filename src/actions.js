export const actionTypes = {
  SET_PACKAGE_DATA: 'SET_PACKAGE_DATA',
  DELETE_PACKAGE_DATA: 'DELETE_PACKAGE_DATA'
}

export function setPackageData(packageNames, packageMap, fileName) {
  return ({
    type: actionTypes.SET_PACKAGE_DATA,
    packageNames: packageNames,
    packageMap: packageMap,
    fileName: fileName
  })
}

export function deletePackageData() {
  return ({
    type: actionTypes.DELETE_PACKAGE_DATA,
  })
}

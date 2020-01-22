import React, { useRef } from 'react';

const parseAttribute = (name) => (input) => {
  const res = RegExp(`${name}: ([^]*?)(?=\n[^ ])`).exec(input)
  return res
    ? res[1]
    : undefined
}

const parsePackage = parseAttribute('Package')
const parseDescription = parseAttribute('Description')

const parseDependecies = input => {
  const res = parseAttribute('Depends')(input)

  return res && res.split(', ')
}

function parseFile(file) {
  let packageBlobs = file
    .split('\r\n').join('\n')
    .split('\n\n')
    .map(p => p.concat('\n'))

  let packages = packageBlobs.map(blob => ({
    name: parsePackage(blob),
    description: parseDescription(blob),
    dependecies: parseDependecies(blob),
    reverseDependencies: []
  }));

  const packageMap = {}
  packages.forEach(p => {
    packageMap[p.name] = p
  });

  const packageNames = packages.map(p => p.name)

  console.log('res2', packages)

  return [packageNames, packageMap];
}

export default parseFile;

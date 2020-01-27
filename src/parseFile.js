const parseAttribute = (name) => (input) => {
  const res = RegExp(`${name}: ([^]*?)(?=\n[^ ])`).exec(input)
  return res
    ? res[1]
    : undefined
}

const parsePackage = parseAttribute('Package')
const parseDescription = parseAttribute('Description')
const stripVersionNumbers = input => input.replace(/(\s*\([\S\s]+?\))/, '')

const splitOptionalDeps = input => {
  if(input.includes('|'))
    return input.split(' | ')
  return input
}

const parseDependecies = input => {
  const res = parseAttribute('Depends')(input)

  if(!res)
    return undefined
  
  return res.split(', ')
    .map(stripVersionNumbers)
    .map(splitOptionalDeps)
}

function parseFile(file) {
  const packageBlobs = file
    .split('\r\n').join('\n')
    .split('\n\n')
    .map(p => p.concat('\n'))

  let packages = packageBlobs.map(blob => ({
    name: parsePackage(blob),
    description: parseDescription(blob),
    dependencies: parseDependecies(blob),
    reverseDependencies: []
  }));

  const packageNames = packages
    .map(p => p.name)
    .sort();

  let packageMap = {}
  packages.forEach(p => {
    packageMap[p.name] = p
  });

  packages.forEach(p => {
    const name = p.name

    p.dependencies && p.dependencies.forEach(dependecy => {
      if(packageMap[dependecy.name]) {
        // TODO map optional dependencies
        packageMap[dependecy.name].reverseDependencies.concat(name)
      }
    })
  });

  console.log('res2', packages)

  return [packageNames, packageMap];
}

export default parseFile;

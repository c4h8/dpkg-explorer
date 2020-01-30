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
  try {
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

      p.dependencies && p.dependencies.flat().forEach(dependecy => {
        if(packageMap[dependecy]) {
          packageMap[dependecy].reverseDependencies.push(name)
        }
      })
    });

    return [undefined, packageNames, packageMap];

  } catch(error) {
    return [error]
  }
}

export default parseFile;

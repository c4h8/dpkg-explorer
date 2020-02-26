const parseAttribute = (name) => (input) => {
  const res = RegExp(`${name}: ([^]*?)(?=\n[^ ])`).exec(input)
  return res
    ? res[1]
    : undefined
}

const parsePackage = parseAttribute('Package')
const parseDescription = parseAttribute('Description')
const stripVersionNumbers = input => input.replace(/(\s*\([\S\s]+?\))/, '')

const removeDuplicates = (arr) => {
  return [...(new Set(arr))]
}

const splitOptionalDeps = input => {
  if(input.includes('|'))
    return removeDuplicates(input.split(' | ')).sort()
  return input
}

const parseDependecies = input => {
  const res = parseAttribute('Depends')(input)

  if(!res)
    return undefined
  
  return removeDuplicates(res
    .split(', ')
    .map(stripVersionNumbers)
    .map(splitOptionalDeps)
    .sort());
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
      reverseDependencies: new Set([])
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

      p.dependencies && p.dependencies.flat().forEach(dependency => {
        if(packageMap[dependency])
          packageMap[dependency].reverseDependencies.add(name)
      })
    });

    packages.forEach(p => p.reverseDependencies = [...p.reverseDependencies ].sort())

    return [undefined, packageNames, packageMap];

  } catch(error) {
    return [error]
  }
}

export default parseFile;

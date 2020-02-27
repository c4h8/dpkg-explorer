
// parse one field of a .real file
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

// parses a .real file
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

    // create a sorted list of package names
    const packageNames = packages
      .map(p => p.name)
      .sort();

    // map package names to package data
    let packageMap = {}
    packages.forEach(p => {
      packageMap[p.name] = p
    });

    // construct reverse dependencies
    packages.forEach(p => {
      const name = p.name

      p.dependencies && p.dependencies.flat().forEach(dependency => {
        if(packageMap[dependency])
          packageMap[dependency].reverseDependencies.add(name)
      })
    });

    // transform reverse dependencies for a set to an array
    packages.forEach(p => p.reverseDependencies = [...p.reverseDependencies ].sort())

    return [undefined, packageNames, packageMap];
  } catch(error) {
    return [error]
  }
}

export default parseFile;

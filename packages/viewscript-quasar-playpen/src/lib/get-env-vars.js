const ENV_VAR = [
  {
    name: 'VIEWSCRIPT_ROOT_PATH',
    addQuotes: true
  }
]

module.exports = function () {
  const result = {}
  let missingVar = false
  ENV_VAR.forEach(variable => {
    const value = process.env[variable.name]
    if (value === undefined) {
      missingVar = true
      console.error(`Missing environment variable '${variable.name}'.`)
    } else {
      result[`$${variable.name}`] = variable.addQuotes ? `'${value}'` : value
    }
  })
  if (missingVar) {
    throw new Error("At least one Environment Variable hasn't been set... see above and README.md!")
  }
  return result
}

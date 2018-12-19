module.exports = function (definition) {
  return {
    type: 'FactSet',
    facts: definition.config.properties.map(({ prompt, dataPath, showIfUndefined }) => {
      return {
        title: prompt,
        value: `{{data.${dataPath}}}`
      }
    })
  }
}

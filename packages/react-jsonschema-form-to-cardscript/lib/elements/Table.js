module.exports = function (definition) {
  return {
    type: 'Table',
    title: definition.config.header,
    arrayPath: definition.config.dataPath,
    columns: definition.config.columns.map(({ header, dataPath }) => {
      return {
        title: header,
        field: dataPath
      }
    })
  }
}

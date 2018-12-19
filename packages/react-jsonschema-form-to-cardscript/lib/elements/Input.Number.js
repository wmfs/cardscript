module.exports = function (definition) {
  const { id, schema } = definition

  return [{
    type: 'Input.Number',
    id,
    title: schema.title
  }]
}

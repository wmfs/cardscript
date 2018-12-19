module.exports = function (definition) {
  const { id, schema } = definition

  return [{
    type: 'Input.Date',
    id,
    title: schema.title,
    spacing: 'medium'
  }]
}

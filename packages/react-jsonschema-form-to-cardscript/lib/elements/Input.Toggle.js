module.exports = function (definition) {
  const { id, schema } = definition

  return [{
    type: 'Input.Toggle',
    id,
    title: schema.title,
    spacing: 'medium'
  }]
}

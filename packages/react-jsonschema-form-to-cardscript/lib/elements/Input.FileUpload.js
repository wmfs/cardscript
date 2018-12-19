module.exports = function (definition) {
  const { id, schema } = definition

  return [{
    type: 'Input.FileUpload',
    id,
    title: schema.title,
    spacing: 'medium'
  }]
}

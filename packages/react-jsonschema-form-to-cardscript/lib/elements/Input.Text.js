module.exports = function (definition, type) {
  const { id, schema, uiSchema, editor } = definition

  const result = [{
    type: 'Input.Text',
    id,
    title: schema.title,
    spacing: 'medium'
  }]

  if (uiSchema['ui:placeholder']) result.placeholder = uiSchema['ui:placeholder']

  if (editor) {
    result[0].editor = true
    result.unshift({
      type: 'TextBlock',
      text: schema.title,
      spacing: 'medium',
      wrap: true
    })
  }

  return result
}

module.exports = function (definition) {
  const { id, schema, uiSchema } = definition

  const result = [{
    id,
    title: schema.title,
    type: 'Input.ChoiceSet',
    spacing: 'medium',
    choices: []
  }]

  switch (uiSchema['ui:widget']) {
    case 'selectField':
      result[0].style = 'compact'
      result[0].choices = schema.enum.map((value, idx) => {
        return {
          title: schema.enumNames[idx],
          value
        }
      })
      break
    case 'radioField':
      result[0].style = 'expanded'
      result[0].choices = schema.enum.map((value, idx) => {
        return {
          title: schema.enumNames[idx],
          value
        }
      })
      break
    case 'checkField':
      result[0].isMultiSelect = true
      result[0].choices = schema.enum.map((value, idx) => {
        return {
          title: schema.enumNames[idx],
          value
        }
      })
      break
    case 'questionnaire':
      result[0].style = 'expanded'
      result[0].choices = schema.items.map(value => {
        return {
          title: value.label,
          value: value.value
        }
      })
      break
  }

  return result
}

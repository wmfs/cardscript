module.exports = function (definition) {
  const { id, schema } = definition

  return [
    {
      type: 'TextBlock',
      text: schema.title,
      wrap: true,
      spacing: 'large'
    },
    {
      type: 'Input.Slider',
      id,
      min: schema.minimum,
      max: schema.maximum,
      step: schema.step,
      value: schema.minimum
    }
  ]
}

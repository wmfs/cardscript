module.exports = function (definition, type) {
  const { schema } = definition

  return [{
    type: 'Collapsible',
    title: schema.title,
    spacing: 'medium',
    card: {
      type: 'AdaptiveCard',
      body: [{
        type: 'TextBlock',
        text: schema.text,
        wrap: true
      }]
    }
  }]
}

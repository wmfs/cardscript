module.exports = function jsonSchemaToCardscript (jsonSchema, options) {
  const cardscript = {
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.0',
    type: 'AdaptiveCard',
    body: []
  }
  return cardscript
}

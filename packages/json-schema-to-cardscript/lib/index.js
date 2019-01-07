const processOptions = require('./process-options')
const jumbotronGenerator = require('./element-generators/jumbotron')
const addElementsFromProperties = require('./add-elements-from-properties')

module.exports = function jsonSchemaToCardscript (jsonSchema, originalOptions) {
  const options = processOptions(jsonSchema, originalOptions)
  const cardscript = {
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.0',
    type: 'AdaptiveCard',
    body: [],
    actions: [
      {
        type: 'Action.Cancel',
        title: 'Cancel'
      },
      {
        type: 'Action.Submit',
        title: 'Submit'
      }
    ]
  }

  console.log(JSON.stringify(options, null, 2))

  console.log('--------------------------------------')
  console.log(jsonSchema, null, 2)
  console.log('--------------------------------------')

  // Add a Jumbotron
  cardscript.body.push(...jumbotronGenerator(null, null, options))

  addElementsFromProperties(jsonSchema, cardscript.body, options)

  return cardscript
}

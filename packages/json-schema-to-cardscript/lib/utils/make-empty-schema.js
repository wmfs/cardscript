module.exports = function makeEmptySchema (options) {
  const schema = {
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.0',
    type: 'AdaptiveCard',
    body: [],
    actions: []
  }

  schema.actions.push(
    {
      type: 'Action.Cancel',
      title: 'Cancel'
    }
  )

  schema.actions.push(
    {
      type: 'Action.Submit',
      title: 'Submit'
    }
  )
  return schema
}

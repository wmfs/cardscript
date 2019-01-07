const _ = require('lodash')

const TITLE_SUFFIXES = {
  'editing': 'Editor',
  'creating': 'Maker'
}

module.exports = function processOptions (jsonSchema, originalOptions) {
  let options = _.cloneDeep(originalOptions || {})
  options = _.defaults(
    options,
    {
      purpose: 'editing',
      schemaFilename: 'unknown.json',
      schemaTitle: jsonSchema.title,
      schemaDescription: jsonSchema.description
    }
  )

  // Stripped filename (useful if no title/description provided)
  // 'some-thing.json' => 'some thing'
  // 'someThing/json' => 'some thing'
  options.strippedFilename = options.schemaFilename.split('.')[0]
  options.strippedFilename = _.kebabCase(options.strippedFilename)
  options.strippedFilename = options.strippedFilename.replace(/-/g, ' ')

  if (!options.title) {
    options.simpleTitle = options.schemaTitle || _.upperFirst(options.strippedFilename)
    options.cardscriptTitle = `${options.simpleTitle} ${TITLE_SUFFIXES[options.purpose]}`
  }
  return options
}

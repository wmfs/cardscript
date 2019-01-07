// const makeBaseElement = require('./utils/make-base-element')
module.exports = function jumbotronElementGenerator (key, config, options) {
  const jumbotronElement = {
    type: 'Jumbotron',
    title: options.cardscriptTitle
  }
  let description
  if (options.description) {
    description = ` (${options.description})`
  } else {
    description = ''
  }
  jumbotronElement.subtitle = `A form for ${options.purpose} a ${options.simpleTitle}${description}.`
  return [jumbotronElement]
}

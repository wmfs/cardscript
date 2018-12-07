module.exports = function (definition, options) {
  const { separator } = definition
  let div = '<div class="row"'
  if (separator) div += ` style="border-top: 1px solid rgb(238, 238, 238); margin-top: 8px; padding-top: 8px;"`
  div += '>'
  return div
}

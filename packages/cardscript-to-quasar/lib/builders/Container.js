module.exports = function (definition, options) {
  let card = '<q-card class="q-mb-md"'

  if (definition.hasOwnProperty('showWhen')) card += ` v-if="${definition.showWhen}"`
  if (definition.hasOwnProperty('id')) card += ` id="${definition.id}"`

  card += '> <q-card-main>'
  return card
}

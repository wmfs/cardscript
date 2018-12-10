module.exports = function (definition, options, idx) {
  const { title } = definition
  const name = `tab-${idx}`
  return `<q-tab slot="title" ${idx === 0 ? 'default' : ''} name="${name}" label="${title}" /><q-tab-pane name="${name}">`
}

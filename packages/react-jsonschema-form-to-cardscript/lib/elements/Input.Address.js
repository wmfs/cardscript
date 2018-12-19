module.exports = function (definition) {
  const { id } = definition

  return [{
    type: 'Input.Address',
    id
  }]
}

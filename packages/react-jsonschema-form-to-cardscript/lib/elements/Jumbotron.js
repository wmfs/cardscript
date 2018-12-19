module.exports = function (definition) {
  const { title, subtitle } = definition

  return {
    type: 'Jumbotron',
    title,
    subtitle
  }
}

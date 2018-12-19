module.exports = function (definition) {
  return {
    type: 'ActionSet',
    actions: definition.config.launches.map(({ title, stateMachineName, input }) => {
      return {
        type: 'Action.Submit', // change this
        title
      }
    })
  }
}

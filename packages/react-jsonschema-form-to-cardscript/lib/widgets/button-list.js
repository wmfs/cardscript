module.exports = class ButtonList {
  constructor (options) {
    this.widget = {
      id: 'actions',
      type: 'buttonList',
      attributes: {
        heading: 'Actions',
        actions: options.config.launches.map(action => {
          return { title: action.title }
        })
      }
    }
  }
}

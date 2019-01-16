module.exports = class Settings {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
    this.executions = client.executions
  }

  async persistFromUserQuery (userQuery) {
    const { settings } = userQuery
    await this.db.settings.put({ id: 'settings', settings })
  }

  async load () {
    const settings = await this.db.settings.toArray()
    this.store.commit('app/settings', settings[0])
  }

  apply () {
    // get settings from this.store
    // update this.db
    // call stateMachine to save settings
  }
}

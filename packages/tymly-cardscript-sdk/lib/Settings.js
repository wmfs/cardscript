module.exports = class Settings {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
    this.token = client.options.token
    this.executions = client.executions
  }

  async persistFromUserQuery (userQuery) {
    const { settings } = userQuery
    await this.db.settings.put({ id: 'settings', settings })
  }

  async load () {
    const { settings } = await this.db.settings.get('settings')
    this.store.commit('app/settings', settings)
  }

  async apply () {
    const { settings } = this.store.state.app
    await this.db.settings.put({ id: 'settings', settings })
    await this.executions.execute({
      stateMachineName: 'tymly_applySettings_1_0',
      input: {
        settings
      },
      token: this.token
    })
  }
}

module.exports = class Settings {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
    this.stateMachine = client.stateMachine
  }

  persistFromUserQuery (userQuery) {
    // userQuery.settings
    // write to this.db in settings table
  }

  load () {
    // get from this.db
    // put onto this.store
  }

  apply () {
    // get settings from this.store
    // update this.db
    // call stateMachine to save settings
  }
}

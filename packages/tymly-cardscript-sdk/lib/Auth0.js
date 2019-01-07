module.exports = class Auth0 {
  constructor (options) {

  }

  init (client) {
    this.db = client.db
    this.store = client.options.store
  }

  storeToken () {
    // write to indexedDB
    this.db.something() // put() ?
  }

  loadToken () {
    // get from this.db
    // add to this.store
  }

  getToken () {
    // get from this.store
  }

  // silently refresh every half an hour if app active
  startRefreshTimer () {}

  cancelRefreshTimer () {}
}

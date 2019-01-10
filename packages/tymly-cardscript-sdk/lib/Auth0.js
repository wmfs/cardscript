// const auth0 = require('auth0-js')

module.exports = class Auth0 {
  // constructor (options) {}

  init (client) {
    console.log('init auth')
    this.db = client.db
    this.store = client.options.store
    // this.webAuth = new auth0.WebAuth({
    //   domain: '',
    //   clientID: '',
    //   redirectUri: '',
    //   audience: '',
    //   responseType: '',
    //   scope: ''
    // })
  }

  storeToken () {
    const token = 123
    // this.db.auth.put(token)
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

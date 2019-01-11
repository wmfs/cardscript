module.exports = class Auth0 {
  // constructor (options) {}

  async init (client) {
    this.db = client.db
    this.store = client.options.store
    this.token = client.options.token

    if (this.token) {
      await this.storeToken(this.token)
    }
  }

  async storeToken (token) {
    await this.db.auth.put({ id: 'token', token })
  }

  async loadToken () {
    const data = await this.db.auth.toArray()
    this.store.commit('auth/token', data[0].token)
  }

  getToken () {
    // get from this.store
  }

  // silently refresh every half an hour if app active
  startRefreshTimer () {}

  cancelRefreshTimer () {}
}

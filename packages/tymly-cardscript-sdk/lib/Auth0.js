module.exports = class Auth0 {
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
    const { token } = await this.db.auth.get('token')
    this.store.commit('auth/token', token)
  }

  getToken () {
    return this.store.state.auth.token
  }

  // silently refresh every half an hour if app active
  startRefreshTimer () {}

  cancelRefreshTimer () {}
}

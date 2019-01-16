const axios = require('axios')

module.exports = class Auth0 {
  constructor (options) {
    this.options = options
    this.token = null
  }

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

  async setTokenFromRequest () {
    const { data } = await axios.request({
      method: 'post',
      url: `https://${this.options.domain}/oauth/token`,
      data: {
        grant_type: this.options.grant_type,
        client_id: this.options.client_id,
        client_secret: this.options.client_secret,
        audience: this.options.audience
      }
    })

    this.token = data.access_token
    return this.token
  }

  // silently refresh every half an hour if app active
  startRefreshTimer () {
    // todo
  }

  cancelRefreshTimer () {
    // todo
  }
}

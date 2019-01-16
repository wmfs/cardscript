const axios = require('axios')

module.exports = class Auth0 {
  constructor (options) {
    this.options = options
    this.token = null
    this.timestamp = null
  }

  init (client) {
    this.db = client.db
    this.store = client.options.store
  }

  async persistToken () {
    await this.db.auth.put({ id: 'token', token: this.token })
  }

  async loadToken () {
    const { token } = await this.db.auth.get('token')
    this.store.commit('auth/token', token)
  }

  async setToken (token) {
    this.token = token
    this.timestamp = new Date()

    await this.persistToken()
    await this.loadToken()
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

    await this.setToken(data.access_token)
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

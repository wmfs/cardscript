module.exports = class Watching {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
  }

  async persistFromUserQuery (userQuery) {
    const { watching } = userQuery

    await this.db.watching.clear()

    for (const w of Object.values(watching)) {
      await this.db.watching.put(w)
    }
  }

  async load () {
    const data = await this.db.watching.toArray()
    this.store.commit('app/watching', data)
  }

  watch (cardId) {}

  unwatch (cardId) {}

  loadWatching () {
    // this would be called from watching page

    // const { offset, limit, filter } = options
    // get from this.db
    // add result to vuex this.store
  }
}

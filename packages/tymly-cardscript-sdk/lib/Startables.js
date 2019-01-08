module.exports = class Startables {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
  }

  async persistFromUserQuery (userQuery) {
    const { startable } = userQuery.add
    for (const s of Object.values(startable)) {
      await this.db.startables.put(s)
    }
  }

  async load () {
    const data = await this.db.startables.toArray()
    this.store.commit('startables', data)
  }

  favour (id) {
    // add startable to favourites
    // update indexedDb
  }

  unfavour (id) {
    // remove startable from favourites
    // update indexedDb
  }
}

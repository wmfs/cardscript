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

    // const { favouriteStartableNames } = userQuery
    // for (const s of favouriteStartableNames) {
    //   await this.db.favourites.put(s)
    // }
  }

  async load () {
    const data = await this.db.startables.toArray()
    this.store.commit('startables', data)
  }

  favour (id) {
    this.store.commit('favour', id)
    // add record if doesn't already exist

    // favouriteStartableNames
    // add startable to favourites
    // update indexedDb
  }

  unfavour (id) {
    this.store.commit('unfavour', id)
    // remove record if exists

    // remove startable from favourites
    // update indexedDb
  }
}

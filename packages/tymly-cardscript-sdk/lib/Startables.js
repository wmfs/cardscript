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
    // if (favouriteStartableNames.length > 0) {
    //   await this.db.favourites.put({ favourites: favouriteStartableNames })
    // }
  }

  async load () {
    const data = await this.db.startables.toArray()
    this.store.commit('startables', data)

    // get favourites from indexeddb
    // commit to store
  }

  favourite (id) {
    this.store.commit('favourite', id)
    // add record if doesn't already exist
    // update indexedDb
  }

  unfavourite (id) {
    this.store.commit('unfavourite', id)
    // remove record if exists
    // update indexedDb
  }
}

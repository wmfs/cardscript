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

    const { favouriteStartableNames } = userQuery
    await this.db.favourites.put({ id: 'favourites', favourites: favouriteStartableNames })
  }

  async load () {
    const startables = await this.db.startables.toArray()
    this.store.commit('app/startables', startables)

    const favourites = await this.db.favourites.toArray()
    this.store.commit('app/favourites', favourites[0].favourites)
  }

  // todo: probably refactor these
  async favourite (id) {
    this.store.commit('app/favourite', id)

    const favourites = await this.db.favourites.toArray()
    if (!favourites[0].favourites.includes(id)) favourites[0].favourites.push(id)

    await this.db.favourites.put(favourites[0])
  }

  async unfavourite (id) {
    this.store.commit('app/unfavourite', id)

    const favourites = await this.db.favourites.toArray()

    const index = favourites[0].favourites.indexOf(id)
    if (index > -1) favourites[0].favourites.splice(index, 1)

    await this.db.favourites.put(favourites[0])
  }
}

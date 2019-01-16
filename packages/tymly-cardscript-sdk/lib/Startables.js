module.exports = class Startables {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
  }

  async persistFromUserQuery (userQuery) {
    const { startable } = userQuery.add

    await this.db.startables.clear()

    for (const s of Object.values(startable)) {
      await this.db.startables.put(s)
    }

    const { favouriteStartableNames } = userQuery
    await this.db.favourites.put({ id: 'favourites', favourites: favouriteStartableNames })
  }

  async load () {
    const startables = await this.db.startables.toArray()
    this.store.commit('app/startables', startables)

    const { favourites } = await this.db.favourites.get('favourites')
    this.store.commit('app/favourites', favourites)
  }

  // todo: probably refactor these
  async favourite (id) {
    this.store.commit('app/favourite', id)

    const { favourites } = await this.db.favourites.get('favourites')
    if (!favourites.includes(id)) favourites.push(id)

    await this.db.favourites.put({ id: 'favourites', favourites })
    // todo: call state machine too
  }

  async unfavourite (id) {
    this.store.commit('app/unfavourite', id)

    const { favourites } = await this.db.favourites.get('favourites')

    const index = favourites.indexOf(id)
    if (index > -1) favourites.splice(index, 1)

    await this.db.favourites.put({ id: 'favourites', favourites })
    // todo: call state machine too
  }
}

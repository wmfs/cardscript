module.exports = class Cards {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
  }

  async persistFromUserQuery (userQuery) {
    const { cards } = userQuery.add

    await this.db.cards.clear()

    for (const c of Object.values(cards)) {
      await this.db.cards.put(c)
    }
  }

  async load () {
    const data = await this.db.cards.toArray()
    this.store.commit('app/cards', data)
  }
}

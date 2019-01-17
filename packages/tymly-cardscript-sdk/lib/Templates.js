module.exports = class Templates {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
  }

  async persistFromUserQuery (userQuery) {
    // todo
    // convert to quasarTemplateString and stuff
    // refer to playpen
    // write quasarTemplateString and stuff to indexedDB
    const { cards } = userQuery.add

    await this.db.cards.clear()

    for (const c of Object.values(cards)) {
      await this.db.cards.put(c)
    }
  }

  async load () {
    // todo
    // this.db.templates[id] = { template, toc, lists... }
    const data = await this.db.cards.toArray()
    this.store.commit('app/cards', data)
  }

  unloadTemplates () {
    // todo
    // this.db.templates = {}
  }
}

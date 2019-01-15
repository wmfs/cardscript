module.exports = class Watching {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
    this.stateMachine = client.stateMachine
    this.token = client.options.token
  }

  async persistFromUserQuery (userQuery) {
    const {watching} = userQuery

    console.log('*** ', watching)
    await this.db.watching.clear()

    for (const w of Object.values(watching)) {
      await this.db.watching.put(w)
    }
  }

  async load () {
    const data = await this.db.watching.toArray()
    this.store.commit('app/watching', data)
  }

  watch (cardId) {
    return this.stateMachine.execute({
      stateMachineName: 'tymly_watchBoard_1_0',
      input: {
        stateMachineName: cardId,
        title: 'Pizza Order XYZ123',
        category: 'Food',
        categoryLabel: 'Food Order',
        description: 'Pepperoni and Jalapeno Pizza'
      },
      token: this.token
    })
  }

  unwatch (cardId) {}

  loadWatching () {
    // this would be called from watching page

    // const { offset, limit, filter } = options
    // get from this.db
    // add result to vuex this.store
  }
}

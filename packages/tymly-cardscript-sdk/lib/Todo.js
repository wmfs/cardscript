module.exports = class Todo {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
  }

  async persistFromUserQuery (userQuery) {
    const { todos } = userQuery.add
    // for (const t of Object.values(todos)) {
    //   await this.db.todos.put(t)
    // }
  }

  load () {}

  remove (id) {}

  loadTodos (options) {
    // const { offset, limit, filter } = options
    // get from this.db
    // add result to vuex this.store
  }
}

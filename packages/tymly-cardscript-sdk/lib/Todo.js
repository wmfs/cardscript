module.exports = class Todo {
  constructor (client) {}

  persistFromUserQuery (userQuery) {
    // userQuery.todos
    // write to indexedDB in todos table
  }

  remove (id) {}

  loadTodos (options) {
    // const { offset, limit, filter } = options
    // get from this.db
    // add result to vuex this.store
  }
}

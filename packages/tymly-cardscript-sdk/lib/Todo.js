module.exports = class Todo {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
    this.stateMachine = client.stateMachine
    this.token = client.options.token
  }

  async persistFromUserQuery (userQuery) {
    const { todos } = userQuery.add

    await this.db.todo.clear()

    for (const t of Object.values(todos)) {
      await this.db.todo.put(t)
    }
  }

  async load () {
    const data = await this.db.todo.toArray()
    this.store.commit('app/todos', data)
  }

  remove (id) {
    return this.stateMachine.execute({
      stateMachineName: 'tymly_removeTodoEntries_1_0',
      input: {
        todoId: id
      },
      token: this.token
    })

    // remove from db
    // remove from store
    // although the tests just refresh user query and that does the job
  }

  loadTodos (options) {
    // const { offset, limit, filter } = options
    // get from this.db
    // add result to vuex this.store
  }
}

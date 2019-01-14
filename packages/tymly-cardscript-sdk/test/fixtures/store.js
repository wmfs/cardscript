const Vue = require('vue')

module.exports = {
  modules: {
    app: {
      namespaced: true,
      state: {
        startables: [],
        favourites: [],
        watching: [],
        todos: [],
        logs: [],
        cards: []
      },
      mutations: {
        cards: (state, cards) => { state.cards = cards },
        logs: (state, logs) => { state.logs = logs },
        todos: (state, todos) => { state.todos = todos },
        watching: (state, watching) => { state.watching = watching },
        startables: (state, startables) => { state.startables = startables },
        startable: (state, startable) => Vue.set(state.startables, startable.name, startable),
        favourite: (state, startable) => {
          if (!state.favourites.includes(startable)) state.favourites.push(startable)
        },
        unfavourite: (state, startable) => {
          const index = state.favourites.indexOf(startable)
          if (index > -1) state.favourites.splice(index, 1)
        }
      }
    },
    auth: {
      namespaced: true,
      state: {
        token: null
      },
      mutations: {
        token: (state, token) => { state.token = token }
      }
    }
  }
}
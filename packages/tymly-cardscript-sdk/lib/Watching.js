module.exports = class Watching {
  // constructor (client) {}

  persistFromUserQuery (userQuery) {
    // userQuery.watching
    // write to indexedDB in watching table
  }

  watch (cardId) {}

  unwatch (cardId) {}

  loadWatching () {
    // this would be called from watching page

    // const { offset, limit, filter } = options
    // get from this.db
    // add result to vuex this.store
  }
}

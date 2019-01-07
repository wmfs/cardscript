module.exports = class Startables {
  constructor (client) {
    // client.options.store
  }

  persistFromUserQuery (userQuery) {
    // userQuery.startables
    // write to indexedDB in startables table
  }

  load () {
    // get from indexedDb and put onto store via mutation
  }

  favour (id) {
    // add startable to favourites
    // update indexedDb
  }

  unfavour (id) {
    // remove startable from favourites
    // update indexedDb
  }
}

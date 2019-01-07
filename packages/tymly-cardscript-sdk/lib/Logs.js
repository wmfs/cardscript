module.exports = class Logs {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
  }

  addLog (type, code, message, body) {
    // add timestamp
  }

  loadMessages (options) {
    // const { offset, limit, filter } = options
    // get from this.db
    // add result to vuex this.store
  }

  applyPolicy () {
    // flush old data, only keep last 200 log entries
  }
}

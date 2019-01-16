module.exports = class Logs {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
    this.limit = client.options.logLimit
    this.shim = client.options.globalVars.indexedDB
  }

  async addLog (options) {
    const log = formatLog(options)
    await this.db.logs.put(log)
  }

  async loadLogs (options) {
    // todo
    // const { offset, limit, filter } = options

    const data = await this.db.logs.toArray()
    this.store.commit('app/logs', data)
  }

  applyPolicy () {
    // todo
    // flush old data, only keep last this.limit log entries
  }
}

function formatLog ({ type, code, title, body }) {
  return {
    message: body ? `[${type}] ${code}: ${title}\n${body}` : `[${type}] ${code}: ${title}`,
    date: new Date().getTime()
  }
}

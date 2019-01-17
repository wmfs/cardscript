const takeRight = require('lodash.takeright')

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

  async applyPolicy () {
    const data = await this.db.logs.toArray()
    if (data.length > this.limit) {
      const newData = takeRight(data, this.limit)
      await this.db.logs.clear()
      for (const log of newData) {
        await this.db.logs.put(log)
      }
    }
  }
}

function formatLog ({ type, code, title, body }) {
  return {
    message: body ? `[${type}] ${code}: ${title}\n${body}` : `[${type}] ${code}: ${title}`,
    date: new Date()
  }
}

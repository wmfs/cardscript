const chalk = require('chalk')

module.exports = class Logs {
  constructor (client) {
    this.db = client.db
    this.store = client.options.store
    this.shim = client.options.globalVars.indexedDB
  }

  async addLog (options) {
    const log = formatLog(options)
    await this.db.logs.put(log)
  }

  async loadLogs (options) {
    // const { offset, limit, filter } = options

    const data = await this.db.logs.toArray()
    this.store.commit('app/logs', data)
  }

  applyPolicy () {
    // flush old data, only keep last 200 log entries
  }
}

function formatLog ({ type, code, title, body }) {
  const date = new Date().getTime()
  let message
  if (body) {
    message = `${code}: ${title}\n${body}`
  } else {
    message = `${code}: ${title}`
  }

  switch (type) {
    case 'POSITIVE':
      return { message: chalk.green(message), date }
    case 'NEGATIVE':
      return { message: chalk.red(message), date }
    case 'WARNING':
      return { message: chalk.yellow(message), date }
    case 'INFO':
      return { message: chalk.cyan(message), date }
    default:
      return { message, date }
  }
}

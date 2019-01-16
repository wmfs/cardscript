const axios = require('axios')

module.exports = class Executions {
  constructor (client) {
    this.db = client.db
    this.appName = client.options.appName
    this.store = client.options.store
    this.tymlyApiUrl = client.options.tymlyApiUrl
    this._getHash = client._getHash
  }

  async SendTaskSuccess ({ executionName, output, token }) {
    const { data } = await axios.put(
      `${this.tymlyApiUrl}/${executionName}`,
      {
        action: 'SendTaskSuccess',
        output
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return data
  }

  async execute ({ stateMachineName, input, token, sendResponse }) {
    const { data } = await axios.post(
      this.tymlyApiUrl,
      {
        stateMachineName,
        input: input || {},
        options: {
          instigatingClient: {
            appName: this.appName,
            domain: ''
          },
          sendResponse: sendResponse || 'COMPLETE'
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    await this.storeFromServerRequest(data)

    return data
  }

  async storeFromServerRequest (execDesc) {
    const { ctx, status, executionName } = execDesc

    const res = {
      status,
      executionName,
      locallyCreatedTimestamp: new Date()
      // other things from ctx
    }

    if (ctx.hasOwnProperty('awaitingHumanInput')) {
      res.requiredHumanInput = ctx.requiredHumanInput

      if (ctx.requiredHumanInput.hasOwnProperty('data')) {
        res.originalDataHash = this._getHash(ctx.requiredHumanInput.data)
      }
    }

    await this.db.executions.put(res)
  }

  async remove (executionName) {
    await this.db.executions.delete(executionName)
  }

  async exists (executionName) {
    const data = await this.db.executions.get(executionName)
    return !!data
  }

  async load (executionName) {
    const execution = await this.db.executions.get(executionName)
    if (execution) this.store.commit('app/execution', execution)
  }

  hasDataChanged (executionName, data) {
    // todo
    // calculate hash for data
    // compare with db original data hash
    // return boolean
  }
}

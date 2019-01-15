const axios = require('axios')

module.exports = class Executions {
  constructor (client) {
    this.db = client.db
    this.appName = client.options.appName
    this._getHash = client._getHash
  }

  async execute ({ stateMachineName, input, token }) {
    const { data } = await axios.post(
      process.env.TYMLY_EXECUTIONS_URL,
      {
        stateMachineName,
        input: input || {},
        options: {
          instigatingClient: {
            appName: this.appName,
            domain: ''
          },
          sendResponse: 'COMPLETE'
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

  sendHeartbeat () {
    // sendTaskHeartbeat
  }

  runFromLaunch (launch) {
    // launch is an object
    // this.execute()
  }

  async storeFromServerRequest (execDesc) {
    await this.db.executions.put({
      ...execDesc,
      shasum: this._getHash(execDesc)
    })
  }

  remove (executionName) {
    // from db
  }

  exists (executionName) {
    // is in db?
  }

  load (executionName) {
    // get from db
    // into vuex store - currentExecution
  }

  hasDataChanged (executionName, data) {
    // calculate hash for data
    // compare with db original data hash
    // return boolean
  }
}

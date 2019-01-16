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

  // todo:
  // startExecution - sendResponse: 'AFTER_RESOURCE_CALLBACK.TYPE:awaitingHumanInput' - get execName from ctx
  // sendTaskSuccess - using execName
  // waitUntilStoppedRunning - using execName

  sendSuccess (execName) {
  }

  async sendHeartbeat ({ stateMachineName, input, token }) {
    // const { data } = await axios.post(
    //   `${process.env.TYMLY_EXECUTIONS_URL}`,
    //   {
    //     stateMachineName,
    //     input: input || {},
    //     options: {
    //       instigatingClient: {
    //         appName: this.appName,
    //         domain: ''
    //       },
    //       sendResponse: 'AFTER_RESOURCE_CALLBACK.TYPE:awaitingHumanInput'
    //     }
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
    //
    // await this.storeFromServerRequest(data)
    //
    // return data
  }

  runFromLaunch (launch) {
    // launch is an object
    // this.execute()
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
      res.awaitingHumanInput = ctx.awaitingHumanInput

      if (ctx.awaitingHumanInput.hasOwnProperty('data')) {
        res.originalDataHash = this._getHash(ctx.awaitingHumanInput.data)
      }
    }

    await this.db.executions.put(res)
  }

  async remove (executionName) {
    await this.db.executions.delete(executionName)
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

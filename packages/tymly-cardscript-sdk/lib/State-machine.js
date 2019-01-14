const axios = require('axios')

module.exports = class StateMachine {
  constructor (client) {
    this.appName = client.options.appName
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

    return data
  }

  sendHeartbeat () {
    // sendTaskHeartbeat
  }

  runFromLaunch (launch) {
    // launch is an object
    // this.execute()
  }
}

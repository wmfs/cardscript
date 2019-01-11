const axios = require('axios')

module.exports = class StateMachine {
  // constructor (client) {}

  async execute ({ stateMachineName, input, token, appName }) {
    const { data } = await axios.post(
      process.env.TYMLY_EXECUTIONS_URL,
      {
        stateMachineName,
        input,
        options: {
          instigatingClient: {
            appName,
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

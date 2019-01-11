const axios = require('axios')

module.exports = class StateMachine {
  // constructor (client) {}

  async execute ({ stateMachineName, input, token }) {
    // todo: will call tymly-cli

    const { data } = await axios.post(
      process.env.TYMLY_EXECUTIONS_URL,
      {
        stateMachineName,
        input,
        options: {
          instigatingClient: {
            appName: 'tymly-cardscript-sdk',
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

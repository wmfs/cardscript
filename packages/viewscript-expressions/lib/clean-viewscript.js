module.exports = function (data, visibilityList) {
  // console.log('This is the form data: ', data)
  // console.log('This is the visibility list: ', visibilityList)

  Object.entries(visibilityList).forEach(condition => {
    // console.log('evaluating this condition', condition)
    Object.entries(data).forEach(widget => {
      // console.log('against this widget', widget)
      if (condition[0] === widget[0] && condition[1] === false) {
        // TODO: strip the data
        // console.log('got a false', widget)
        // console.log('type is', typeof widget[1])
        switch (typeof data[widget[0]]) {
          case 'string':
            data[widget[0]] = ''
            break
          case 'integer':
            data[widget[0]] = null
            break
          case 'array':
            data[widget[0]] = []
        }
      }
    })
  })
  // console.log('data after clean: ', data)
  return data
}

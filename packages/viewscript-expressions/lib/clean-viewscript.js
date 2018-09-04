module.exports = function (data, visibilityList) {
  // console.log('This is the form data: ', data)
  // console.log('This is the visibility list: ', visibilityList)

  Object.entries(visibilityList).forEach(condition => {
    // console.log('evaluating this condition', condition)
    Object.entries(data).forEach(widget => {
      // console.log('against this widget', widget)
      if (condition[0] === widget[0] && condition[1] === false) {
        console.log('got a false', widget, condition)
        delete data[widget[0]]
      }
    })
  })
  // console.log('data after clean: ', data)
  return data
}

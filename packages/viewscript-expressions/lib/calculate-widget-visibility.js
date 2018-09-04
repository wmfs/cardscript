const evaluate = require('static-eval')

module.exports = function (viewscript, data, asts) {
  // TODO: scan down viewscript.widgets
  let setVisible = [true]
  const widgetList = {}

  viewscript.widgets.forEach(widget => {
    const currentVis = setVisible[setVisible.length - 1]
    if (currentVis === false) {
      // console.log('The set we are in is invisible', widget.id)
      widgetList[widget.id] = false
    } else if (widget.showWhen) {
      // TODO: get the correct AST for this expression --> is only asts[0] for a list with 1 entry
      const thisAST = asts[widget.id].body[0]
      const isVis = evaluate(thisAST, {data})
      // console.log('this widget has showWhen and is equal to', isVis, widget.id)
      widgetList[widget.id] = isVis
      if (widget.type === 'set') {
        console.log('this widget is of type set and is equal to ', isVis, widget.id)
        setVisible.push(isVis)
      } else if (widget.type === 'endSet') {
        console.log('I found the end of the set for ', widget.id)
        setVisible.pop()
      } else {
        console.log('widget not set')
      }
    } else {
      console.log('This widget is visible', widget.id)
    }
  })

  return widgetList
}

const parse = require('esprima').parse
const evaluate = require('static-eval')

class CardscriptExpressionsxpressions {
  constructor () {
    this.asts = {}
  }

  getExpressionsFromCardscript (cardscript) {
    return cardscript.widgets
      .filter(widget => widget.showWhen)
      .map(widget => {
        return {widget: widget.id, expression: widget.showWhen}
      })
  }

  convertExpressionsToAst (expressions) {
    /* OUTPUT:
    asts: {
      id: ast,
      id: ast,
      ...
    }
    */
    expressions.forEach(expression => {
      const ast = parse(expression.expression)
      this.asts[expression.widget] = ast
    })
  }

  addCardscript (cardscript) {
    const expressions = this.getExpressionsFromCardscript(cardscript)
    this.convertExpressionsToAst(expressions)
  }

  calculateWidgetVisibility (cardscript, data, asts) {
    let setVisible = [true]
    const visibilityList = {}
    let outerVis = true

    cardscript.widgets.forEach(widget => {
      const currentVis = setVisible[setVisible.length - 1]
      if (currentVis === false) {
        // console.log('The set we are in is invisible', widget.id)
        if (widget.type !== 'endSet') visibilityList[widget.id] = false
      } else if (widget.showWhen) {
        const thisAST = asts[widget.id].body[0]
        const isVis = evaluate(thisAST, {data})
        if (isVis === false) outerVis = false
        visibilityList[widget.id] = isVis
        if (widget.type === 'set') {
          setVisible.push(isVis)
        } else if (widget.type === 'endSet') {
          // console.log('I found the end of the set for ', widget.id)
          setVisible.pop()
        } else {
          // console.log('widget not set')
        }
      } else {
        if (widget.id) {
          visibilityList[widget.id] = outerVis
        }
      }
    })

    return visibilityList
  }

  cleanData (data, visibilityList) {
    // console.log('This is the form data: ', data)
    // console.log('This is the visibility list: ', visibilityList)

    Object.entries(visibilityList).forEach(condition => {
      // console.log('evaluating this condition', condition)
      Object.entries(data).forEach(widget => {
        // console.log('against this widget', widget)
        if (condition[0] === widget[0] && condition[1] === false) {
          // console.log('got a false', widget, condition)
          delete data[widget[0]]
        }
      })
    })
    // console.log('data after clean: ', data)
    return data
  }
}

module.exports = CardscriptExpressionsxpressions

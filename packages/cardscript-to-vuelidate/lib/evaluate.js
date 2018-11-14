const parse = require('esprima').parse
const FAIL = {}
module.exports = function (expression, data) {
  const ast = parse(expression).body[0].expression
  if (!data) data = {}

  const result = go(ast, data)
  return result === FAIL ? undefined : result

  function go (node) {
    switch (node.type) {
      case 'BinaryExpression':
      case 'LogicalExpression':
        const l = go(node.left)
        if (l === FAIL) return FAIL

        const r = go(node.right)
        if (r === FAIL) return FAIL

        if (node.operator === '===') return l === r
        if (node.operator === '!==') return l !== r
        if (node.operator === '+') return l + r
        if (node.operator === '-') return l - r
        if (node.operator === '*') return l * r
        if (node.operator === '/') return l / r
        if (node.operator === '%') return l % r
        if (node.operator === '<') return l < r
        if (node.operator === '<=') return l <= r
        if (node.operator === '>') return l > r
        if (node.operator === '>=') return l >= r
        if (node.operator === '|') return l | r
        if (node.operator === '&') return l & r
        if (node.operator === '^') return l ^ r
        if (node.operator === '&&') return l && r
        if (node.operator === '||') return l || r

        return FAIL
      case 'CallExpression':
        const callee = go(node.callee)
        if (callee === FAIL || typeof callee !== 'function') return FAIL

        const ctx = node.callee.object ? go(node.callee.object) : null
        const args = []
        for (let i = 0, l = node.arguments.length; i < l; i++) {
          const x = go(node.arguments[i])
          if (x === FAIL) return FAIL
          args.push(x)
        }
        return callee.apply(ctx, args)
      case 'MemberExpression':
        const obj = go(node.object)
        if (obj === FAIL || typeof obj === 'function') return FAIL
        if (node.property.type === 'Identifier') return obj[node.property.name]
        const prop = go(node.property)
        if (prop === FAIL) return FAIL
        return obj[prop]
      case 'Identifier':
        if ({}.hasOwnProperty.call(data, node.name)) return data[node.name]
        else return FAIL
      case 'Literal':
        return node.value
      default:
        return FAIL
    }
  }
}

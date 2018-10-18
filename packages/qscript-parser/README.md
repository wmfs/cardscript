# qscript-parser

> Like JSON.parse(), but for QScript. And it supports YAML.

## <a name="install"></a>Install
```bash
$ npm install qscript-parser --save
```

## <a name="usage"></a>Usage

```javascript
const parser = require('qscript-parser')

const qscriptObject = parser(
  '  {' +
  "    title: 'Simple demo form!'" +
  '    widgets: []' +
  '  }' )

```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[MIT](https://github.com/wmfs/qscript/blob/master/LICENSE)

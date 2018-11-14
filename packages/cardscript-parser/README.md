# cardscript-parser

> Like JSON.parse(), but for Cardscript. And it supports YAML.

## <a name="install"></a>Install
```bash
$ npm install cardscript-parser --save
```

## <a name="usage"></a>Usage

```javascript
const parser = require('cardscript-parser')

const cardscriptObject = parser(
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
[MIT](https://github.com/wmfs/cardscript/blob/master/LICENSE)

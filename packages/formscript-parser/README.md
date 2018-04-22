# formscript-parser

> Like JSON.parse(), but for Formscript. And it supports YAML.

## <a name="install"></a>Install
```bash
$ npm install formscript-parser --save
```

## <a name="usage"></a>Usage

```javascript
const parser = require('formscript-parser')

const formscriptObject = parser(
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
[GPLv3](https://github.com/wmfs/formscript/blob/master/LICENSE)

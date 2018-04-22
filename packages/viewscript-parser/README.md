# viewscript-parser

> Like JSON.parse(), but for Viewscript. And it supports YAML.

## <a name="install"></a>Install
```bash
$ npm install viewscript-parser --save
```

## <a name="usage"></a>Usage

```javascript
const parser = require('viewscript-parser')

const viewscriptObject = parser(
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
[GPLv3](https://github.com/wmfs/viewscript/blob/master/LICENSE)

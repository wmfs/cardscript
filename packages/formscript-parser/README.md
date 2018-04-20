# formscript-parser

> For parsing tings like default values and table-of-contents from some Formscript JSON.

## <a name="install"></a>Install
```bash
$ npm install formscript-parser --save
```

## <a name="usage"></a>Usage

```javascript
const formscriptParser = require('formscript-parser')

const result = formscriptParser.parse(
{
  title: 'Simple demo form!',
  widgets: []
})

//
// result.default:
// Key/value pairs to set an underlying data model to ahead of rendering this Formscript.
//
// result.toc:
// An object representing a table-of-contents, as inferred from the supplied Formscript.
//

```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[GPLv3](https://github.com/wmfs/formscript/blob/master/LICENSE)

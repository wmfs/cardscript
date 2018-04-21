# formscript-extract-defaults

> Extracts sensible defaults from some Formscript.

## <a name="install"></a>Install
```bash
$ npm install formscript-extract-defaults --save
```

## <a name="usage"></a>Usage

```javascript
const extractDefaults = require('formscript-extract-defaults')

const defaultValues = extractDefaults(
{
  title: 'Simple demo form!',
  widgets: []
})

```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[GPLv3](https://github.com/wmfs/formscript/blob/master/LICENSE)

# qscript-to-quasar

> Produces a template for use with Quasar from some QScript.

## <a name="install"></a>Install
```bash
$ npm install qscript-to-quasar --save
```

## <a name="usage"></a>Usage

```javascript
const viewscriptToQuasar = require('qscript-extract-defaults')

const quasarTemplate = viewscriptToQuasar(
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
[GPLv3](https://github.com/wmfs/viewscript/blob/master/LICENSE)

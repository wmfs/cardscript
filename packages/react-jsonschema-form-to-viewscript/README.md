# react-jsonschema-form-to-viewscript

> Convert react-jsonschema-form to viewscript.

## <a name="install"></a>Install
```bash
$ npm install react-jsonschema-form-to-viewscript --save
```

## <a name="usage"></a>Usage

```javascript
const converter = require('react-jsonschema-form-to-viewscript')
converter({
filePath: 'path/to/react-jsonschema-form.json',
outputPath: 'path/for/output.json'
}, (err, result) => {
  // result is the viewscript!
})
```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[GPLv3](https://github.com/wmfs/viewscript/blob/master/LICENSE)

# react-jsonschema-form-to-cardscript

> Convert react-jsonschema-form to Cardscript.

## <a name="install"></a>Install
```bash
$ npm install react-jsonschema-form-to-cardscript --save
```

## <a name="usage"></a>Usage

```javascript
const converter = require('react-jsonschema-form-to-cardscript')
converter({
filePath: 'path/to/react-jsonschema-form.json',
outputPath: 'path/for/output.json'
}, (err, result) => {
  // result is the Cardscript!
})
```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[MIT](https://github.com/wmfs/cardscript/blob/master/LICENSE)

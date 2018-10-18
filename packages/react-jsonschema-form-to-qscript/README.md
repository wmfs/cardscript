# react-jsonschema-form-to-qscript

> Convert react-jsonschema-form to QScript.

## <a name="install"></a>Install
```bash
$ npm install react-jsonschema-form-to-qscript --save
```

## <a name="usage"></a>Usage

```javascript
const converter = require('react-jsonschema-form-to-qscript')
converter({
filePath: 'path/to/react-jsonschema-form.json',
outputPath: 'path/for/output.json'
}, (err, result) => {
  // result is the QScript!
})
```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[MIT](https://github.com/wmfs/qscript/blob/master/LICENSE)

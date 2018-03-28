# formscript-examples

> Example Formscript files, to help with testing and documentation

* Note: files

## <a name="install"></a>Install
```bash
$ npm install formscript-schema --save
```

## <a name="usage"></a>Usage

```javascript
const exampleLoader = require('formscript-examples')

// Loads an example from the /lib/fixtures dir.
// Param is name of JSON file, without .json

const simpleFormExample = exampleLoader('simple-form')

```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[MIT](https://github.com/wmfs/formscript/blob/master/LICENSE)

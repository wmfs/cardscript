# cardscript-examples

> Example Cardscript JSON files, to help with testing and documentation. Includes loader utility.

* Note: files

## <a name="install"></a>Install
```bash
$ npm install cardscript-schema --save
```

## <a name="usage"></a>Usage

```javascript
const exampleLoader = require('cardscript-examples')

// Loads an example from the /lib/fixtures dir.
// Param is name of JSON file, without .json

const simpleFormExample = exampleLoader('simple-form')

```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[MIT](https://github.com/wmfs/cardscript/blob/master/LICENSE)

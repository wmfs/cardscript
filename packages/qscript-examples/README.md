# qscript-examples

> Example QScript JSON files, to help with testing and documentation. Includes loader utility.

* Note: files

## <a name="install"></a>Install
```bash
$ npm install qscript-schema --save
```

## <a name="usage"></a>Usage

```javascript
const exampleLoader = require('qscript-examples')

// Loads an example from the /lib/fixtures dir.
// Param is name of JSON file, without .json

const simpleFormExample = exampleLoader('simple-form')

```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[GPLv3](https://github.com/wmfs/qscript/blob/master/LICENSE)

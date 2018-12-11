# cardscript-schema

[![Known Vulnerabilities](https://snyk.io/test/github/wmfs/cardscript/badge.svg?targetFile=packages%2Fcardscript-schema%2Fpackage.json)](https://snyk.io/test/github/wmfs/cardscript?targetFile=packages%2Fcardscript-schema%2Fpackage.json)

> Contains a JSON Schema for Cardscript, along with a validation utility.

## <a name="install"></a>Install
```bash
$ npm install cardscript-schema --save
```

## <a name="usage"></a>Usage

```javascript
const cardscriptSchema = require('cardscript-schema')

const result = cardscriptSchema.validateForm(
  {
    "type": "AdaptiveCard",
    "body": [
      {
        "type": "TextBlock",
        "text": "Change me!",
        "color": "attention",
        "horizontalAlignment": "center"
      }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.0"
  }
)

if (result.elementsValid) {
  // All is well!!
} else {
  // Do something with result.errors array.
}

```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[MIT](https://github.com/wmfs/cardscript/blob/master/LICENSE)

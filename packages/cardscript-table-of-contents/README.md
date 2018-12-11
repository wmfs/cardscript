# cardscript-table-of-contents

> Extracts a table-of-contents from some Cardscript.

## <a name="install"></a>Install
```bash
$ npm install cardscript-table-of-contents --save
```

## <a name="usage"></a>Usage

```javascript
const extractToc = require('cardscript-table-of-contents')

const toc = extractToc(
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

```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[MIT](https://github.com/wmfs/cardscript/blob/master/LICENSE)

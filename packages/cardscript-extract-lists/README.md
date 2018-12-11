# cardscript-extract-lists

> Extracts list objects from some Cardscript.

## <a name="install"></a>Install
```bash
$ npm install cardscript-extract-lists --save
```

## <a name="usage"></a>Usage

```javascript
const extractLists = require('cardscript-extract-lists')

const lists = extractLists(
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

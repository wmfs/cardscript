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
  title: 'Simple demo form!',
  canBeCompletedOffline: true,
  widgets: [
    {
      type: 'header',
      attributes: {
        heading: 'Register!',
        desc: 'Let's get to know each other a bit better...',
        backgroundImage: 'happyPeople.jpg',
        backgroundImageAltText: 'Beautiful people smiling around a laptop'
      }
    },
    {
      id: 'name',
      type: 'text',
      attributes: {
        heading: 'Name',
        placeholder: 'e.g. Lucy Smith',
        mandatory: true,
        minCharacters: 1,
        maxCharacters: 100,
        help: 'Enter your full name here'
      }
    }
  ]
})

if (result.widgetsValid) {
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

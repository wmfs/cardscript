# qscript-schema

[![Known Vulnerabilities](https://snyk.io/test/github/wmfs/qscript/badge.svg?targetFile=packages%2Fqscript-schema%2Fpackage.json)](https://snyk.io/test/github/wmfs/qscript?targetFile=packages%2Fqscript-schema%2Fpackage.json)

> Contains a JSON Schema for QScript, along with a validation utility.

## <a name="install"></a>Install
```bash
$ npm install qscript-schema --save
```

## <a name="usage"></a>Usage

```javascript
const qscriptSchema = require('qscript-schema')

const result = qscriptSchema.validateForm(
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
[GPLv3](https://github.com/wmfs/qscript/blob/master/LICENSE)

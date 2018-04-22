# formscript-schema

[![Known Vulnerabilities](https://snyk.io/test/github/wmfs/formscript/badge.svg?targetFile=packages%2Fformscript-schema%2Fpackage.json)](https://snyk.io/test/github/wmfs/formscript?targetFile=packages%2Fformscript-schema%2Fpackage.json)

> Contains a JSON Schema for Formscript, along with a validation utility.

## <a name="install"></a>Install
```bash
$ npm install formscript-schema --save
```

## <a name="usage"></a>Usage

```javascript
const formscriptSchema = require('formscript-schema')

const result = formscriptSchema.validateForm(
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
[GPLv3](https://github.com/wmfs/formscript/blob/master/LICENSE)

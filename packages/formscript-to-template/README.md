# formscript-to-template

> Takes some Formscript and transforms it to a template string for use with a frontend framework.

## <a name="install"></a>Install
```bash
$ npm install formscript-to-template --save
```

## <a name="usage"></a>Usage

``` javascript
const formscriptToTemplate = require('formscript-to-template')

const result = formscriptToTemplate.convert(
  // Formscript!
  {
    title: 'Simple demo form!',
    canBeCompletedOffline: true,
    widgets: [
      {
        type: 'header',
        attributes: {
          heading: 'Register!',
          desc: "Let's get to know each other a bit better..."
        }
      },
      {
        id: 'name',
        type: 'text',
        attributes: {
          heading: 'Name',
          placeholder: 'e.g. Lucy Smith',
          mandatory: true,
          maxCharacters: 100
        }
      }
    ]
  },

  // Options!
  {
    template: {
      widgetTagPrefix: 'app',
      closingWidgetTags: false,
      rootTag: ['<div>', '</div>'],
      conditionalTag: ['<template v-if="$$EXPRESSION$$">', '</template>'],
      modelBindingAttributeTemplate: 'v-model="data.$$WIDGET_KEY$$"',
      pretty: true
    }
  }
)

// Output!

console.log(result.template)

// <div>
//   <app-header heading="Register!" desc="Let's get to know each other a bit better..." />
//   <app-text heading="Name" placeholder="e.g. Lucy Smith" mandatory="true" maxCharacters="100" />
// </div>

```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[GPLv3](https://github.com/wmfs/formscript/blob/master/LICENSE)

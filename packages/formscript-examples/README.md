# formscript-examples

> Example Formscript files, to help with testing and documentation

## <a name="install"></a>Install
```bash
$ npm install formscript-schema --save
```

## <a name="usage"></a>Usage

```javascript
const formscriptSchema = require('formscript-schema')

const result = formscriptSchema.validateForm(
{
  widgets: [
    {
      type: 'header',
      attributes: {
        heading: 'Register!',
        description: "Let's get to know each other a bit better...",
        backgroundImage: 'happyPeople.jpg',
        backgroundImageAltText: 'Beautiful people smiling around a laptop'
      }
    },
    {
      id: 'firstName',
      type: 'text',
      attributes: {
        label: 'First name',
        placeholder: 'e.g. Lucy Smith',        
        required: true,
        minLength: 1,
        maxLength: 100,
        help: 'Enter your full name here'  
      }
    },
    {
      type: 'menuBar',
      attributes: {
        sticky: true,
        placement: 'top',
        saveButton: true,
        cancelButton: false,
        progressBar: false
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
[MIT](https://github.com/wmfs/formscript/blob/master/LICENSE)

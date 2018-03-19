# FormScript Specification V0.1

## <a name="goal"></a>Goal

The goal of  __FormScript__ is to provide a simple-to-use vocabulary that can anyone can use to describe the content of a user-facing form. We hope FormScript will be capable of defining the majority of forms out there - in a sane and accessible way.  

## <a name="repo"></a>About this repo

FormScript isn't tied to any language/implementation: it's a JSON-based language (with YAML support) for _describing_ form content.
There's no CSS or React/Angular/Vue form-renderers here!

* Instead, within `/packages` you can find various tools (such as a validator and template builder) to help work with FormScript.
* Please note, this is a [Lerna](https://lernajs.io/)-powered monorepo... please consult each package's README.md within `/packages` for more specific information. 

## <a name="usage"></a>Typical usage

``` javascript

const validator = require('formscript-schema').validateForm

const result = validator(
{
  formContent: [
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

if (result.formContentValid) {
  // All is well!!
} else {
  // Do something with result.errors array.
}

```

As shown in the example above, a form definition in FormScript comprises mainly of a `formContent` array containing 1 or more objects. 

* To avoid muddying-things with common frontend-terms like 'component', FormScript refers to each object in the `formContent` array as a __widget__.
* Think of a widget as an on-screen component that a user can be shown (not necessarily interact with - for example, `heading` and `stickyNote` widgets are non-interactive).
* The order `Widget` objects appear within `formContent` is important... representing the logical order you want your users to encounter them.
* Note that widgets can be arranged into "sets" to help define a structure (perhaps splitting a large form into sections, or wizard-like pages).

### <a name="widgets"></a>About widgets

Widget objects comprise of some common properties:

| Property     | Mandatory? | Description |
| --------     | ---------- | ----------- |
| `id`         | Depends         | A string which uniquely identifies the widget amongst others found within this `formContent` array. Note a small set of widgets don't require an `id` value, but most do. | 
| `type`       | Yes        | A string indicating the type of widget to render (e.g. `text`, `number`, `select` etc.) See the Reference section for  complete list. |
| `showWhen`  | No         | A string containing an expression, that if truthy will cause the widget to appear within the UI, else it shouldn't be shown to the user. | 
| `attributes` | No         | An object of key/value keys which help configure the widget - the exact keys supported will depend on the widget `type`. |

##  <a name="summary"></a>Widget Summary 

Ahead of the more detailed Reference section, here's a quick summary of all widgets supported in Formscript V1.0:

| Widget Type      | Description |
| -----------      | ----------- |
| `address`        | Blah        | 
| `checkboxList`   | Blah        |
| `date`   | Blah        |
| `header`   | Blah        |
| `integer`   | Blah        |
| `menuBar`   | Blah        |
| `questionnaire`   | Blah        |
| `radio`   | Blah        |
| `richtext`   | Blah        |
| `textarea`   | Blah        |
| `set`   | Blah        |
| `endSet`   | Blah        |
| `select`   | Blah        |
| `switch`   | Blah        |
| `text`   | Blah        |


## <a name="attributes"></a>Common Attributes

FormScript V0.1 supports a set of 30 attributes from which widgets can be configured. Not all widget-types support all attributes, attributes are often optional and some widget-types don't need attributes at all. Here is a list of the more common attributes you'll encounter:
 
| Attribute Name | Type | Description |
| -------------- | -----| ----------- |
| `default` | Depends | Blah |
| `defaultExpression` | `String` | Blah |
| `enabled` | `boolean` | Blah |
| `label` | `String` | Blah |
| `required` | `boolean` | Blah |
| `description` | `String` | Blah |
| `help` | `String` | Blah |
| `validations` | `Object` | Blah |

## <a name="expressions"></a>Expressions

FormScript uses __expressions__ to help bring things to life. Expressions are used to:

* Conditionally show/hide widgets depending on values as they are entered
* Validate form content based on more complex rules
* Affect the contents of enumerations 
* Default dynamic values

```json
{
  "formContent": [
    {
      "id": "userWantsToGiveFeedback",
      "type": "switch",
      "attributes": {
        "default": false,
        "label": "Do you want to leave feedback?"        
      }
    },
    {
      "id": "feedback",
      "showWhen": "data.userWantsToGiveFeedback",
      "type": "textarea",
      "attributes": {
        "label": "Feedback",
        "description": "Please tell us how you feel!"
      }
    }
  ]
}
```

__In the example above we have two widgets:__ 

* The first is a boolean on/off `switch` widget (with the `id` of `userWantsToGiveFeedback`) which is by default set to `false`.
* The second widget is a big textbox (with the `id` of `feedback`) for collecting feed back from the user.

The `feedback` widget should only show if the `userWantsToGiveFeedback` switch is thrown on (i.e. `true`).

There are a few new things going on here. First most types of widget (here the `switch` and `textarea` types) are expected to read and write their values to a `data` object, using their respective `id`  as keys.
Furthermore, this `data` object should be made available within expressions - this allows our `feedback` widget to behave in the expected way:

```json
{"showWhen": "data.userWantsToGiveFeedback"}
``` 

Here, `data` is one of two context objects that should be offered to expressions, the other is `env`.

```json
{
  "formContent": [
    {
      "id": "freeTextAddresses",
      "showWhen": "env.startedOffline",
      "type": "text",
      "attributes": {
        "label": "Do you want to leave feedback?",
        "description": "Offline! Enter a free-text address :-("        
      }
    }
  ]
}
```

In the example above, a fallback `freeTextAddress` text-box widget should only appear if the user is engaging with the form in an 'offline' capacity. 
 
Expect the `env` object to offer the following properties:

__`env` object properties__

| Property | Type | Description |
| `started` | `string` | Timestamp of when the form was started on the client device. Used|
| `startedOffline` | `boolean` | Indicates if the form was started offline or not. | 


## <a name="sections"></a>About sections

Form content in FormScript is pretty-much "flat"... things aren't split into different "section" objects at the top-level (though repeating/nested groups are supported, more on that later).

* Defining sections to aid navigation of larger forms is still entirety possible using FormScript though - simply add a `section` widget amongst your other widgets.
* This is a design decision to help align FormScript better with mobile implementations.
* The following example shows how widgets can be split across _About you_ and _Conclusion_ sections, by interspersing `section` widgets:

``` json
{
  "contents": [
    {
      "type": "section",
      "attributes": {
        "heading": "About you",
        "description": "Enter some details about yourself..."
      }
    },
    {
      "id": "firstName",
      "type": "text",
      "attributes": {
        "label": "First name"
      }
    },
    {
      "type": "section",
      "attributes": {
        "heading": "Conclusion",
        "description": "All done!"
      }
    },
    {
      "id": "notes",
      "type": "text",
      "attributes": {
        "label": "Any other comments?"
      }
    }
  ]
}
```

##  <a name="reference"></a>Reference

## <a name="license"></a>License
[MIT](https://github.com/wmfs/form-script/blob/master/LICENSE)

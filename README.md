# Formscript
### Version `0.0.2`

[![Build Status](https://travis-ci.org/wmfs/formscript.svg?branch=master)](https://travis-ci.org/wmfs/formscript) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fwmfs%2Fformscript.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fwmfs%2Fformscript?ref=badge_shield) [![Known Vulnerabilities](https://snyk.io/test/github/wmfs/formscript/badge.svg?targetFile=package.json)](https://snyk.io/test/github/wmfs/formscript?targetFile=package.json) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) [![Dependabot badge](https://img.shields.io/badge/Dependabot-active-brightgreen.svg)](https://dependabot.com/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wmfs/formscript/blob/master/CONTRIBUTING.md)

__This document defines a [JSON](https://tools.ietf.org/html/rfc7159)-based language used to describe form-content declaratively.
The forms thus defined may be rendered and executed by software.
In this document, such software is referred to as an "app".__

> Copyright &copy; 2018 West Midlands Fire Service.
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this specification and associated documentation files (the "specification"), to use, copy, publish, and/or distribute, the Specification) subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies of the Specification.
>
> You may not modify, merge, sublicense, and/or sell copies of the Specification.
>
> THE SPECIFICATION IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SPECIFICATION OR THE USE OR OTHER DEALINGS IN THE SPECIFICATION.

## <a name="toc"></a>Table of Contents

* [Structure of a Form](#structure)
  * [Example: Simple Form](#example)
* [Concepts](#concepts)
  * [Apps](#app)
  * [Forms](#form)
  * [Widgets](#widget)
  * [Sets](#set)
  * [Expressions](#expression)
* [Reference](#reference)
  * [Top-Level Properties](#top-level)
  * [Widget Properties](#properties)
  * [Widget Attributes](#attributes)
  * [Widget List](#list)

## <a name="structure"></a>Structure of a Form

A Form is represented by a [JSON Object](https://tools.ietf.org/html/rfc7159#section-4]).

### <a name="example"></a>Example: Simple Form

The content of a form is specified by configuring one or more _widgets_, which are represented by JSON objects.

* In this example, a form is defined that contains two widgets, one that defines a suitable header (with some text and an accompanying image),
followed by a second widget for letting the user enter their name.

``` json
{
  "widgets": [
    {
      "type": "header",
      "attributes": {
        "heading": "Register!",
        "desc": "Let's get to know each other a bit better...",
        "backgroundImage": "happyPeople.jpg",
        "backgroundImageAltText": "Beautiful people smiling around a laptop"
      }
    },
    {
      "id": "name",
      "type": "text",
      "attributes": {
        "heading": "Name",
        "placeholder": "e.g. Lucy Smith",
        "mandatory": true,
        "minCharacters": 1,
        "maxCharacters": 100,
        "help": "Enter your full name here"
      }
    }
  ]
}
```

* The order that objects are defined within `widgets` is important, representing the order users will encounter them.

## <a name="concepts"></a>Concepts

Formscript is built on a handful of key concepts...

### <a name="app"></a>Apps

Forms defined in Formscript may be rendered and executed by software.
In this document, such software is referred to an "__app__".

* Apps can be implemented in any frontend-framework, language or library.
* Formscript does not impose any aesthetic or UI constraints onto apps that implement it.
* Formscript content can be embedded inside apps with [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface), [CLI](https://en.wikipedia.org/wiki/Graphical_user_interface) and even [Voice-User](https://en.wikipedia.org/wiki/Voice_user_interface) interfaces.
* Perhaps as a fallback, Formscript content can even be rendered as a hard-copy paper form.
* Several utilities to help develop apps that use Formscript (written in Javascript) are published on [here on npmjs.com](https://www.npmjs.com/search?q=formscript) (the accompanying source code and related issues can be found [here](https://github.com/wmfs/formscript/tree/master/packages)).

### <a name="form"></a>Forms

The purpose of Formscript is to define a user interface, referred to as a "__form__".

* Using an app, forms are typically used to collect information from a user: but it's entirely possible to simply convey information using a form definition as well.
* With Formscript it's possible to configure a form with structure, validation, conditional content, dynamic values and context-sensitive behaviours (e.g. operating differently with an internet connection as opposed to without).
* Formscript definitions are naturally stored in `.json` files (typically one-file-per-form).
* In certain use-cases consider that [YAML](https://en.wikipedia.org/wiki/YAML) (itself just a superset of JSON) may offer a compelling alternative to serialising Formscript definitions in `.json` files.
* Please note that a [JSON Schema](http://json-schema.org/) is available [here](https://raw.githubusercontent.com/wmfs/formscript/master/packages/formscript-schema/lib/schema.json), which may be used to validate the basic integrity of Formscript content.
* For comprehensive Formscript validation, please refer to the [formscript-schema](https://www.npmjs.com/package/formscript-schema) package.

### <a name="widget"></a>Widgets

Forms are constructed from an ordered list of "__widgets__".

* To avoid overloading frontend-terms like 'component', Formscript refers to each object in the `widgets` array as a __widget__.
* Consider a widget as an area of a form responsible for a particular task: either collecting a specific piece of information from a user or visualising a certain piece of information.
* As such, widgets can be interactive (`text`, `number`, `map` etc.) and non-interactive (`heading`, `stickyNote` etc.)
* The order that `Widget` objects appear within a form definition is important - representing the order users will encounter them.
* The Formscript specification offers a fixed set of 26 standard widgets. Need another widget-type entirely or an extra configuration options? [Pull requests are very welcome!](https://github.com/wmfs/Formscript/blob/master/CONTRIBUTING.md)

__Ahead of the [Reference](#reference) section, here's a quick summary of the 26 widgets supported in Formscript `0.0.2`:__

| Widget Type      | Description |
| -----------      | ----------- |
| [`address`](#list-address) | Allows the user to __select__ a particular postal address from a provided list and store a unique reference to that property, such as a [UPRN](https://www.ordnancesurvey.co.uk/about/governance/policies/addressbase-uprn.html) or similar. |
| [`apiLookup`](#list-apiLookup) | Allows the user to select a specific value from an API endpoint |
| [`checkboxList`](#list-checkboxList) | Offer a related set of checkboxes with accompanying labels for the user to switch on and off. |
| [`currency`](#list-currency) | Just like a `number` widget, but for specifically collecting a monetary value. |
| [`date`](#list-date) | Allows the user to provide a specific date - without a time portion. |
| [`dateTime`](#list-dateTime) | Collects a specific date and time from the user. |
| [`endSet`](#list-endSet) | Marks the end of a set of related widgets - see the [Sets](#set) section for more information. |
| [`endSubForm`](#list-endSubForm) | Marks the end of a sub-form - see the [Sets](#set) section for more information. |
| [`fileUpload`](#list-fileUpload) | Allows the user to upload a file. |
| [`header`](#list-header) | Displays a header for a form (with an optional background image and some text akin to a &#39;[Hero Unit](https://en.wikipedia.org/wiki/Hero_image)&#39; component). |
| [`image`](#list-image) | Embeds a non-interactive image within the form. |
| [`map`](#list-map) | Displays a map to the user, and can optionally be configured to collect geo-spatial data (points, lines etc.) |
| [`number`](#list-number) | Like a `text` widget, but specifically for collecting numeric content. |
| [`questionnaire`](#list-questionnaire) | Offers the user a question with two or more possible responses on an appropriate scale. |
| [`radio`](#list-radio) | Allows the user to select a value from a set of related options that are rendered in a [Radio Button](https://en.wikipedia.org/wiki/Radio_button) style. |
| [`richtext`](#list-richtext) | Offers the user a text editor with functionality to format text. |
| [`select`](#list-select) | Allows the user to select a value from a set of options, which should be rendered in an [HTML Select](https://en.wikipedia.org/wiki/HTML_element) style. |
| [`set`](#list-set) | Marks the start of a set of related widgets - see the [Sets](#set) section for more information. |
| [`signature`](#list-signature) | Allow the collection of a handwritten signature |
| [`slider`](#list-slider) | For capturing a number along a specified range |
| [`stickyNote`](#list-stickyNote) | A panel for putting helpful text or other informative text |
| [`subForm`](#list-subForm) | Allows the user to enter a number of &#39;sub forms&#39; (think order-lines or contact details etc.) |
| [`switch`](#list-switch) | Presents a on/off style switch to the user. |
| [`text`](#list-text) | A bread-and-butter box for collecting textual information from the user. |
| [`textarea`](#list-textarea) | Collects simple multi-line text input from the user. |
| [`time`](#list-time) | Allows the user to provide a specific time (without being tied to a particular date) |


### <a name="set"></a>Sets

All the widgets that define a form's content are specified in a simple array.
This design helps align Formscript with vertical-scrolling interfaces with very little friction.
To assist with navigation (especially around larger, more complex forms) it is common for User Interfaces to be split into logical sections.

In Formscript,  __sets__ allow widgets to be grouped into related chunks.

* Each set begins with a `set` widget and ends with a `endSet` widget.
* Nesting of sets is possible and sets are especially powerful when combined with dynamic expressions to conditionally show/hide content.
* Sets enable apps to offer [progress tracking](https://www.smashingmagazine.com/2010/01/progress-trackers-in-web-design-examples-and-best-design-practices/) components.
* Multi-step "wizard" interfaces are also easily achieved via sets.


### <a name="expression"></a>Expressions

Formscript uses __expressions__ to deliver dynamic content. Expressions are used to:

* Conditionally show/hide widgets depending on values as they change.
* Validate form content based on more complex business rules.
* Affect the contents of enumerated lists.
* Default dynamic values.
* Calculate running totals, real-time summaries etc.

Consider an expression to be something that could be evaluated in a Javascript `if (...) {}` statement.

```json
{
  "widgets": [
    {
      "id": "userWantsToGiveFeedback",
      "type": "switch",
      "attributes": {
        "default": false,
        "heading": "Do you want to leave feedback?"
      }
    },
    {
      "id": "feedback",
      "showWhen": "data.userWantsToGiveFeedback",
      "type": "textarea",
      "attributes": {
        "heading": "Feedback",
        "desc": "Please tell us how you feel!"
      }
    }
  ]
}
```

__In the example above we have two widgets:__

* The first is a simple boolean on/off `switch` widget (with the `id` of `userWantsToGiveFeedback`) which is by default set to `false`.
* The second widget is a big textbox (with the `id` of `feedback`) for collecting feedback from the user.

The `feedback` widget should only show if the `userWantsToGiveFeedback` switch is thrown on (i.e. `true`).

There are a few new things going on here.
Most types of widget (here the `switch` and `textarea` types) expect an app to read and write their values to an underlying `data` object (using their respective `id` values as keys).
It is also expected that any app implementing Formscript should also make this `data` object available within a safe sandbox while evaluating expressions.

In the previous example we can see the `showWhen` attribute is being used on the `feedback` widget. The string value here is an _expression_, which will control the visibility of the widget (i.e. it should only be shown to the user when the expression evaluates to `true`).

#### <a name="sandbox"></a>Expression sandbox

Apps must ensure expressions are evaluated in a safe sandbox context. As such only certain objects may be referred to within an expression:

| Sandbox object | Description |
| -------------- | ----------- |
| `data`         | The current form data being stored. Should be kept fresh in real-time using UI binding techniques. |
| `env`          | Some environmental information, e.g. the user's name, if the app has access to an internet connection etc. |

##### __`env` object properties__

Apps are expected to provide the following details via an `env` object when evaluating expressions:

| Property         | Type      | Description |
| ---------------- | --------- | ----------- |
| `username`       | `string`  | Username of the the user currently using the form. |
| `startedOffline` | `boolean` | Indicates if the form was started online, or not. |

##  <a name="reference"></a>Reference

### <a name="top-level"></a>Top-Level Properties

The top-level object defining a form comprises of several properties:

| Property         | Type      | Description | Required?   |
| ---------------- | --------- | ----------- | ----------- |
| `title` | `string` | A short-as-possible label to associate with the form. | `false` |
| `desc` | `string` | A quick summary of what the form is hoping to achieve. | `false` |
| `version` | `string` | Denotes the current version of the form definition. This will be assigned by whatever tooling and processes conjure your forms. There is a strong preference that form version strings adhere to [Semantic Versioning](http://nodesource.com/blog/semver-a-primer/). | `false` |
| `shasum` | `string` | Optionally assigned by tooling, this is a checksum value based on the form-definition. Uses include client-side storage management of form definitions and integrity checking. | `false` |
| `widgets` | `array` | The main event, 1 or more `widget` objects which an app should render to produce a form. | `true` |



### <a name="properties"></a>Widget Properties

Each `widget` object comprise of some properties:

| Attribute Name | Type | Description |
| -------------- | -----| ----------- |
| `id` | `string` | A unique string which identifies the widget - often used to bind the value being collected by a widget to an underlying data model. Providing an `id` value is very often mandatory (depending on the type of widget involved). Regardless, it is good practice to always provide an `id` because it assists modification (or &#34;_patching_&#34;) of form definitions. |
| `type` | `string` | A mandatory value denoting the type of widget being defined (e.g. `text`, `number` etc.) |
| `showWhen` | `string` | An expression, that when evaluating to `true` will cause the widget to appear (so the widget will not be shown if evaluated to be `false`). |
| `attributes` | `object` | A key/value object for configuring each widget - the content of which is dependent on the widget's `type`. |

### <a name="attributes"></a>Widget Attributes

Formscript `0.0.2` supports a set of 15 common attributes from which widgets can be configured.
Not one widget-type requires all these attributes. Attributes are often optional and some widget-types don't need an `attributes` object at all.
 
| Attribute Name | Type | Description |
| -------------- | -----| ----------- |
| `default` | `any` | A value to default a widget to if not supplied by other mechanisms. |
| `defaultBoolean` | `boolean` | A boolean value to default a widget to if not supplied by other mechanisms. |
| `defaultNumber` | `number` | A numeric value to default a widget to if not supplied by other mechanisms. |
| `defaultString` | `string` | A string value to default a widget to if not supplied by other mechanisms. |
| `desc` | `string` | Some additional advice (above and beyond the string supplied in `label`) to help define what data is required from the user. |
| `enabled` | `boolean` | Indicates if the user can use the widget to alter the underlying value - default to `true`. |
| `heading` | `string` | Some short, strong, punchy text to identify the widget. |
| `help` | `string` | More detailed guidance/advice (building on top of `description` content) to help shape what data is collected from the user. |
| `label` | `string` | A short piece of text to help identify what content is required by the user. |
| `mandatory` | `boolean` | Indicates if a value needs to be supplied by the user, or if it&#39;s optional. |
| `maxCharacters` | `number` | The maximum length of number of characters a user can specify. |
| `minCharacters` | `number` | The minimum length of number of characters a will need to provide. |
| `numericValue` | `value` | Explicitly assert that the widget receive and store numeric values (usually of use with title-map enumerations). |
| `placeholder` | `string` | Some example text that can be appear ina widget ahead of collecting use input.  |
| `titleMap` | `array` | An array of objects denoting a set of values that the user can select from. |


### <a name="list"></a>Widget List


<hr>

## <a name="list-address"></a>`address`

> Allows the user to __select__ a particular postal address from a provided list and store a unique reference to that property, such as a [UPRN](https://www.ordnancesurvey.co.uk/about/governance/policies/addressbase-uprn.html) or similar.

``` json
{
  "id": "patientAddress",
  "type": "address",
  "attributes": {
    "heading": "Where does the patient live?",
    "desc": "If it's not possible to ascertain an accurate address from the patient then please select 'Unknown'",
    "mandatory": true,
    "results": {
      "limit": 20,
      "pagination": true
    },
    "params": {
      "enableUnknownOption": true,
      "enableLocationAssist": false
    }
  }
}

```


<hr>

## <a name="list-apiLookup"></a>`apiLookup`

> Allows the user to select a specific value from an API endpoint

``` json
{
  "id": "",
  "type": "apiLookup",
  "attributes": {
    "apiName": "fleet",
    "heading": "Fire Appliance",
    "desc": "Please select the Fire Appliance involved with this event",
    "mandatory": true,
    "results": {
      "limit": 20,
      "pagination": true
    },
    "params": {
      "showCurrentOnly": true,
      "showOperationalOnly": true
    }
  }
}

```


<hr>

## <a name="list-checkboxList"></a>`checkboxList`

> Offer a related set of checkboxes with accompanying labels for the user to switch on and off.

``` json
{
  "id": "limbMovement",
  "type": "checkboxList",
  "attributes": {
    "heading": "Which limbs were seen to move?",
    "default": [
      "LEFT_ARM",
      "RIGHT_ARM",
      "LEFT_LEG",
      "RIGHT_LEG"
    ],
    "minLimit": 0,
    "maxLimit": 4,
    "titleMap": [
      {
        "value": "LEFT_ARM",
        "title": "Left arm"
      },
      {
        "value": "RIGHT_ARM",
        "title": "Right arm"
      },
      {
        "value": "LEFT_LEG",
        "title": "Left leg"
      },
      {
        "value": "RIGHT_LEG",
        "title": "Right leg"
      }
    ]
  }
}

```


<hr>

## <a name="list-currency"></a>`currency`

> Just like a `number` widget, but for specifically collecting a monetary value.

``` json
{
  "id": "price",
  "type": "currency",
  "attributes": {
    "mandatory": true,
    "heading": "Purchase price",
    "desc": "How much did this stock-item cost from the supplier?"
  }
}

```


<hr>

## <a name="list-date"></a>`date`

> Allows the user to provide a specific date - without a time portion.

``` json
{
  "id": "dateOfBirth",
  "type": "date",
  "attributes": {
    "mandatory": true,
    "heading": "Date of birth",
    "desc": "Date the employee was born",
    "historicByAtLeast": "18 years"
  }
}

```


<hr>

## <a name="list-dateTime"></a>`dateTime`

> Collects a specific date and time from the user.

``` json
{
  "id": "appointment",
  "type": "dateTime",
  "attributes": {
    "mandatory": true,
    "heading": "Appointment",
    "desc": "The date and time this visit is scheduled for",
    "captureHistoric": false,
    "futuristicByAtMost": "3 months"
  }
}

```


<hr>

## <a name="list-endSet"></a>`endSet`

> Marks the end of a set of related widgets - see the [Sets](#set) section for more information.

``` json
{
  "widgets": [
    {
      "type": "set",
      "attributes": {
        "heading": "Incident details",
        "desc": "Please provide details of the incident at which casualty care was administered.",
        "showInTOC": true
      }
    },
    {
      "type": "endSet"
    }
  ]
}

```


<hr>

## <a name="list-endSubForm"></a>`endSubForm`

> Marks the end of a sub-form - see the [Sets](#set) section for more information.

``` json
{
  "widgets": [
    {
      "type": "subForm",
      "attributes": {
        "heading": "Explosions",
        "desc": "Please provide details of the explosions which occurred.",
        "minAllowed": 1,
        "maxAllowed": 10,
        "showAtLeastOne": true,
        "singularEntityText": "explosion",
        "pluralEntityText": "explosions"
      }
    },
    {
      "type": "endSubForm"
    }
  ]
}

```


<hr>

## <a name="list-fileUpload"></a>`fileUpload`

> Allows the user to upload a file.

``` json
{
  "id": "photographicEvidence",
  "type": "fileUpload",
  "attributes": {
    "heading": "Any photographic evidence?",
    "desc": "Upload any digital photographs supporting your observations",
    "enableCaptioning": true,
    "formatRestriction": [
      "jpg",
      "jpeg"
    ],
    "maxFileSize": "15mb",
    "minNumberOfFiles": 0,
    "maxNumberOfFiles": 10
  }
}

```


<hr>

## <a name="list-header"></a>`header`

> Displays a header for a form (with an optional background image and some text akin to a &#39;[Hero Unit](https://en.wikipedia.org/wiki/Hero_image)&#39; component).

``` json
{
  "type": "header",
  "attributes": {
    "heading": "Patient Report",
    "desc": "Use this form to provide details of patient care administered at the scene of an incident.",
    "backgroundImage": "wmfs/casualty-care-background.jpg",
    "backgroundImageAltText": "Photograph of activity at a Road Traffic Collision"
  }
}

```


<hr>

## <a name="list-image"></a>`image`

> Embeds a non-interactive image within the form.

``` json
{
  "id": "numberOfFloors",
  "type": "image",
  "attributes": {
    "image": "wmfs/number-of-floors-diagram.png",
    "altText": "Indicates ground-floor is referred to as '0' and one above it is referred to as '1': but the total number of floors is 2."
  }
}

```


<hr>

## <a name="list-map"></a>`map`

> Displays a map to the user, and can optionally be configured to collect geo-spatial data (points, lines etc.)

``` json
{
  "id": "incidentCoordinates",
  "type": "map",
  "attributes": {
    "heading": "Point of ignition",
    "mandatory": true,
    "desc": "Please indicate the exact position of where the fire started.",
    "enableLocationAssist": true,
    "drawingMode": "singlePoint",
    "drawingConfig": {
      "autoCentre": true,
      "iconImage": "wmfs/flame"
    },
    "relatedLayers": [
      {
        "name": "gaz",
        "heading": "Gazetteer",
        "desc": "Buildings and similar",
        "visibleByDefault": false
      }
    ]
  }
}

```


<hr>

## <a name="list-number"></a>`number`

> Like a `text` widget, but specifically for collecting numeric content.

``` json
{
  "id": "numShocks",
  "type": "number",
  "attributes": {
    "mandatory": true,
    "default": 2,
    "heading": "How many shocks were delivered?"
  }
}

```


<hr>

## <a name="list-questionnaire"></a>`questionnaire`

> Offers the user a question with two or more possible responses on an appropriate scale.

``` json
{
  "id": "painArrival",
  "type": "questionnaire",
  "attributes": {
    "mandatory": true,
    "heading": "Pain-score on arrival",
    "desc": "How did the carer assess the patient's pain when they first met?",
    "default": 1,
    "numericValue": true,
    "titleMap": [
      {
        "value": 0,
        "title": "0",
        "desc": "No pain"
      },
      {
        "value": 1,
        "title": "1",
        "desc": "Slight pain"
      },
      {
        "value": 2,
        "title": "2",
        "desc": "Moderate pain"
      },
      {
        "value": 3,
        "title": "3",
        "desc": "Severe pain"
      }
    ]
  }
}

```


<hr>

## <a name="list-radio"></a>`radio`

> Allows the user to select a value from a set of related options that are rendered in a [Radio Button](https://en.wikipedia.org/wiki/Radio_button) style.

``` json
{
  "id": "gender",
  "type": "radio",
  "attributes": {
    "heading": "Patient gender",
    "mandatory": true,
    "titleMap": [
      {
        "value": "MALE",
        "title": "Male"
      },
      {
        "value": "FEMALE",
        "title": "Female"
      },
      {
        "value": "UNKNOWN",
        "title": "Unknown"
      }
    ]
  }
}

```


<hr>

## <a name="list-richtext"></a>`richtext`

> Offers the user a text editor with functionality to format text.

``` json
{
  "id": "clinicalNotes",
  "type": "richtext",
  "attributes": {
    "heading": "Clinical Notes?",
    "mandatory": false,
    "desc": "If you have any clinical notes, please enter them here"
  }
}

```


<hr>

## <a name="list-select"></a>`select`

> Allows the user to select a value from a set of options, which should be rendered in an [HTML Select](https://en.wikipedia.org/wiki/HTML_element) style.

``` json
{
  "id": "choking",
  "type": "select",
  "attributes": {
    "heading": "Choking?",
    "desc": "Was the patient choking, if so what treatment was administered?",
    "mandatory": true,
    "default": "NOT_APPLICABLE",
    "titleMap": [
      {
        "value": "NOT_APPLICABLE",
        "title": "No choking - not applicable"
      },
      {
        "value": "COUGH",
        "title": "Encourage cough"
      },
      {
        "value": "BACK_SLAPS",
        "title": "Back slaps"
      },
      {
        "value": "ABDOMINAL_THRUSTS",
        "title": "Adbominal/Chest thrusts"
      },
      {
        "value": "COMPRESSIONS",
        "title": "Chest compressions (CPR)"
      },
      {
        "value": "OTHER",
        "title": "Other"
      }
    ]
  }
}

```


<hr>

## <a name="list-set"></a>`set`

> Marks the start of a set of related widgets - see the [Sets](#set) section for more information.

``` json
{
  "widgets": [
    {
      "type": "set",
      "attributes": {
        "heading": "Incident details",
        "desc": "Please provide details of the incident at which casualty care was administered.",
        "showInTOC": true
      }
    },
    {
      "type": "endSet"
    }
  ]
}

```


<hr>

## <a name="list-signature"></a>`signature`

> Allow the collection of a handwritten signature

``` json
{
  "id": "confirmation",
  "type": "signature",
  "attributes": {
    "heading": "Customer acknowledgement",
    "desc": "Please sign here to confirm receipt of some service",
    "help": "Hand the device over to the customer",
    "mandatory": true
  }
}

```


<hr>

## <a name="list-slider"></a>`slider`

> For capturing a number along a specified range

``` json
{
  "id": "burnArea",
  "type": "slider",
  "attributes": {
    "mandatory": true,
    "heading": "Estimated body surface area burnt (%)",
    "default": 0,
    "minimum": 0,
    "maximum": 100,
    "step": 5
  }
}

```


<hr>

## <a name="list-stickyNote"></a>`stickyNote`

> A panel for putting helpful text or other informative text

``` json
{
  "id": "info",
  "type": "stickyNote",
  "attributes": {
    "style": "informative",
    "heading": "Remember!",
    "desc": "Floor numbering starts with 0 (ground floor)."
  }
}

```


<hr>

## <a name="list-subForm"></a>`subForm`

> Allows the user to enter a number of &#39;sub forms&#39; (think order-lines or contact details etc.)

``` json
{
  "widgets": [
    {
      "type": "subForm",
      "attributes": {
        "heading": "Explosions",
        "desc": "Please provide details of the explosions which occurred.",
        "minAllowed": 1,
        "maxAllowed": 10,
        "showAtLeastOne": true,
        "singularEntityText": "explosion",
        "pluralEntityText": "explosions"
      }
    },
    {
      "type": "endSubForm"
    }
  ]
}

```


<hr>

## <a name="list-switch"></a>`switch`

> Presents a on/off style switch to the user.

``` json
{
  "id": "burns",
  "type": "switch",
  "attributes": {
    "heading": "Did the patient suffer burns?",
    "default": false
  }
}

```


<hr>

## <a name="list-text"></a>`text`

> A bread-and-butter box for collecting textual information from the user.

``` json
{
  "id": "handover",
  "type": "text",
  "attributes": {
    "heading": "Who was the patient handed over to?",
    "desc": "Please provide Emergency service and name of person.",
    "placeholder": "Service/name",
    "mandatory": false,
    "minCharacters": 10
  }
}

```


<hr>

## <a name="list-textarea"></a>`textarea`

> Collects simple multi-line text input from the user.

``` json
{
  "id": "clinicalNotes",
  "type": "richtext",
  "attributes": {
    "heading": "Clinical Notes?",
    "mandatory": false,
    "desc": "If you have any clinical notes, please enter them here"
  }
}

```


<hr>

## <a name="list-time"></a>`time`

> Allows the user to provide a specific time (without being tied to a particular date)

``` json
{
  "id": "openingTime",
  "type": "time",
  "attributes": {
    "mandatory": true,
    "heading": "Opening Time",
    "desc": "What time does the business usually open?"
  }
}

```



<hr>

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fwmfs%2Fformscript.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fwmfs%2Fformscript?ref=badge_large)

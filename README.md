# Formscript
### Version `0.0.2`

[![Build Status](https://travis-ci.org/wmfs/formscript.svg?branch=master)](https://travis-ci.org/wmfs/formscript) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fwmfs%2Fformscript.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fwmfs%2Fformscript?ref=badge_shield) [![Known Vulnerabilities](https://snyk.io/test/github/wmfs/formscript/badge.svg?targetFile=package.json)](https://snyk.io/test/github/wmfs/formscript?targetFile=package.json) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) [![Dependabot badge](https://img.shields.io/badge/Dependabot-active-brightgreen.svg)](https://dependabot.com/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wmfs/formscript/blob/master/CONTRIBUTING.md)

This document defines a [JSON](https://tools.ietf.org/html/rfc7159)-based language used to describe form content declaratively.
The forms thus defined may be rendered and executed by software.
In this document, the software is referred to as "the app".

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
  * [Top-level fields](#top-level)
* [Concepts](#concepts)
  * [Form](#form)
  * [Widgets](#widgets)
* [Reference](#reference)
* [Appendices](#appendicies)
  * [Appendix A: Tooling](#tooling)

## <a name="concepts"></a>Concepts

### <a name="form"></a>Form

### <a name="widgets"></a>Widgets


## <a name="structure"></a>Structure of a Form

A Form is represented by a [JSON Object](https://tools.ietf.org/html/rfc7159#section-4]).

### <a name="example"></a>Example: Simple Form

The content of a form is specified by configuring _widgets_, which are represented by JSON objects.

* Widgets are defined in the top-level `widgets` array.

In this example, the form is to contain two widgets, one that defines a suitable header (with some text and an accompanying image),
followed by a second widget for letting the user enter a name.

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

* The order that objects are defined within `widgets` is important... representing the order users will encounter them.

### <a name="top-level"></a>Top-level fields

* A Form MUST have an array named `widgets`, whose contents represent the forms content.
* The `widgets` array MUST contain at least one widget object.





## <a name="widgets"></a>Widgets

__As shown in the example above, a form definition is mainly a `widgets` array containing 1 or more objects.__

* To avoid overloading frontend-terms like 'component', Formscript refers to each object in the `widgets` array as a __widget__.
* Widgets can be interactive (`text`, `number`, `map` etc.) and non-interactive (`heading`, `stickyNote` etc.)
* The order that `Widget` objects appear within `widgets` is important... representing the order users should encounter them.
* Formscript offers a fixed set of configurable widgets. Need another widget-type entirely or extra config? [Pull requests are very welcome!](https://github.com/wmfs/Formscript/blob/master/CONTRIBUTING.md)
* Note that widgets can be arranged into "sets" to help define from structure (perhaps splitting a large form into sections, or implementing wizard interfaces).

###  <a name="summary"></a>Widget Summary

To help get a feel about what's possible in Formscript, here's a quick summary of the 22 widgets supported in version `0.0.2`:

| Widget Type      | Description |
| -----------      | ----------- |
| `address` | Allows the user to __select__ a particular postal address from a provided list and store a unique reference to that property, such as a [UPRN](https://www.ordnancesurvey.co.uk/about/governance/policies/addressbase-uprn.html) or similar. |
| `checkboxList` | Offer a related set of checkboxes with accompanying labels for the user to switch on and off. |
| `date` | Allows the user to provide a specific date - without a time portion. |
| `dateTime` | Collects a specific date and time from the user. |
| `endSet` | Marks the end of a set of related widgets - see the [Sets](#sets) section for more information. |
| `fileUpload` | Allows the user to upload a file. |
| `header` | Displays a header for a form (with an optional background image and some text akin to a &#39;[Hero Unit](https://en.wikipedia.org/wiki/Hero_image)&#39; component). |
| `image` | Embeds a non-interactive image within the form. |
| `map` | Displays a map to the user, and can optionally be configured to collect geo-spatial data (points, lines etc.) |
| `number` | Like a `text` widget, but specifically for collecting numeric content. |
| `questionnaire` | Offers the user a question with two or more possible responses on an appropriate scale. |
| `radio` | Allows the user to select a value from a set of related options that are rendered in a [Radio Button](https://en.wikipedia.org/wiki/Radio_button) style. |
| `richtext` | Offers the user a text editor with functionality to format text. |
| `select` | Allows the user to select a value from a set of options, which should be rendered in an [HTML Select](https://en.wikipedia.org/wiki/HTML_element) style. |
| `set` | Marks the start of a set of related widgets - see the [Sets](#sets) section for more information. |
| `slider` | For capturing a number along a specified range |
| `stickyNote` | A panel for putting helpful text or other informative text |
| `subForm` | Allows the user to enter a number of &#39;sub forms&#39; (think order-lines or contact details etc.) |
| `switch` | Presents a on/off style switch to the user. |
| `text` | A bread-and-butter box for collecting textual information from the user. |
| `textarea` | Collects simple multi-line text input from the user. |
| `time` | Allows the user to provide a specific time (without being tied to a particular date) |


* More detail is available in the Reference section.

### <a name="properties"></a>Widget Properties

Widget objects comprise of some properties:

| Attribute Name | Type | Description |
| -------------- | -----| ----------- |
| `id` | `string` | A unique string which identifies the widget - often used to bind the value being collected by a widget to an underlying data model. |
| `type` | `string` | Denotes the type of widget being defined (e.g. `text`, `number` etc.) |
| `showWhen` | `string` | An expression which evaluates to `true` will cause the widget to appear (so the widget will not be shown to the user if evaluated to be `false`). |
| `attributes` | `object` | A key/value object for tailoring each widget - the content of which is dependent on the widget's `type`. |

<!--| Property     | Mandatory? | Description |-->
<!--| `id`         | Depends     | A string which uniquely identifies the widget amongst others found within this `widgets` array. Note a small set of widgets don't require an `id` value, but most will. |-->
<!--| `type`       | Yes        | A string indicating the type of widget to render (e.g. `text`, `number`, `select` etc.) See the Reference section for  complete list. |-->
<!--| `showWhen`   | No         | A string containing an expression, that if truthy will cause the widget to appear within the UI, else it shouldn't be shown to the user. |-->
<!--| `attributes` | No         | An object of key/value keys which help configure the widget - the exact keys supported will depend on the widget's `type`. |-->


### <a name="attributes"></a>Widget Attributes

Formscript `0.0.2` supports a set of 15 attributes from which widgets can be configured. Not all widget-types support all attributes - attributes are often optional and some widget-types don't need attributes at all.
 
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


## <a name="expressions"></a>Expressions

Formscript uses __expressions__ to help bring things to life. Expressions are used to:

* Conditionally show/hide widgets depending on values as they are entered
* Validate form content based on more complex rules
* Affect the contents of enumerations 
* Default dynamic values

```json
{
  "widgets": [
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
  "widgets": [
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

Form content in Formscript is pretty-much "flat"... things aren't split into different "section" objects at the top-level (though repeating/nested groups are supported, more on that later).

* Defining sections to aid navigation of larger forms is still entirety possible using Formscript though - simply add a `section` widget amongst your other widgets.
* This is a design decision to help align Formscript better with mobile implementations.
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

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fwmfs%2Fformscript.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fwmfs%2Fformscript?ref=badge_large)

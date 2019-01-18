
<!---    SSSSSSSSSSSSSSS TTTTTTTTTTTTTTTTTTTTTTT     OOOOOOOOO     PPPPPPPPPPPPPPPPP    !!!  --->
<!---  SS:::::::::::::::ST:::::::::::::::::::::T   OO:::::::::OO   P::::::::::::::::P  !!:!! --->
<!--- S:::::SSSSSS::::::ST:::::::::::::::::::::T OO:::::::::::::OO P::::::PPPPPP:::::P !:::! --->
<!--- S:::::S     SSSSSSST:::::TT:::::::TT:::::TO:::::::OOO:::::::OPP:::::P     P:::::P!:::! --->
<!--- S:::::S            TTTTTT  T:::::T  TTTTTTO::::::O   O::::::O  P::::P     P:::::P!:::! --->
<!--- S:::::S                    T:::::T        O:::::O     O:::::O  P::::P     P:::::P!:::! --->
<!---  S::::SSSS                 T:::::T        O:::::O     O:::::O  P::::PPPPPP:::::P !:::! --->
<!---   SS::::::SSSSS            T:::::T        O:::::O     O:::::O  P:::::::::::::PP  !:::! --->
<!---     SSS::::::::SS          T:::::T        O:::::O     O:::::O  P::::PPPPPPPPP    !:::! --->
<!---        SSSSSS::::S         T:::::T        O:::::O     O:::::O  P::::P            !:::! --->
<!---             S:::::S        T:::::T        O:::::O     O:::::O  P::::P            !!:!! --->
<!---             S:::::S        T:::::T        O::::::O   O::::::O  P::::P             !!!  ---> 
<!--- SSSSSSS     S:::::S      TT:::::::TT      O:::::::OOO:::::::OPP::::::PP                ---> 
<!--- S::::::SSSSSS:::::S      T:::::::::T       OO:::::::::::::OO P::::::::P           !!!  --->
<!--- S:::::::::::::::SS       T:::::::::T         OO:::::::::OO   P::::::::P          !!:!! --->
<!---  SSSSSSSSSSSSSSS         TTTTTTTTTTT           OOOOOOOOO     PPPPPPPPPP           !!!  --->
<!---                                                                                        ---> 
<!---            T H I S   R E A D M E . M D   F I L E   I S   G E N E R A T E D !           --->
<!---                                                                                        --->
<!---    IF YOU EDIT IT DIRECTLY YOUR CHANGES WILL BE WASHED AWAY THE NEXT TIME THIS FILE    --->
<!---            IS GENERATED. INSTEAD, CHANGE THE EJS TEMPLATE (/lib/template.md)           --->
<!---                                                                                        --->


# Cardscript

[![Build Status](https://travis-ci.org/wmfs/cardscript.svg?branch=master)](https://travis-ci.org/wmfs/cardscript) [![CodeFactor](https://www.codefactor.io/repository/github/wmfs/cardscript/badge)](https://www.codefactor.io/repository/github/wmfs/cardscript) [![Known Vulnerabilities](https://snyk.io/test/github/wmfs/cardscript/badge.svg?targetFile=package.json)](https://snyk.io/test/github/wmfs/cardscript?targetFile=package.json) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) [![Dependabot badge](https://img.shields.io/badge/Dependabot-active-brightgreen.svg)](https://dependabot.com/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wmfs/cardscript/blob/master/CONTRIBUTING.md)

#### The goal of Cardscript is to provide a [JSON](https://tools.ietf.org/html/rfc7159)-based language to describe User Interfaces (especially those which form part of a digital service).

## Getting started

#### Get hands-on with Cardscript using the online [Cardscript Playpen](https://wmfs.github.io/cardscript/)!

* For some introductory context around why we developed Cardscript, please see [Appendix A: Cardscript Motivation](#motivation).
* A [JSON Schema (Draft-07)](http://json-schema.org/) for Cardscript is available [here](https://raw.githubusercontent.com/wmfs/cardscript/master/packages/cardscript-schema/lib/schema.json).
* The Cardscript [Lerna](https://lernajs.io/) multi-package repository (developed in the open on [Github](https://github.com/wmfs/cardscript)) provides several utilities to help work with the language. Please see [Appendix B: Cardscript Utilities](#utilities) for further information.

## <a name="toc"></a>Table of Contents

* [Structure of a Card](#structure)
  * [Example: Simple Card](#example)
* [Concepts](#concepts)
  * [Cards](#card)
  * [Apps](#app)
  * [Elements](#element)
    * [Element summary](#element-summary)
  * [Containers](#container)
  * [Expressions](#expression)
* [Reference](#reference)
  * [Top-Level Properties](#top-level)
  * [Element Properties](#properties)
  * [Element Attributes](#attributes)
  * [Element List](#list)
* [License (MIT)](#license)
* [Appendices](#appendices)
  * [Appendix A: Cardscript Motivation](#motivation)
  * [Appendix B: Cardscript Utilities](#utilities)

## <a name="structure"></a>Structure of a Card

__In Cardscript, a _card_ is represented by a [JSON Object](https://tools.ietf.org/html/rfc7159#section-4]).__

### <a name="example"></a>Example: Simple Card

__The content of a [_card_](#card) is specified by configuring one-or-more [_elements_](#element), which are represented by JSON objects.__

* In this example, a card is defined that contains two elements, one that defines a suitable [`Jumbotron`](#list-Jumbotron) (with some text and an accompanying image),
followed by a second [`Input.Text`](#list-Input.Text)-element for letting the user enter their name.

``` json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
  "body": [
    {
      "type": "Container",
      "items": [
        {
          "type": "Jumbotron",
          "backgroundImage": "wmfs/happy-people.jpg",
          "title": "Register!",
          "subtitle": "Let's get to know each other a bit better...",
          "wash": "black"
        },
        {
          "type": "TextBlock",
          "text": "Name",
          "wrap": true,
          "separator": true
        },
        {
          "type": "Input.Text",
          "id": "name",
          "placeholder": "e.g. Lucy Smith"
        }
      ]
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Submit"
    }
  ]
}
```

## <a name="concepts"></a>Concepts

__Cardscript is built on a handful of key concepts...__

### <a name="card"></a>Cards

The purpose of Cardscript is to define a user interface, referred to as a "__card__".


* With Cardscript it's possible to configure a card with structure, validation, conditional content, dynamic values and context-sensitive behaviours (e.g. operating differently with an internet connection as opposed to without).
* Cardscript definitions are naturally stored in `.json` files (typically one-file-per-view).
* In certain situations [YAML](https://en.wikipedia.org/wiki/YAML) (itself just a superset of JSON) may offer an interesting alternative to serialising Cardscript definitions (the [cardscript-parser](https://github.com/wmfs/cardscript/tree/master/packages/cardscript-parser) utility supports both)..
* Please note that a [JSON Schema](http://json-schema.org/) is available [here](https://raw.githubusercontent.com/wmfs/cardscript/master/packages/cardscript-schema/lib/schema.json), which may be used to validate the basic integrity of Cardscript content.
* For more comprehensive Cardscript validation, please refer to the [cardscript-schema](https://www.npmjs.com/package/cardscript-schema) package.

### <a name="app"></a>Apps

Views defined in Cardscript may be rendered and executed by software.
In this document, such software is referred to an "__app__".

* Apps can be implemented in any frontend-framework, language or library.
* Cardscript does not impose any aesthetic or UI constraints onto apps which implement it.
* Cardscript content can be embedded inside apps with [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface), [CLI](https://en.wikipedia.org/wiki/Graphical_user_interface) and even [Voice-User](https://en.wikipedia.org/wiki/Voice_user_interface) interfaces.
* Please note several utilities are available to help embed Cardscript into apps. Please see [Appendix B: Cardscript Utilities](#utilities) for further information.

### <a name="element"></a>Elements

Cards are constructed from an ordered list of "__elements__".

* To avoid overloading frontend-terms like 'component', Cardscript refers to each object in the `elements` array as an __element__.
* Consider an element as an area of a view responsible for a particular task: either collecting a specific piece of information from a user or visualising some data.
* As such, elements can be interactive ([`Input.Text`](#list-Input.Text), [`Input.Number`](#list-Input.Number), etc.) and non-interactive ([`Jumbotron`](#list-Jumbotron), [`Media`](#list-Media) etc.)
* The order that `Element` objects appear within a view definition is important - representing the order users will encounter them.
* Cardscript is a delightful walled-garden, offering a fixed set of 15 p re-configured elements. If you need another element-type or an extra attribute... [pull requests are very welcome!](https://github.com/wmfs/Cardscript/blob/master/CONTRIBUTING.md) :blush:

__Ahead of the [Reference](#reference) section, here's a quick summary of the 15 elements supported in Cardscript:__

#### <a name="element-summary"></a>Element summary

| Element Type      | Description |
| -----------      | ----------- |
| [`AdaptiveCard`](#list-AdaptiveCard) | Root element in an Adaptive Card. |
| [`AddressBlock`](#list-AddressBlock) | Displays an address. |
| [`CardList`](#list-CardList) | A container which opens a modal when clicked on to show a card. |
| [`Chip`](#list-Chip) | A chip to display some text. |
| [`Fact`](#list-Fact) | Describes a Fact in a FactSet as a key/value pair. |
| [`FactSet`](#list-FactSet) | The FactSet element displays a series of facts (i.e. name/value pairs) in a tabular form. |
| [`Image`](#list-Image) | Displays an image. |
| [`Jumbotron`](#list-Jumbotron) | An element typically placed at the top of a card to describe its purpose. |
| [`Map`](#list-Map) | Displays a map. |
| [`Media`](#list-Media) | Displays a media player for audio or video content. |
| [`MediaSource`](#list-MediaSource) | Defines a source for a Media element |
| [`PhaseBanner`](#list-PhaseBanner) | Displays a banner highlighting a phase. |
| [`Separator`](#list-Separator) | Displays a horizontal line. |
| [`Table`](#list-Table) | Displays text, allowing control over font sizes, weight, and color. |
| [`TextBlock`](#list-TextBlock) | Displays text, allowing control over font sizes, weight, and color. |


### <a name="container"></a>Containers

All the [elements](#element) that define a [view](#view)'s content are specified in a simple array.
This design helps align Cardscript with vertical-scrolling interfaces with very little friction.
To assist with navigation (especially around larger, more complex content) it might be useful to split a view into more manageable pieces.

* __In Cardscript,  _containers_ allow elements to be grouped into related chunks.__

__Example JSON__

``` json
{
  "title": "Simple set demo!",
  "widgets": [
    {
      "type": "set",
      "attributes": {
        "tocTitle": "Profile"
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
    },
    {
      "type": "endSet"
    }
  ]
}
```

* In this example, we are declaring that a [`text`](#list-text) element (with the id `name`) should be rendered within a container (which should appear in a Table of Contents with the heading "_Profile_").
* The beginning of each container is marked with a [`container`](#container) element.
* Nesting of containers is possible and containers are especially powerful when combined with dynamic [expressions](#expression) to conditionally show/hide content.
* Containers also enable apps to offer [progress tracking](https://www.smashingmagazine.com/2010/01/progress-trackers-in-web-design-examples-and-best-design-practices/) functionality.
* Multi-step "wizard" interfaces are also easily achieved via containers.
* The [`CardList`](#CardList) element uses exactly the same technique to define repeating-groups of elements.

### <a name="expression"></a>Expressions

Cardscript uses __expressions__ to deliver dynamic content. Expressions are used to:

* Conditionally show/hide elements depending on values as they change.
* Validate card content based on more complex business rules.
* Affect the contents of enumerated lists.
* Default dynamic values.
* Calculate running totals, real-time summaries etc.

Consider an expression to be something that could be evaluated in a Javascript `if (...) {}` statement.

```json
{
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "Jumbotron",
      "backgroundImage": "wmfs/happy-people.jpg",
      "title": "All done!",
      "subtitle": "We're all done here, we would really appreciate some feedback though!",
      "wash": "black"
    },
    {
      "spacing": "large",
      "id": "userWantsToGiveFeedback",
      "type": "Input.Toggle",
      "title": "I would like to leave some feedback"
    },
    {
      "spacing": "large",
      "id": "feedback",
      "showWhen": "data.userWantsToGiveFeedback === true",
      "type": "Input.Text",
      "isMultiline": "true",
      "placeholder": "Feedback"
    }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.0"
}
```

__In the example above we have three elements:__

1. The first element is a simple [`jumbotron`](#jumbotron).
2. The second element is a simple boolean on/off [`Input.Toggle`](#toggle) (with the `id` of `userWantsToGiveFeedback`) which is by default set to `false`.
3. The third element is an [`Input.Text`](#inputText) box (with the `id` of `feedback`) for collecting feedback from the user.

The `feedback` element should only show if the `userWantsToGiveFeedback` toggle is thrown on (i.e. `true`).

There are a few new things going on here.
Most types of element (here the `Toggle` and `Input.Text` types) expect an app to read and write their values to an underlying `data` object (using their respective `id` values as keys).
It is also expected that any app implementing Cardscript should also make this `data` object available within a safe sandbox while evaluating expressions.

In the previous example we can see the `showWhen` attribute is being used on the `feedback` element. The string value here is an _expression_, which will control the visibility of the element (i.e. it should only be shown to the user when the expression evaluates to `true`).

#### <a name="sandbox"></a>Expression sandbox

Apps must ensure expressions are evaluated in a safe sandbox context. As such only certain objects may be referred to within an expression:

| Sandbox object | Description |
| -------------- | ----------- |
| `data`         | The current card data being stored. Should be kept fresh in real-time using UI binding techniques. |
| `env`          | Some environmental information, e.g. the user's name, if the app has access to an internet connection etc. |

##### __`env` object properties__

Apps are expected to provide the following details via an `env` object when evaluating expressions:

| Property         | Type      | Description |
| ---------------- | --------- | ----------- |
| `username`       | `string`  | Username of the the user currently using the form. |
| `startedOffline` | `boolean` | Indicates if the form was started online, or not. |

##  <a name="reference"></a>Reference

<!--### <a name="top-level"></a>Top-Level Properties-->

<!--The top-level object defining a card comprises of several properties:-->

<!--| Property         | Type      | Description | Required?   |-->
<!--| &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; | -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; | -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; | -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; |-->
<!---->
<!--| `version` | `string` |  | `true` |-->
<!---->
<!--| `fallbackText` | `string` |  | `false` |-->
<!---->
<!--| `backgroundImage` | `string` |  | `false` |-->
<!---->
<!--| `speak` | `string` |  | `false` |-->
<!---->
<!--| `lang` | `string` |  | `false` |-->
<!---->


<!--### <a name="properties"></a>Element Properties-->

<!--Each `element` object comprise of some properties:-->

<!--| Attribute Name | Type | Description |-->
<!--| &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; | -&#45;&#45;&#45;&#45;| -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; |-->
<!---->
<!--| `Action.OpenUrl` | `object` |  |-->
<!---->
<!--| `Action.ShowCard` | `object` |  |-->
<!---->
<!--| `Action.Cancel` | `object` |  |-->
<!---->
<!--| `Action.Save` | `object` |  |-->
<!---->
<!--| `Action.Submit` | `object` |  |-->
<!---->
<!--| `AdaptiveCard` | `object` |  |-->
<!---->
<!--| `Input.Choice` | `object` |  |-->
<!---->
<!--| `Tab` | `object` |  |-->
<!---->
<!--| `Column` | `object` |  |-->
<!---->
<!--| `ActionSet` | `object` |  |-->
<!---->
<!--| `TabSet` | `object` |  |-->
<!---->
<!--| `ColumnSet` | `object` |  |-->
<!---->
<!--| `Container` | `object` |  |-->
<!---->
<!--| `Fact` | `object` |  |-->
<!---->
<!--| `FactSet` | `object` |  |-->
<!---->
<!--| `MediaSource` | `object` |  |-->
<!---->
<!--| `AddressBlock` | `object` |  |-->
<!---->
<!--| `Map` | `object` |  |-->
<!---->
<!--| `PhaseBanner` | `object` |  |-->
<!---->
<!--| `Separator` | `object` |  |-->
<!---->
<!--| `Media` | `object` |  |-->
<!---->
<!--| `Image` | `object` |  |-->
<!---->
<!--| `ImageSet` | `object` |  |-->
<!---->
<!--| `Input.ChoiceSet` | `object` |  |-->
<!---->
<!--| `Input.Date` | `object` |  |-->
<!---->
<!--| `Input.Number` | `object` |  |-->
<!---->
<!--| `Input.Slider` | `object` |  |-->
<!---->
<!--| `Input.FileUpload` | `object` |  |-->
<!---->
<!--| `Input.Email` | `object` |  |-->
<!---->
<!--| `Input.Currency` | `object` |  |-->
<!---->
<!--| `Input.Address` | `object` |  |-->
<!---->
<!--| `Input.ApiLookup` | `object` |  |-->
<!---->
<!--| `Input.Gender` | `object` |  |-->
<!---->
<!--| `Input.Name` | `object` |  |-->
<!---->
<!--| `Input.Signature` | `object` |  |-->
<!---->
<!--| `Input.TelephoneNumber` | `object` |  |-->
<!---->
<!--| `Input.DateTime` | `object` |  |-->
<!---->
<!--| `Input.Text` | `object` |  |-->
<!---->
<!--| `Input.Time` | `object` |  |-->
<!---->
<!--| `Input.Toggle` | `object` |  |-->
<!---->
<!--| `Table` | `object` |  |-->
<!---->
<!--| `TextBlock` | `object` |  |-->
<!---->
<!--| `Jumbotron` | `object` |  |-->
<!---->
<!--| `Chip` | `object` |  |-->
<!---->
<!--| `Collapsible` | `object` |  |-->
<!---->
<!--| `CardList` | `object` |  |-->
<!---->
<!--| `attributes` | `object` | A key/value object for configuring each element - the content of which is dependent on the element's `type`. |-->

### <a name="attributes"></a>Card Elements

Cardscript supports a set of 46 common attributes from which elements can be configured.
Not one element-type requires all these attributes. Attributes are often optional and some element-types don't need an `attributes` object at all.

| Element Name | Type | Description |
| -------------- | -----| ----------- |
| `Action.Cancel` | `object` | Allows to cancel out of a form. |
| `Action.OpenUrl` | `object` | When invoked, show the given url either by launching it in an external web browser or showing in-situ with embedded web browser. |
| `Action.Save` | `object` | Allows to save a form to continue later. |
| `Action.ShowCard` | `object` | Defines an AdaptiveCard which is shown to the user when the button or link is clicked. |
| `Action.Submit` | `object` | Gathers input fields, merges with optional data field, and sends an event to the client. It is up to the client to determine how this data is processed. For example: With BotFramework bots, the client would send an activity through the messaging medium to the bot. |
| `ActionSet` | `object` | ActionSet allows actions to be displayed within a card. |
| `AdaptiveCard` | `object` | Root element in an Adaptive Card. |
| `AddressBlock` | `object` | Displays an address. |
| `CardList` | `object` | A container which opens a modal when clicked on to show a card. |
| `Chip` | `object` | A chip to display some text. |
| `Collapsible` | `object` | A container which expands when clicked on to show a card. |
| `Column` | `object` | Defines a container that is part of a ColumnSet. |
| `ColumnSet` | `object` | ColumnSet divides a region into Columns, allowing elements to sit side-by-side. |
| `Container` | `object` | Containers group items together. |
| `Fact` | `object` | Describes a Fact in a FactSet as a key/value pair. |
| `FactSet` | `object` | The FactSet element displays a series of facts (i.e. name/value pairs) in a tabular form. |
| `Image` | `object` | Displays an image. |
| `ImageSet` | `object` | The ImageSet displays a collection of Images similar to a gallery. |
| `Input.Address` | `object` | Lets a user enter an address. |
| `Input.ApiLookup` | `object` | Lets a user look up a value via an API. |
| `Input.Choice` | `object` | Describes a choice for use in a ChoiceSet. |
| `Input.ChoiceSet` | `object` | Allows a user to input a Choice. |
| `Input.Currency` | `object` | Lets a user enter a currency value. |
| `Input.Date` | `object` | Lets a user choose a date. |
| `Input.DateTime` | `object` | Lets a user enter a telephone number. |
| `Input.Email` | `object` | Lets a user enter an email. |
| `Input.FileUpload` | `object` | Lets a user upload a file. |
| `Input.Gender` | `object` | Lets a user enter a gender. |
| `Input.Name` | `object` | Lets a user enter a name. |
| `Input.Number` | `object` | Allows a user to enter a number. |
| `Input.Signature` | `object` | Lets a user enter a signature. |
| `Input.Slider` | `object` | Lets a user enter value with a slider. |
| `Input.TelephoneNumber` | `object` | Lets a user enter a telephone number. |
| `Input.Text` | `object` | Lets a user enter text. |
| `Input.Time` | `object` | Lets a user select a time. |
| `Input.Toggle` | `object` | Lets a user choose between two options. |
| `Jumbotron` | `object` | An element typically placed at the top of a card to describe its purpose. |
| `Map` | `object` | Displays a map. |
| `Media` | `object` | Displays a media player for audio or video content. |
| `MediaSource` | `object` | Defines a source for a Media element |
| `PhaseBanner` | `object` | Displays a banner highlighting a phase. |
| `Separator` | `object` | Displays a horizontal line. |
| `Tab` | `object` | Defines a container that is part of a TabSet. |
| `TabSet` | `object` | TabSet allows to display content through various tabs. |
| `Table` | `object` | Displays text, allowing control over font sizes, weight, and color. |
| `TextBlock` | `object` | Displays text, allowing control over font sizes, weight, and color. |


# <a name="ActionList"></a>Actions

Here is the full list of all 5 actions supported in Cardscript (please see [Element summary](#element-summary) for a handy index).


<hr>

## The <a name="list-Action.Cancel"></a>`Action.Cancel` element

__Allows to cancel out of a form.__

__Example JSON__

``` json
{
  "type": "Action.Cancel",
  "title": "Cancel"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Action.Cancel"`. |
| `title` | string | `Optional` | Label for button or link that represents this action. |
| `iconUrl` | string | `Optional` | Optional icon to be shown on the action in conjunction with the title |





<hr>

## The <a name="list-Action.OpenUrl"></a>`Action.OpenUrl` element

__When invoked, show the given url either by launching it in an external web browser or showing in-situ with embedded web browser.__

__Example JSON__

``` json
{
  "type": "Action.OpenUrl",
  "title": "Open Url",
  "url": "https://github.com/wmfs/cardscript"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Action.OpenUrl"`. |
| `title` | string | `Optional` | Label for button or link that represents this action. |
| `iconUrl` | string | `Optional` | Optional icon to be shown on the action in conjunction with the title |
| `url` | string | `Required` | The URL to open. |





<hr>

## The <a name="list-Action.Save"></a>`Action.Save` element

__Allows to save a form to continue later.__

__Example JSON__

``` json
{
  "type": "Action.Save",
  "title": "Save"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Action.Save"`. |
| `title` | string | `Optional` | Label for button or link that represents this action. |
| `iconUrl` | string | `Optional` | Optional icon to be shown on the action in conjunction with the title |





<hr>

## The <a name="list-Action.ShowCard"></a>`Action.ShowCard` element

__Defines an AdaptiveCard which is shown to the user when the button or link is clicked.__

__Example JSON__

``` json
{
  "type": "Action.ShowCard",
  "title": "Action.ShowCard",
  "card": {
    "type": "AdaptiveCard",
    "body": [
      {
        "type": "TextBlock",
        "text": "What do you think?"
      },
      {
        "id": "opinion",
        "type": "Input.Text",
        "spacing": "large",
        "default": "Amazing!"
      }
    ]
  }
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Action.ShowCard"`. |
| `title` | string | `Optional` | Label for button or link that represents this action. |
| `iconUrl` | string | `Optional` | Optional icon to be shown on the action in conjunction with the title |
| `card` |  | `Required` |  |





<hr>

## The <a name="list-Action.Submit"></a>`Action.Submit` element

__Gathers input fields, merges with optional data field, and sends an event to the client. It is up to the client to determine how this data is processed. For example: With BotFramework bots, the client would send an activity through the messaging medium to the bot.__

__Example JSON__

``` json
{
  "type": "Action.Submit",
  "title": "Submit",
  "data": {
    "x": "y"
  }
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Action.Submit"`. |
| `title` | string | `Optional` | Label for button or link that represents this action. |
| `iconUrl` | string | `Optional` | Optional icon to be shown on the action in conjunction with the title |
| `data` | string,object | `Optional` | Initial data that input fields will be combined with. These are essentially 'hidden' properties. |






<hr>

# <a name="ContainerList"></a>Containers

Here is the full list of all 8 containers supported in Cardscript (please see [Element summary](#element-summary) for a handy index).


<hr>

## The <a name="list-ActionSet"></a>`ActionSet` element

__ActionSet allows actions to be displayed within a card.__

__Example JSON__

``` json
{
  "type": "ActionSet",
  "spacing": "large",
  "actions": [
    {
      "type": "Action.OpenUrl",
      "title": "Open Url",
      "url": "https://github.com/wmfs/cardscript"
    },
    {
      "type": "Action.Submit",
      "title": "Submit",
      "data": {
        "x": "y"
      }
    }
  ]
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"ActionSet"`. |
| `actions` |  | `Required` | The Actions to show in the card's action bar. |
| `spacing` |  | `Optional` |  |





<hr>

## The <a name="list-Collapsible"></a>`Collapsible` element

__A container which expands when clicked on to show a card.__

__Example JSON__

``` json
{
  "type": "Collapsible",
  "title": "Click me!",
  "card": {
    "type": "AdaptiveCard",
    "body": [
      {
        "type": "TextBlock",
        "text": "Hello!"
      }
    ]
  }
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Collapsible"`. |
| `title` | string | `Required` | Text to be displayed as label. |
| `card` |  | `Required` |  |





<hr>

## The <a name="list-Column"></a>`Column` element

__Defines a container that is part of a ColumnSet.__

__Example JSON__

``` json
{
  "type": "Column",
  "items": [
    {
      "type": "TextBlock",
      "text": "col-1"
    },
    {
      "type": "TextBlock",
      "text": "col-1"
    }
  ]
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `items` |  | `Required` | The card elements to include in the `Column`. |
| `selectAction` | object | `Optional` | An Action that will be invoked when the `Column` is tapped or selected. `Action.ShowCard` is not supported. |
| `style` | string | `Optional` | Style hint for `Column`. |
| `width` | string,number | `Optional` | `"auto"`, `"stretch"`, or a number representing relative width of the column in the column group. |
| `type` | string | `Optional` | Must be `"Column"`. |





<hr>

## The <a name="list-ColumnSet"></a>`ColumnSet` element

__ColumnSet divides a region into Columns, allowing elements to sit side-by-side.__

__Example JSON__

``` json
{
  "type": "ColumnSet",
  "columns": [
    {
      "type": "Column",
      "items": [
        {
          "type": "TextBlock",
          "text": "col-1"
        },
        {
          "type": "TextBlock",
          "text": "col-1"
        }
      ]
    },
    {
      "type": "Column",
      "items": [
        {
          "type": "TextBlock",
          "text": "col-2"
        }
      ]
    }
  ]
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `columns` | array | `Optional` | The array of `Columns` to divide the region into. |
| `selectAction` | object | `Optional` | An Action that will be invoked when the `ColumnSet` is tapped or selected. `Action.ShowCard` is not supported. |
| `type` | string | `Required` | Must be `"ColumnSet"`. |





<hr>

## The <a name="list-Container"></a>`Container` element

__Containers group items together.__

__Example JSON__

``` json
{
  "type": "Container",
  "color": "accent",
  "spacing": "large",
  "items": [
    {
      "type": "TextBlock",
      "text": "Accent!"
    }
  ]
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Container"`. |
| `color` | string | `Optional` | Controls the color of the Container. |
| `items` |  | `Required` | The card elements to render inside the `Container`. |
| `selectAction` | object | `Optional` | An Action that will be invoked when the `Container` is tapped or selected. `Action.ShowCard` is not supported. |
| `style` | string | `Optional` | Style hint for `Container`. |
| `verticalContentAlignment` | string | `Optional` | Defines how the content should be aligned vertically within the container. |





<hr>

## The <a name="list-ImageSet"></a>`ImageSet` element

__The ImageSet displays a collection of Images similar to a gallery.__

__Example JSON__

``` json
{
  "type": "ImageSet",
  "images": [
    {
      "type": "Image",
      "url": "https://tymly.io/wp-content/uploads/2017/11/logo-tymly-main-colour.png",
      "size": "medium"
    },
    {
      "type": "Image",
      "url": "https://tymly.io/wp-content/uploads/2017/11/logo-tymly-main-colour.png",
      "size": "medium"
    }
  ]
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `images` | array | `Required` | The array of `Image` elements to show. |
| `imageSize` |  | `Optional` |  |
| `type` | string | `Required` | Must be `"ImageSet"`. |





<hr>

## The <a name="list-Tab"></a>`Tab` element

__Defines a container that is part of a TabSet.__

__Example JSON__

``` json
{
  "type": "Tab",
  "title": "Tab 1",
  "items": [
    {
      "type": "TextBlock",
      "text": "Tab 1 Content"
    }
  ]
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Optional` | Must be `"Tab"`. |
| `items` |  | `Required` | The card elements to include in the `Tab`. |
| `title` | string | `Required` | The title of the `Tab`. |





<hr>

## The <a name="list-TabSet"></a>`TabSet` element

__TabSet allows to display content through various tabs.__

__Example JSON__

``` json
{
  "type": "TabSet",
  "spacing": "large",
  "tabs": [
    {
      "type": "Tab",
      "title": "Tab 1",
      "items": [
        {
          "type": "TextBlock",
          "text": "Tab 1 Content"
        }
      ]
    },
    {
      "type": "Tab",
      "title": "Tab 2",
      "items": [
        {
          "type": "TextBlock",
          "text": "Tab 2 Content"
        }
      ]
    }
  ]
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"TabSet"`. |
| `tabs` | array | `Optional` | The array of `Tabs` to divide content. |






<hr>

# <a name="InputList"></a>Inputs

Here is the full list of all 18 inputs supported in Cardscript (please see [Element summary](#element-summary) for a handy index).


<hr>

## The <a name="list-Input.Address"></a>`Input.Address` element

__Lets a user enter an address.__

__Example JSON__

``` json
{
  "id": "inputAddress",
  "type": "Input.Address"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `type` | string | `Required` | Must be `"Input.Address"`. |





<hr>

## The <a name="list-Input.ApiLookup"></a>`Input.ApiLookup` element

__Lets a user look up a value via an API.__

__Example JSON__

``` json
{
  "id": "inputApiLookup",
  "type": "Input.ApiLookup"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `type` | string | `Required` | Must be `"Input.ApiLookup"`. |





<hr>

## The <a name="list-Input.Choice"></a>`Input.Choice` element

__Describes a choice for use in a ChoiceSet.__

__Example JSON__

``` json
{
  "title": "Choice 1",
  "value": "CHOICE_1"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Optional` |  |
| `title` | string | `Required` | Text to display. |
| `value` | string | `Required` | The raw value for the choice. **NOTE:** do not use a `,` in the value, since a `ChoiceSet` with `isMultiSelect` set to `true` returns a comma-delimited string of choice values. |





<hr>

## The <a name="list-Input.ChoiceSet"></a>`Input.ChoiceSet` element

__Allows a user to input a Choice.__

__Example JSON__

``` json
{
  "type": "Input.ChoiceSet",
  "id": "choice",
  "spacing": "medium",
  "value": "CHOICE_1",
  "choices": [
    {
      "title": "Choice 1",
      "value": "CHOICE_1"
    },
    {
      "title": "Choice 2",
      "value": "CHOICE_2"
    },
    {
      "title": "Choice 3",
      "value": "CHOICE_3"
    }
  ],
  "style": "expanded"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `choices` | array | `Required` | `Choice` options. |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `isMultiSelect` | boolean | `Optional` | Allow multiple choices to be selected. |
| `style` |  | `Optional` |  |
| `type` | string | `Required` | Must be `"Input.ChoiceInput"`. |
| `value` | string | `Optional` | The initial choice (or set of choices) that should be selected. For multi-select, specify a comma-separated string of values. |





<hr>

## The <a name="list-Input.Currency"></a>`Input.Currency` element

__Lets a user enter a currency value.__

__Example JSON__

``` json
{
  "id": "currency",
  "type": "Input.Currency",
  "placeholder": "Input.Currency",
  "spacing": "medium"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `type` | string | `Required` | Must be `"Input.Currency"`. |
| `placeholder` | string | `Optional` | Description of the input desired. Displayed when no text has been input. |
| `max` | number | `Optional` | Hint of maximum value (may be ignored by some clients). |
| `min` | number | `Optional` | Hint of minimum value (may be ignored by some clients). |





<hr>

## The <a name="list-Input.Date"></a>`Input.Date` element

__Lets a user choose a date.__

__Example JSON__

``` json
{
  "id": "date",
  "type": "Input.Date",
  "placeholder": "Input.Date",
  "spacing": "medium"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `max` | string | `Optional` | Hint of maximum value expressed in ISO-8601 format (may be ignored by some clients). |
| `min` | string | `Optional` | Hint of minimum value expressed in ISO-8601 format (may be ignored by some clients). |
| `placeholder` | string | `Optional` | Description of the input desired. Displayed when no selection has been made. |
| `type` | string | `Required` | Must be `"Input.Date"`. |
| `value` | string | `Optional` | The initial value for this field expressed in ISO-8601 format. |





<hr>

## The <a name="list-Input.DateTime"></a>`Input.DateTime` element

__Lets a user enter a telephone number.__

__Example JSON__

``` json
{
  "id": "date",
  "type": "Input.DateTime",
  "placeholder": "Input.DateTime",
  "spacing": "medium"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `type` | string | `Required` | Must be `"Input.DateTime"`. |
| `placeholder` | string | `Optional` | Description of the input desired. Displayed when no text has been input. |





<hr>

## The <a name="list-Input.Email"></a>`Input.Email` element

__Lets a user enter an email.__

__Example JSON__

``` json
{
  "id": "email",
  "type": "Input.Email",
  "placeholder": "Input.Email",
  "spacing": "medium"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `type` | string | `Required` | Must be `"Input.Email"`. |
| `placeholder` | string | `Optional` | Description of the input desired. Displayed when no text has been input. |





<hr>

## The <a name="list-Input.FileUpload"></a>`Input.FileUpload` element

__Lets a user upload a file.__

__Example JSON__

``` json
{
  "type": "Input.FileUpload",
  "spacing": "medium"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `type` | string | `Required` | Must be `"Input.FileUpload"`. |





<hr>

## The <a name="list-Input.Gender"></a>`Input.Gender` element

__Lets a user enter a gender.__

__Example JSON__

``` json
{
  "id": "inputGender",
  "type": "Input.Gender",
  "preferNotToSay": true,
  "preferToSelfDescribe": true,
  "includeTransgender": true
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `type` | string | `Required` | Must be `"Input.Gender"`. |
| `term` | string | `Optional` | Whether the gender or sex should be asked. |
| `preferNotToSay` | boolean | `Optional` | Includes Prefer not to say gender in list. |
| `preferToSelfDescribe` | boolean | `Optional` | Includes Prefer not to self describe gender in list. |
| `includeTransgender` | boolean | `Optional` | Includes transgender in list. |





<hr>

## The <a name="list-Input.Name"></a>`Input.Name` element

__Lets a user enter a name.__

__Example JSON__

``` json
{
  "id": "name",
  "type": "Input.Name",
  "placeholder": "Input.Name",
  "spacing": "medium"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `type` | string | `Required` | Must be `"Input.Name"`. |





<hr>

## The <a name="list-Input.Number"></a>`Input.Number` element

__Allows a user to enter a number.__

__Example JSON__

``` json
{
  "id": "number",
  "type": "Input.Number",
  "placeholder": "Input.Number",
  "spacing": "medium"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `max` | number | `Optional` | Hint of maximum value (may be ignored by some clients). |
| `min` | number | `Optional` | Hint of minimum value (may be ignored by some clients). |
| `placeholder` | string | `Optional` | Description of the input desired. Displayed when no selection has been made. |
| `type` | string | `Required` | Must be `"Input.Number"`. |
| `value` | number | `Optional` | Initial value for this field. |





<hr>

## The <a name="list-Input.Signature"></a>`Input.Signature` element

__Lets a user enter a signature.__

__Example JSON__

``` json
{
  "id": "inputSignature",
  "type": "Input.Signature",
  "agreement": "I agree that...",
  "saveText": "Send",
  "guidance": "Please enter your signature below..."
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `type` | string | `Required` | Must be `"Input.Signature"`. |
| `agreement` | string | `Optional` | Agreement text to be displayed above the signature pad. |
| `saveText` | string | `Optional` | Customise the text of the save button. |
| `guidance` | string | `Optional` | Guidance text to be displayed with the signature button. |





<hr>

## The <a name="list-Input.Slider"></a>`Input.Slider` element

__Lets a user enter value with a slider.__

__Example JSON__

``` json
{
  "id": "slider",
  "type": "Input.Slider",
  "spacing": "medium",
  "min": -20,
  "max": 20,
  "step": 4,
  "value": 3
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `type` | string | `Required` | Must be `"Input.Slider"`. |
| `min` | number | `Optional` | Minimum value of the model. |
| `max` | number | `Optional` | Maximum value of the model. |
| `step` | number | `Optional` | Step amount between values. |
| `value` | string | `Optional` | The initial value for this field. |





<hr>

## The <a name="list-Input.TelephoneNumber"></a>`Input.TelephoneNumber` element

__Lets a user enter a telephone number.__

__Example JSON__

``` json
{
  "id": "inputTelephoneNumber",
  "type": "Input.TelephoneNumber",
  "placeholder": "Input.TelephoneNumber",
  "spacing": "medium"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `type` | string | `Required` | Must be `"Input.TelephoneNumber"`. |





<hr>

## The <a name="list-Input.Text"></a>`Input.Text` element

__Lets a user enter text.__

__Example JSON__

``` json
{
  "id": "textEditor",
  "type": "Input.Text",
  "placeholder": "Input.Text",
  "spacing": "medium",
  "editor": true,
  "value": "editor: true"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `isMultiline` | boolean | `Optional` | If `true`, allow multiple lines of input. |
| `maxLength` | number | `Optional` | Hint of maximum length characters to collect (may be ignored by some clients). |
| `placeholder` | string | `Optional` | Description of the input desired. Displayed when no text has been input. |
| `style` |  | `Optional` |  |
| `type` | string | `Required` | Must be `"Input.Text"`. |
| `value` | string | `Optional` | The initial value for this field. |
| `editor` | boolean | `Optional` | Whether the field should be a WYSIWYG (“what you see is what you get”) editor, if false then plain text field. |





<hr>

## The <a name="list-Input.Time"></a>`Input.Time` element

__Lets a user select a time.__

__Example JSON__

``` json
{
  "id": "time",
  "type": "Input.Time",
  "placeholder": "Input.Time",
  "spacing": "medium"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `max` | string | `Optional` | Hint of maximum value (may be ignored by some clients). |
| `min` | string | `Optional` | Hint of minimum value (may be ignored by some clients). |
| `placeholder` | string | `Optional` | Description of the input desired. Displayed when no time has been selected. |
| `type` | string | `Required` | Must be `"Input.Time"`. |
| `value` | string | `Optional` | The initial value for this field expressed in ISO-8601 format. |





<hr>

## The <a name="list-Input.Toggle"></a>`Input.Toggle` element

__Lets a user choose between two options.__

__Example JSON__

``` json
{
  "id": "toggle",
  "type": "Input.Toggle",
  "spacing": "medium",
  "title": "Input.Toggle"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | Unique identifier for the value. Used to identify collected input when the Submit action is performed. |
| `title` | string | `Required` | Title for the toggle |
| `type` | string | `Required` | Input.Toggle |
| `value` | string | `Optional` | The current selected value. If the item is selected that "valueOn" will be used, otherwise "valueOff" |
| `valueOff` | string | `Optional` | The value when toggle is off |
| `valueOn` | string | `Optional` | The value when toggle is on |






<hr>

# <a name="ElementList"></a>Other Elements

Here is the full list of all 15 other elements supported in Cardscript (please see [Element summary](#element-summary) for a handy index).


<hr>

## The <a name="list-AdaptiveCard"></a>`AdaptiveCard` element

__Root element in an Adaptive Card.__

__Example JSON__

``` json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
  "body": [
    {
      "type": "Container",
      "items": [
        {
          "type": "Jumbotron",
          "backgroundImage": "wmfs/happy-people.jpg",
          "title": "Register!",
          "subtitle": "Let's get to know each other a bit better...",
          "wash": "black"
        },
        {
          "type": "TextBlock",
          "text": "Name",
          "wrap": true,
          "separator": true
        },
        {
          "type": "Input.Text",
          "id": "name",
          "placeholder": "e.g. Lucy Smith"
        }
      ]
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Submit"
    }
  ]
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"AdaptiveCard"`. |
| `actions` |  | `Optional` | The Actions to show in the card's action bar. |
| `body` |  | `Optional` | The card elements to show in the primary card region. |
| `selectAction` | object | `Optional` | An Action that will be invoked when the card is tapped or selected. `Action.ShowCard` is not supported. |





<hr>

## The <a name="list-AddressBlock"></a>`AddressBlock` element

__Displays an address.__

__Example JSON__

``` json
{
  "type": "AddressBlock",
  "dataPath": "addressBlock"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"AddressBlock"`. |
| `title` | string | `Optional` | Title of the AddressBlock. |
| `dataPath` | string | `Required` | Points to the holding the address. |
| `multiline` | boolean | `Optional` | Wether the address in multiple lines. |
| `lineDelimited` | string | `Optional` | The string of character(s) which the address is delimited by. |





<hr>

## The <a name="list-CardList"></a>`CardList` element

__A container which opens a modal when clicked on to show a card.__

__Example JSON__

``` json
{
  "id": "cardList",
  "type": "CardList",
  "editable": true,
  "instanceTitleTemplate": "You thought: '{{item.opinion}}'.",
  "addButtonLabel": "Click me!",
  "card": {
    "type": "AdaptiveCard",
    "body": [
      {
        "type": "TextBlock",
        "text": "What do you think?"
      },
      {
        "id": "opinion",
        "type": "Input.Text",
        "spacing": "large",
        "value": "Amazing!"
      }
    ]
  }
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `id` | string | `Required` | A unique identifier associated with the element. |
| `type` | string | `Required` | Must be `"CardList"`. |
| `addButtonLabel` | string | `Optional` | Text to be displayed as label of button. |
| `card` |  | `Required` |  |
| `instanceTitleTemplate` | string | `Optional` | A handlebars-like template for conjuring a title per instance. |
| `instanceSubtitleTemplate` | string | `Optional` | A handlebars-like template for conjuring a subtitle per instance. |
| `editable` | boolean | `Optional` | The CardList element can either act as a modal to display a block of Card Elements or as a form which can be completed and pushed to an array. |





<hr>

## The <a name="list-Chip"></a>`Chip` element

__A chip to display some text.__

__Example JSON__

``` json
{
  "type": "Chip",
  "text": "Example",
  "color": "good"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Chip"`. |
| `text` | string | `Required` | Text to be displayed in chip. |
| `color` | string | `Optional` | Color of the chip |





<hr>

## The <a name="list-Fact"></a>`Fact` element

__Describes a Fact in a FactSet as a key/value pair.__

__Example JSON__

``` json
{
  "title": "Hello:",
  "value": "World"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Optional` |  |
| `title` | string | `Required` | The title of the fact. |
| `value` | string | `Required` | The value of the fact. |





<hr>

## The <a name="list-FactSet"></a>`FactSet` element

__The FactSet element displays a series of facts (i.e. name/value pairs) in a tabular form.__

__Example JSON__

``` json
{
  "type": "FactSet",
  "facts": [
    {
      "title": "Hello:",
      "value": "World"
    },
    {
      "title": "HELLO:",
      "value": "WORLD"
    }
  ]
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `facts` | array | `Required` | The array of `Fact`s. |
| `type` | string | `Required` | Must be `"FactSet"`. |





<hr>

## The <a name="list-Image"></a>`Image` element

__Displays an image.__

__Example JSON__

``` json
{
  "type": "Image",
  "url": "https://tymly.io/wp-content/uploads/2017/11/logo-tymly-main-colour.png",
  "size": "large",
  "horizontalAlignment": "left"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `altText` | string | `Optional` | Alternate text describing the image. |
| `horizontalAlignment` |  | `Optional` |  |
| `selectAction` | object | `Optional` | An Action that will be invoked when the `Image` is tapped or selected. `Action.ShowCard` is not supported. |
| `size` |  | `Optional` |  |
| `style` |  | `Optional` |  |
| `type` | string | `Required` | Must be `"Image"`. |
| `url` | string | `Required` | The URL to the image. |





<hr>

## The <a name="list-Jumbotron"></a>`Jumbotron` element

__An element typically placed at the top of a card to describe its purpose.__

__Example JSON__

``` json
{
  "type": "Jumbotron",
  "backgroundImage": "wmfs/pizza.jpg",
  "title": "Title",
  "subtitle": "Subtitle",
  "wash": "black"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Jumbotron"`. |
| `title` | string | `Required` | Text to be displayed as heading. |
| `subtitle` | string | `Optional` | Text to be displayed as subheading. |
| `wash` | string | `Optional` | Type of wash to have over the background. |
| `backgroundImage` | string | `Optional` | Relative URL to image to be displayed as background. |





<hr>

## The <a name="list-Map"></a>`Map` element

__Displays a map.__

__Example JSON__

``` json
{
  "type": "Map"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Map"`. |





<hr>

## The <a name="list-Media"></a>`Media` element

__Displays a media player for audio or video content.__

__Example JSON__

``` json
{
  "type": "Media",
  "poster": "https://adaptivecards.io/content/poster-video.png",
  "sources": [
    {
      "mimeType": "video/mp4",
      "url": "https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp4"
    }
  ]
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Media"`. |
| `sources` | array | `Optional` | Array of media sources to attempt to play. |
| `poster` | string | `Optional` | URL of an image to display before playing. |
| `altText` | string | `Optional` | Alternate text describing the audio or video. |





<hr>

## The <a name="list-MediaSource"></a>`MediaSource` element

__Defines a source for a Media element__

__Example JSON__

``` json
{
  "mimeType": "video/mp4",
  "url": "https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp4"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `mimeType` | string | `Required` | Mime type of associated media (e.g. `"video/mp4"`). |
| `url` | string | `Required` | URL to media. |





<hr>

## The <a name="list-PhaseBanner"></a>`PhaseBanner` element

__Displays a banner highlighting a phase.__

__Example JSON__

``` json
{
  "type": "PhaseBanner",
  "phase": "alpha"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"PhaseBanner"`. |
| `phase` | string | `Optional` | The phase which the service is in. |





<hr>

## The <a name="list-Separator"></a>`Separator` element

__Displays a horizontal line.__

__Example JSON__

``` json
{
  "type": "Separator"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Separator"`. |





<hr>

## The <a name="list-Table"></a>`Table` element

__Displays text, allowing control over font sizes, weight, and color.__

__Example JSON__

``` json
{
  "type": "Table",
  "title": "Opinions (Add some via CardList example above to see them appear in Table here)",
  "arrayPath": "cardList",
  "columns": [
    {
      "title": "Opinion",
      "field": "opinion"
    }
  ],
  "resultLimit": 5
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `type` | string | `Required` | Must be `"Table"`. |
| `title` | string | `Optional` | Title displayed for the `Table`. |
| `arrayPath` | string | `Required` | Points to the array of data to be displayed. |
| `columns` | array | `Required` |  |
| `resultLimit` | integer | `Optional` | Limit the results per page. |





<hr>

## The <a name="list-TextBlock"></a>`TextBlock` element

__Displays text, allowing control over font sizes, weight, and color.__

__Example JSON__

``` json
{
  "type": "TextBlock",
  "text": "color: good",
  "color": "good"
}

```



__Properties__

| Name | Type | Required | Description |
| ---- | -----| -------- | ----------- |
| `color` | string | `Optional` | Controls the color of `TextBlock` elements. |
| `horizontalAlignment` |  | `Optional` |  |
| `isSubtle` | boolean | `Optional` | If `true`, displays text slightly toned down to appear less prominent. |
| `maxLines` | number | `Optional` | Specifies the maximum number of lines to display. |
| `size` | string | `Optional` | Controls size of text. |
| `text` | string | `Required` | Text to display. |
| `type` | string | `Required` | Must be `"TextBlock"`. |
| `weight` | string | `Optional` | Controls the weight of `TextBlock` elements. |
| `wrap` | boolean | `Optional` | If `true`, allow text to wrap. Otherwise, text is clipped. |






<hr>



# <a name="license"></a>License (MIT)

The Cardscript specification and related tooling is provided under [__MIT__](https://github.com/wmfs/cardscript/blob/master/LICENSE).

<hr>

# <a name="appendices"></a>Appendices

## <a name="motivation"></a>Appendix A: Cardscript Motivation

__Cardscript is the product of a small in-house development team at [West Midlands Fire Service](http://www.wmfs.net).
Our work over the last 20 years has often involved collecting data from a variety of teams and environments.
During this time, our best experiences have come from taking a declarative approach to defining form content.__

* Originally we used XML to define the content of our forms (or _workbooks_ as they became known).
From there it was a relatively simple process to write a renderer to conjure appropriate UIs from those definitions.
Over the intervening years we have defined some 50 workbooks in XML to collect over 3 million documents and we've extended our [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) to support growing business need.

* We're now actively working on our third-generation view rendering engine.
While designing the accompanying backend, we've found great benefit in aligning to open standards (for example our workflow is now defined in [Amazon State Language](https://states-language.net/spec.html)).

* Given our positive experiences of declarative techniques and open standards, it was a natural evolution for our new declarative-UI engine to incorporate an open standard.
We therefore prototyped using a few projects (for example [Schema Form](https://json-schema-form.github.io/angular-schema-form/)) and shipped our [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) using [Mozilla React Schema Form](https://mozilla-services.github.io/react-jsonschema-form).

__They're great libraries and helped us get up-and-running quickly.__

In hindsight, both these specifications are restricted by being bound to an underlying UI technology (i.e. Angular and React respectively).
Both projects mandate a traditional web-form interface too. What if we're only working in a CLI context, or want to try some voice-interface technology? And what if we wanted to define dashboards and similar read-only content?

* React Schema Form and Schema.io work well for reasonably trivial UI content, but start adding requirements for expression-based conditionality/validation, different layout structures, differing online/offline behaviours etc. and we were soon "working against" both approaches - even to deliver quite basic experiences.

To compound matters, the underlying use of [JSON Schema](http://json-schema.org/) involves a lot of duplication and arbitrary splitting between model and UI definitions: which soon builds friction when describing larger UIs.
In turn, we found this complexity bleeds into tooling and the wider architecture.

__So with a shopping-list in-hand:__

1. Must be an open standard and encourage contributions
2. Must be easily extended to include new capabilities
3. Must not be tied to any particular frontend technology or project
4. Must not be tied to a particular UI pattern
5. Must use a standard expression language (strong preference towards Javascript)
6. Must support complex validation expressions
7. Must support dynamic show/hide expressions (with optimisation for large chunks of the view)
8. Must support online/offline behaviours
9. Must have a schema to validate declarations and support tooling
10. Must have an open SDK or similar to assist implementation
11. Must be well documented
12. Must have minimum of friction for embedding in a variety of app styles
12. Strong preference towards JSON-based languages

__...we went looking for an open standard capable of replacing our existing library of XML-defined views (some of which are pretty hefty in terms of number of components and logic).__

__Spoiler:__ We couldn't find one. Which was disappointing (and unexpected), because the experience of adopting [Amazon State Language](https://states-language.net/spec.html) had been great.
We were edging closer to defining our own, but at the same time very mindful of this sort of thing:

![How standards proliferate Licensed under CC BY-NC 2.5 by xkcd.com](https://imgs.xkcd.com/comics/standards.png)

* A particularity bad smell came about when we developed a simple intermediary format (to ease tooling complexity and authoring processes) which we could translate back into React Schema Form definitions.
It was becoming evident we didn't have a good fit for what we wanted to do, and that using a badly-fitting standard is actually worse than not using a standard at all.

* The XML used in our outgoing generation had some problems: requiring it's own expression-language was a particular mis-step and XML feels ancient if used directly on the client app (especially in [Single Page Applications](https://en.wikipedia.org/wiki/Single-page_application) and [Progressive Web Apps](https://en.wikipedia.org/wiki/Progressive_Web_Apps) contexts).

### So... __Cardscript__!

* __It does all the things _we_ need, and we think it might be useful to other organisations if it became a standard.__

## <a name="utilities"></a>Appendix B: Cardscript Utilities

__Here are some [Node.js](https://nodejs.org/en/)-based utilities to help working with Cardscript:__


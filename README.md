![Card texture by Brandi Redd on Unsplash.com](/readme-assets/card-texture.jpg)

# Cardscript

**A JSON-based language for describing rich user interfaces.**

## Playpen

If you're interested in getting hands-on with Cardscript, be sure to try out the **[Cardscript playpen](https://wmfs.github.io/cardscript/)**! :video_game:

[![Screenshot of the Cardscript Playpen](/readme-assets/playpen.png)](https://wmfs.github.io/cardscript/)


## Features

* Describe the content you need using a rich vocabulary of [elements](https://wmfs.github.io/tymly-website/reference/#elements).
* Cardscript's simple and intuitive [JSON](https://www.w3schools.com/js/js_json_intro.asp)-based language plays nicely with drag-and-drop tooling and [Low Code](https://en.wikipedia.org/wiki/Low-code_development_platform) aspirations.
* Cardscript extends the open [Adaptive Cards](https://adaptivecards.io) specification by Microsoft. Cards usable in [Teams](https://products.office.com/en-US/microsoft-teams/group-chat-software), [Skype](https://www.skype.com/en/), [Outlook](https://docs.microsoft.com/en-us/outlook/actionable-messages/) etc. can be rendered in Cardscript-powered apps.
* Importantly, Cardscript can be used independently of any frontend technology or vendor (including Microsoft).
* Mark content for dynamic visibility using intuitive JavaScript expressions.
* Define complex validation rules.
* Support for nested user interfaces.
* Deep integration with host apps via a set of extensible [actions](https://wmfs.github.io/tymly-website/reference/#actions).
* A set of open source JavaScript utilities are available:
  * Cardscript Schema [validation](https://github.com/wmfs/cardscript-schema) (via a [JSON Schema](https://github.com/wmfs/cardscript-schema/blob/master/lib/schema.json)) and [parsing](https://github.com/wmfs/cardscript-parser).
  * [Table-of-Contents](https://github.com/wmfs/cardscript-table-of-contents) generation.
  * [List](https://github.com/wmfs/cardscript-extract-lists) and [default-value](https://github.com/wmfs/cardscript-extract-defaults) extrication.
* Are you using [JSON Schema](https://json-schema.org/understanding-json-schema/index.html) to define the shape of your data? We've a [utility](https://github.com/wmfs/json-schema-to-cardscript) that can scaffold Cardscript straight from a data schema.
* Maybe you're using [Vue.js](https://vuejs.org/) to build your apps? We've [another tool](https://github.com/wmfs/cardscript-to-quasar) to take Cardscript JSON and output a Vue/[Quasar](https://quasar-framework.org/) template. This package powers the [online playpen](https://wmfs.github.io/cardscript/).

## Documentation

Please visit the **[Cardscript Reference](https://wmfs.github.io/tymly-website/reference/#cardscript)** for full details of Cardscript [containers](https://wmfs.github.io/tymly-website/reference/#containers), [elements](https://wmfs.github.io/tymly-website/reference/#elements), [inputs](https://wmfs.github.io/tymly-website/reference/#inputs) and [actions](https://wmfs.github.io/tymly-website/reference/#actions).

## License

[__MIT__](https://github.com/wmfs/cardscript/blob/master/LICENSE)

------------

*Built with* :heart: *at [West Midlands Fire Service](https://www.wmfs.net/)*

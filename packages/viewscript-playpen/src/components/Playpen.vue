<template>
  <v-app>
    <v-content>
      <v-jumbotron color="grey lighten-2" height="300px">
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <div class="display-3 grey--text text--darken-1">Viewscript playpen</div>
              <p>Use the editor below to write some of your own Viewscript JSON/YAML, then click then
                <strong>Go!</strong>" button to turn it into a UI.
                Take a look at the <a href="https://github.com/wmfs/viewscript">Viewscript documentation</a> for more
                information!
              </p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
      <v-container grid-list-xl>
        <v-layout row wrap>
          <v-flex xs8 offset-xs1>
            <v-select
              class="mb-3"
              :items="items"
              v-model="currentExample"
              hint="To get going quickly, try some of these examples!"
              single-line
              persistent-hint
              v-on:input="setExampleContent()"
            ></v-select>
          </v-flex>

          <v-flex xs2>
            <v-btn v-if="!showSpinner" block color="primary" dark v-on:click="renderViewscript()">Go!</v-btn>
            <v-progress-circular v-if="showSpinner" indeterminate color="primary"></v-progress-circular>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs10 offset-xs1>
            <codemirror id="editor" v-model="viewscript"></codemirror>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>

            <div id="thereWereErrors" v-if="validation.state === 'invalid'">
              <div id="errors" class="display-3 grey--text text--darken-1">Errors!</div>

              <v-alert type="error" v-for="err in validation.errors" :value="true" :key="err.property">
                {{err.property}} {{err.message}}
              </v-alert>

              <!--<v-alert v-for="error in validation.errors">{{error.message}}</v-alert>-->
              <!--{{validation.errors}}-->
            </div>

            <div v-if="validation.state === 'valid'">
              <div id="success" class="display-3 grey--text text--darken-1">Success!</div>
              <br>
              <blockquote class="blockquote">The supplied Viewscript has passed the validation checks in the <a
                href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-schema">viewscript-schema</a>
                package!
              </blockquote>
              <br>

              <v-tabs v-model="active" color="green" dark slider-color="yellow" fixed-tabs>

                <v-tab key="view">View</v-tab>
                <v-tab key="model">Model</v-tab>
                <v-tab key="template">Template</v-tab>
                <v-tab key="info">Info</v-tab>

                <v-tab-item key="view">
                  <v-card flat>
                    <blockquote class="blockquote">
                      This is a simple rendering of the parsed Viewscript. Note that this is only meant to be a basic
                      illustration of typical web usage, your app is free to interpret Viewscript and conjure a UI in
                      any way
                      you see fit!
                    </blockquote>

                    <div v-if="dynamicContent.toc.length > 0">
                      <hr>
                      <div class="display-1 grey--text text--darken-1 mt-4">Table of contents</div>

                      <v-list-tile avatar v-for="entry in dynamicContent.toc" :key="entry.widgetId"
                                   @click="tocClick(entry.widgetId)">
                        <v-list-tile-avatar>
                          <v-icon>{{ entry.tocIcon }}</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ entry.tocTitle }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <p>As derived using the <a
                        href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-table-of-contents">viewscript-table-of-contents</a>
                        package.</p>
                      <hr class="my-2">
                    </div>

                    <div class="card">
                      <v-container grid-list-xl>
                        <v-layout row wrap>
                          <v-flex xs10 offset-xs1>
                            <div class="card-body">
                              <viewscript v-bind:content="dynamicContent"></viewscript>
                            </div>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </div>
                  </v-card>
                </v-tab-item>

                <v-tab-item key="model">
                  <v-card flat>
                    <blockquote class="blockquote">
                      This is the underlying data model for the view (default values were inferred from the Fromscript
                      using the
                      <a href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-extract-defaults">viewscript-extract-defaults</a>
                      package).
                      Be sure to check back here as you change input fields to see the model change!
                    </blockquote>
                    <hr>
                    <div class="display-1 grey--text text--darken-1 my-4">Data</div>

                    <pre class="horizontalScroll">{{dynamicContent.data}}</pre>
                    <br>
                  </v-card>
                </v-tab-item>

                <v-tab-item key="template">
                  <v-card flat>
                    <blockquote class="blockquote">
                      The content below has been produced using the <a
                      href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-to-vuetify">viewscript-to-vuetify</a>
                      and
                      <a href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-extract-lists">viewscript-extract-lists</a>
                      packages. Here we've configured things to output in a Vue.js style, but Angular and React
                      templates
                      can
                      be generated too!
                    </blockquote>
                    <hr>
                    <div class="display-1 grey--text text--darken-1 my-4">Template</div>
                    <pre class="horizontalScroll">{{dynamicContent.template}}</pre>

                    <div class="display-1 grey--text text--darken-1 my-4">Lists</div>
                    <pre class="horizontalScroll">{{dynamicContent.lists}}</pre>

                  </v-card>
                </v-tab-item>

                <v-tab-item key="info">
                  <v-card flat>

                    <div class="display-1 grey--text text--darken-1 my-4">Performance</div>

                    <p>This playpen is working with raw Viewscript (parsing, validating and transforming).
                      Most apps wouldn't need to do that kind of heavy lifting in the client.
                      As such, the rendering times inside the playpen are higher than usual... this is where all the
                      time just went:
                    </p>
                    <table class="table">
                      <thead>
                      <tr>
                        <th scope="col" align="left">Step</th>
                        <th scope="col" align="left">Time (ms)</th>
                        <th scope="col" align="left">%</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="time in dynamicContent.times" :key="time.label">
                        <td><span><v-icon medium>timer</v-icon> {{time.label}}</span></td>
                        <td>{{time.duration}}</td>
                        <td>{{time.percentage}}</td>
                      </tr>
                      </tbody>
                    </table>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Viewscript from 'viewscript-simple-vue'

const examples = require('viewscript-examples')
const parser = require('viewscript-parser')
const validator = require('viewscript-schema').validateForm
const templateConverter = require('viewscript-to-vuetify')
const extractDefaults = require('viewscript-extract-defaults')
const extractToc = require('viewscript-table-of-contents')
const extractLists = require('viewscript-extract-lists')

class Stopwatch {
  constructor () {
    this.times = [
      {
        label: 'init',
        milliseconds: Date.now()
      }
    ]
  }

  addTime (label) {
    const previousTime = this.times[this.times.length - 1]
    const n = Date.now()
    previousTime.duration = n - previousTime.milliseconds
    this.times.push(
      {
        label: label,
        milliseconds: n
      }
    )
  }

  getResults () {
    const trimmed = this.times.slice(1, -1)
    let total = 0
    trimmed.forEach(
      function (time) {
        total += time.duration
      }
    )
    trimmed.forEach(
      function (time) {
        time.percentage = ((time.duration / total) * 100).toFixed(1)
      }
    )
    return trimmed
  }
}

function processViewscript (viewscriptString, stopwatch) {
  return new Promise((resolve) => {
    const result = {}
    stopwatch.addTime('Parse string into object')
    const parserResult = parser(viewscriptString)
    if (parserResult.parsed) {
      const viewscript = parserResult.parsed
      stopwatch.addTime('Validate object')
      result.validatorOutput = validator(viewscript)
      if (result.validatorOutput.widgetsValid) {
        stopwatch.addTime('Extract default values')
        result.defaultValues = extractDefaults(viewscript)
        stopwatch.addTime('Extract TOC')
        result.toc = extractToc(viewscript)
        stopwatch.addTime('Extract lists')
        result.lists = extractLists(viewscript)
        stopwatch.addTime('Generate template')
        result.templateOutput = templateConverter(viewscript)
      }
    } else {
      result.validatorOutput = {
        widgetsValid: false,
        errors: parserResult.errors
      }
    }
    resolve(result)
  })
}

export default {
  name: 'Playpen',
  components: {
    Viewscript
  },
  methods: {
    tocClick: function (elementIdToScrollTo) {
      const e = document.getElementById(elementIdToScrollTo)
      e.scrollIntoView()
    },
    setExampleContent: function () {
      this.$set(this.validation, 'state', 'notValidated')
      this.$set(this.validation, 'errors', [])
      this.$set(this.dynamicContent, 'template', '')
      this.$set(this, 'viewscript', JSON.stringify(examples[this.currentExample], null, 2))
    },

    renderViewscript: function renderViewscript () {
      const comp = this
      this.$set(comp, 'showSpinner', true)
      setTimeout(
        function () {
          // comp.$forceUpdate()
          comp.$set(comp.validation, 'state', 'notValidated')
          comp.$nextTick(
            function () {
              const stopwatch = new Stopwatch()
              processViewscript(comp.viewscript, stopwatch).then(
                (output) => {
                  let elementIdToScrollTo
                  if (output.validatorOutput.widgetsValid) {
                    comp.$set(comp.validation, 'state', 'valid')
                    comp.$set(comp.validation, 'errors', [])
                    comp.$set(comp.dynamicContent, 'template', output.templateOutput.template)
                    comp.$set(comp.dynamicContent, 'data', output.defaultValues.rootView)
                    comp.$set(comp.dynamicContent, 'subViewDefaults', output.defaultValues.subViews)
                    comp.$set(comp.dynamicContent, 'lists', output.lists)
                    comp.$set(comp.dynamicContent, 'times', [])
                    comp.$set(comp.dynamicContent, 'toc', output.toc)
                    elementIdToScrollTo = 'success'
                  } else {
                    comp.$set(comp.validation, 'state', 'invalid')
                    comp.$set(comp.validation, 'errors', output.validatorOutput.errors)
                    comp.$set(comp.dynamicContent, 'template', '')
                    comp.$set(comp.dynamicContent, 'data', {})
                    comp.$set(comp.dynamicContent, 'lists', {})
                    comp.$set(comp.dynamicContent, 'toc', [])
                    elementIdToScrollTo = 'thereWereErrors'
                  }
                  stopwatch.addTime('Render')
                  comp.$nextTick(
                    function () {
                      comp.$set(comp, 'showSpinner', false)
                      const e = document.getElementById(elementIdToScrollTo)
                      e.scrollIntoView()
                      stopwatch.addTime('finished')
                      comp.$set(comp.dynamicContent, 'times', stopwatch.getResults())
                    }
                  )
                }
              )
            }
          )
        },
        20
      )
    }
  },
  data () {
    const defaultViewscript = JSON.stringify(examples.complex, null, 2)
    return {
      active: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      currentExample: 'complex',
      items: [
        {value: 'simple', text: 'Simple example'},
        {value: 'expression', text: 'Expression example'},
        {value: 'subView', text: 'Sub-View example'},
        {value: 'complex', text: 'Complex example'},
        {value: 'kitchenSink', text: 'Kitchen sink example'}
      ],

      showSpinner: false,
      example: defaultViewscript,
      viewscript: defaultViewscript,
      validation: {
        state: 'notValidated',
        errors: []
      },
      dynamicContent: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .horizontalScroll {
    overflow-x: scroll;
    display: block;
  }

</style>

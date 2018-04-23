<template>
  <div class="container">
    <div class="jumbotron">
      <h3 class="display-3">Viewscript Playpen</h3>
      <p class="lead">Use the editor below to write some Viewscript JSON or YAML, then click the
        "<strong>Go!</strong>" button to try it out. Take a look at the <a
          href="https://github.com/wmfs/viewscript">Viewscript documentation</a> for more information!</p>
    </div>

    <div id="app">
      <codemirror id="editor" v-model="viewscript"></codemirror>
      <br>

      <button type="button" class="btn btn-primary btn-lg" v-on:click="renderViewscript()">Go!</button>

      <img v-if="showSpinner" src="../assets/spinner.gif"/>

      <div class="dropup float-right">

        <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Examples
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" style="cursor:pointer" v-on:click.stop="setExampleContent('simple')">Simple example</a>
          <a class="dropdown-item" style="cursor:pointer" v-on:click.stop="setExampleContent('expression')">Expression example</a>
          <a class="dropdown-item" style="cursor:pointer" v-on:click.stop="setExampleContent('complex')">Complex example</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="cursor:pointer" v-on:click.stop="setExampleContent('blank')">Blank</a>
        </div>
      </div>
      <br>
      <br>

      <div id="thereWereErrors" v-if=" validation.state=== 'invalid'">
        <h3 class="display-4" >There were errors...</h3>
        <div class="alert alert-danger" role="alert" v-for="error in validation.errors">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span class="sr-only">Error:</span>
          {{error.property}}: {{error.message}}
        </div>
      </div>

      <!--<div v-if="showSpinner">-->
        <!--<img src="../assets/spinner.gif"/>-->
      <!--</div>-->

      <div v-if="validation.state === 'valid'">
        <hr>
        <h3 class="display-4" id="success">Success!</h3>
        <br>
        <p class="lead">The supplied Viewscript has passed the validation checks in the <a
          href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-schema">viewscript-schema</a>
          package!</p>
        <br>

        <vue-tabs>
          <v-tab title="View">
            <br>
            <div class="alert alert-secondary" role="alert">
              This is a simple rendering of the parsed Viewscript. Note that this is only meant to be a basic
              illustration of typical web usage, your app is free to interpret Viewscript and conjure a UI in any way
              you see fit!
            </div>
            <br>

            <div class="card">
              <div class="card-body">
                <viewscript v-bind:content="dynamicContent"></viewscript>
              </div>
            </div>
          </v-tab>
          <v-tab title="TOC">
            <br>
            <div class="alert alert-secondary" role="alert">
              This is a Table of Contents derived from the Viewscript via the <a class="alert-link" href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-table-of-contents">viewscript-table-of-contents</a> package.
            </div>
            <div class="card">
              <div class="card-body">
                WIP!
              </div>
            </div>
          </v-tab>
          <v-tab title="Model">
            <br>
            <div class="alert alert-secondary" role="alert">
              This is the underlying data model for the view (default values were inferred from the Fromscript using the
              <a class="alert-link" href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-extract-defaults">viewscript-extract-defaults</a>
            package).
              Be sure to check back here as you change input fields to see the model change!
            </div>
            <pre><code class="template">{{dynamicContent.data}}</code></pre>
            <br>
          </v-tab>
          <v-tab title="Template">
            <br>
            <div class="alert alert-secondary" role="alert">
              This is output of running the above Viewscript through the <a class="alert-link"
                                                                            href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-to-template">viewscript-to-template</a>
              package. Here we've configured things to output in a Vue.js style, but Angular and React templates can
              be
              generated too!
            </div>
            <pre><code class="template">{{dynamicContent.template}}</code></pre>
          </v-tab>
          <v-tab title="Info">
            <br>
            <h4>Performance</h4>
              <p>This playpen is working with raw Viewscript (parsing, validating and transforming).
                Most apps wouldn't need to do that kind of heavy lifting in the client.
                As such, the rendering times inside the playpen are higher than usual... this is where all the time just went:
              </p>
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Step</th>
                <th scope="col">Time (ms)</th>
                <th scope="col">%</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="time in dynamicContent.times">
                <td>{{time.label}}</td>
                <td>{{time.duration}}</td>
                <td>{{time.percentage}}</td>
              </tr>
              </tbody>
            </table>
          </v-tab>
        </vue-tabs>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
  import Viewscript from 'viewscript-simple-vue'

  const examples = require('viewscript-examples')
  const parser = require('viewscript-parser')
  const validator = require('viewscript-schema').validateForm
  const templateConverter = require('viewscript-to-template').convert
  const extractDefaults = require('viewscript-extract-defaults')

  class Stopwatch {
    constructor() {
      this.times = [
        {
          label: "init",
          milliseconds: Date.now()
        }
      ]
    }

    addTime (label) {
      const previousTime = this.times[this.times.length-1]
      const n = Date.now()
      previousTime.duration = n - previousTime.milliseconds
      this.times.push(
        {
          label: label,
          milliseconds: n
        }
      )
    }

    getResults() {
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

  function processViewscript(viewscriptString, stopwatch) {
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

      setExampleContent: function (id) {
        this.$set(this.validation, 'state', 'notValidated')
        this.$set(this.validation, 'errors', [])
        this.$set(this.dynamicContent, 'template', '')
        this.$set(this, 'viewscript', JSON.stringify(examples[id], null, 2))
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
                      comp.$set(comp.dynamicContent, 'data', output.defaultValues)
                      comp.$set(comp.dynamicContent, 'times', [])
                      elementIdToScrollTo = 'success'
                    } else {
                      comp.$set(comp.validation, 'state', 'invalid')
                      comp.$set(comp.validation, 'errors', output.validatorOutput.errors)
                      comp.$set(comp.dynamicContent, 'template', '')
                      comp.$set(comp.dynamicContent, 'data', {})
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
      const defaultViewscript = JSON.stringify(examples.simple, null, 2)
      return {
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

  .footer {
    height: 300px;
  }

  .template {
    white-space: pre;
    overflow-x: auto;
    display: inline-block;
    min-width: 100%;
  }
</style>

<template>
  <q-page>
    <q-jumbotron>
      <div class="q-display-3">Viewscript Quasar Playpen</div>
      <div class="q-subheading">
        Use the editor below to write some of your own Viewscript JSON/YAML, then click "<strong>Go!</strong>" to turn
        it into a UI.
        Take a look at the <a href="https://github.com/wmfs/viewscript">Viewscript documentation</a> for more
        information!
      </div>
    </q-jumbotron>
    <div class="q-mx-xl q-my-md">
      <q-select
        float-label="Try an example"
        v-model="exampleSlct"
        :options="exampleOpts"
        @input="setExampleContent"
      />
      <q-input
        float-label="Enter some JSON or choose from an example."
        type="textarea"
        v-model="viewscript"
        :max-height="100"
        rows="7"
      />
      <div class="q-my-md" style="text-align: right;">
        <q-btn
          label="Go"
          color="primary"
          @click="renderViewscript"
        />
      </div>
      <div v-if="validation.state === 'invalid'">
        <q-alert
          v-for="(err, idx) in validation.errors"
          :key="idx"
          type="negative"
        >
          {{err}}
        </q-alert>
      </div>

      <div v-if="validation.state === 'valid'">
        <q-tabs no-pane-border>
          <q-tab default slot="title" name="view-tab" label="view" icon="dashboard"></q-tab>
          <q-tab slot="title" name="model-tab" label="model" icon="list"></q-tab>
          <q-tab slot="title" name="template-tab" label="template" icon="code"></q-tab>
          <q-tab slot="title" name="info-tab" label="info" icon="help_outline"></q-tab>
          <q-tab-pane name="view-tab">
            <blockquote>
              This is a simple rendering of the parsed Viewscript. Note that this is only meant to be a basic
              illustration of typical web usage, your app is free to interpret Viewscript and conjure a UI in
              any way
              you see fit!
            </blockquote>

            <q-list
              v-if="dynamicContent.toc.length > 0"
              highlight
              class="q-my-md"
            >
              <q-item
                v-for="entry in dynamicContent.toc"
                :key="entry.widgetId"
                @click.native="tocClick(entry.widgetId)"
                class="cursor-pointer"
              >
                <q-item-side left :icon="entry.tocIcon"/>
                <q-item-main>{{entry.tocTitle}}</q-item-main>
              </q-item>
            </q-list>

            <div class="q-my-md q-px-md">
              <viewscript :content="dynamicContent"/>
            </div>
          </q-tab-pane>
          <q-tab-pane name="model-tab">
            <blockquote>
              This is the underlying data model for the view (default values were inferred from the Viewscript
              using the
              <a href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-extract-defaults">viewscript-extract-defaults</a>
              package).
              Be sure to check back here as you change input fields to see the model change!
            </blockquote>

            <div class="horizontalScroll q-my-md">
              <pre>{{dynamicContent.data}}</pre>
            </div>
          </q-tab-pane>
          <q-tab-pane name="template-tab">
            <blockquote>
              The content below has been produced using the <a
              href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-to-vuetify">viewscript-to-vuetify</a>
              and
              <a href="https://github.com/wmfs/viewscript/tree/master/packages/viewscript-extract-lists">viewscript-extract-lists</a>
              packages. Here we've configured things to output in a Vue.js style, but Angular and React
              templates
              can
              be generated too!
            </blockquote>

            <div class="q-display-1 q-my-md">Quasar Template</div>
            <div class="horizontalScroll q-my-md">
              <pre>{{dynamicContent.quasarTemplate}}</pre>
            </div>

            <div class="q-display-1 q-my-md">Lists</div>
            <div class="horizontalScroll q-my-md">
              <pre>{{dynamicContent.lists}}</pre>
            </div>
          </q-tab-pane>
          <q-tab-pane name="info-tab">
            <div class="q-display-1 q-my-md">Performance</div>
            <p>
              This playpen is working with raw Viewscript (parsing, validating and transforming).
              Most apps wouldn't need to do that kind of heavy lifting in the client.
              As such, the rendering times inside the playpen are higher than usual... this is where all the
              time just went:
            </p>
            <q-list highlight>
              <q-item
                v-for="(time, idx) in dynamicContent.times"
                :key="idx"
              >
                <q-item-main :label="time.label"/>
                <q-item-side right>
                  <q-item-tile>{{time.duration}}ms</q-item-tile>
                  <q-item-tile>{{time.percentage}}%</q-item-tile>
                </q-item-side>
              </q-item>
            </q-list>

            <div class="q-display-1 q-my-md">Internals</div>
            <p>
              Here are some of the internal workings (for managing dialog states and sub-views especially)
            </p>
            <pre>{{dynamicContent.internals}}</pre>
          </q-tab-pane>
        </q-tabs>
      </div>
    </div>
  </q-page>
</template>

<style>
  .horizontalScroll {
    overflow-x: scroll;
    display: block;
    width: 100%;
    height: 600px;
    border: 1px solid #e0e0e0;
  }
</style>

<script>
  import Viewscript from './../components/Viewscript'

  const quasarConverter = require('viewscript-to-quasar')
  const extractDefaults = require('viewscript-extract-defaults')
  const extractToc = require('viewscript-table-of-contents')
  const extractLists = require('viewscript-extract-lists')
  const sdk = require('viewscript-vue-sdk')
  // const examples = require('viewscript-examples')
  // const parser = require('viewscript-parser')
  // const validator = require('viewscript-schema').validateForm

  export default {
    name: 'PageIndex',
    components: {Viewscript},
    data: function () {
      return {
        dynamicContent: getEmptyDynamicContent(),
        validation: {
          state: 'notValidated',
          errors: []
        },
        viewscript: '{}',
        exampleSlct: null,
        exampleOpts: [
          {label: 'Simple example', value: 'simple'},
          {label: 'Expression example', value: 'expression'},
          {label: 'Sub-view example', value: 'subView'},
          {label: 'Complex example', value: 'complex'},
          {label: 'Kitchen sink example', value: 'kitchenSink'}
        ]
      }
    },
    methods: {
      tocClick (elementIdToScrollTo) {
        const e = document.getElementById(elementIdToScrollTo)
        e.scrollIntoView()
      },
      setExampleContent () {
        console.log('set example as:', this.exampleSlct)
        this.validation.state = 'notValidated'
        this.validation.errors = []
        this.dynamicContent = getEmptyDynamicContent()
        // this.viewscript = JSON.stringify(examples[this.exampleSlct], null, 2)
      },
      renderViewscript () {
        this.$q.loading.show()
        this.validation.state = 'notValidated'
        this.validation.errors = []

        try {
          if (this.viewscript.trim().length === 0) {
            throw new Error('You must enter some data.')
          }

          const parsed = JSON.parse(this.viewscript)

          if (Object.keys(parsed).length === 0) {
            throw new Error('Cannot convert an empty object.')
          }

          const stopwatch = new Stopwatch()
          const output = processViewscript(parsed, stopwatch)

          this.dynamicContent.quasarTemplate = output.quasarOutput.template
          this.dynamicContent.data = output.defaultValues.rootView
          this.dynamicContent.internals = output.defaultInternals
          this.dynamicContent.lists = output.lists
          this.dynamicContent.toc = output.toc

          this.validation.state = 'valid'
          this.validation.errors = []
          stopwatch.addTime('Finished')
          this.dynamicContent.times = stopwatch.getResults()
        } catch (e) {
          this.dynamicContent = getEmptyDynamicContent()
          this.validation.state = 'invalid'
          this.validation.errors.push(e.message)
        }
        this.$q.loading.hide()
      }
    }
  }

  function getEmptyDynamicContent () {
    return {
      quasarTemplate: '',
      data: {},
      internals: {},
      lists: {},
      toc: [],
      times: {}
    }
  }

  function processViewscript (viewscript, stopwatch) {
    const result = {}
    // const parserResult = parser(viewscriptString)
    // if (parserResult.parsed) {
    // const viewscript = parserResult.parsed
    // result.validatorOutput = validator(viewscript)
    // if (result.validatorOutput.widgetsValid) {
    stopwatch.addTime('Extract default values')
    result.defaultValues = extractDefaults(viewscript)
    stopwatch.addTime('Extract TOC')
    result.toc = extractToc(viewscript)
    stopwatch.addTime('Extract lists')
    result.lists = extractLists(viewscript)
    stopwatch.addTime('Calculate starting internals')
    result.defaultInternals = sdk.getDefaultInternals(viewscript)
    result.defaultInternals.subViewDefaults = result.defaultValues.subViews
    stopwatch.addTime('Generate template')
    result.quasarOutput = quasarConverter(viewscript)
    // }

    // } else { ... }
    return result
  }

  class Stopwatch {
    constructor () {
      this.times = [{
        label: 'init',
        milliseconds: Date.now()
      }]
    }

    addTime (label) {
      const previousTime = this.times[this.times.length - 1]
      const n = Date.now()
      previousTime.duration = n - previousTime.milliseconds
      this.times.push({
        label: label,
        milliseconds: n
      })
    }

    getResults () {
      const trimmed = this.times.slice(1, -1)
      let total = 0
      trimmed.forEach(time => { total += time.duration })
      trimmed.forEach(time => { time.percentage = ((time.duration / total) * 100).toFixed(1) })
      return trimmed
    }
  }
</script>

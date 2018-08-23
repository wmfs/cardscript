<template>
  <q-page>
    <q-jumbotron>
      <div class="q-display-3">Viewscript Quasar Playpen</div>
      <div class="q-subheading">
        Use the editor below to write some of your own Viewscript JSON/YAML, then click "<strong>Go!</strong>" to turn it into a UI.
        Take a look at the <a href="https://github.com/wmfs/viewscript">Viewscript documentation</a> for more information!
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
        float-label="The JSON would go here, not necessarily this widget..."
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
          <q-tab default slot="title" name="view-tab" label="view"></q-tab>
          <q-tab slot="title" name="model-tab" label="model"></q-tab>
          <q-tab slot="title" name="template-tab" label="template"></q-tab>
          <q-tab-pane name="view-tab">
            <q-list
              v-if="dynamicContent.toc.length > 0"
              highlight
            >
              <q-item
                v-for="entry in dynamicContent.toc"
                :key="entry.widgetId"
                @click.native="tocClick(entry.widgetId)"
                class="cursor-pointer"
              >
                <q-item-side left :icon="entry.tocIcon" />
                <q-item-main>{{entry.tocTitle}}</q-item-main>
              </q-item>
            </q-list>

            <div class="q-my-md q-px-md">
              <viewscript :content="dynamicContent" />
            </div>
          </q-tab-pane>
          <q-tab-pane name="model-tab">
            <pre>{{dynamicContent.data}}</pre>
          </q-tab-pane>
          <q-tab-pane name="template-tab">
            <q-scroll-area style="width: 100%; height: 600px; border: 1px solid #e0e0e0;">
              <pre>{{dynamicContent.quasarTemplate}}</pre>
            </q-scroll-area>
          </q-tab-pane>
        </q-tabs>
      </div>
    </div>
  </q-page>
</template>

<style>
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
  components: { Viewscript },
  data: function () {
    return {
      dynamicContent: this.getEmptyDynamicContent(),
      validation: {
        state: 'notValidated',
        errors: []
      },
      viewscript: '{}',
      exampleSlct: null,
      exampleOpts: [
        { label: 'Simple example', value: 'simple' },
        { label: 'Expression example', value: 'expression' },
        { label: 'Sub-view example', value: 'subView' },
        { label: 'Complex example', value: 'complex' },
        { label: 'Kitchen sink example', value: 'kitchenSink' }
      ]
    }
  },
  methods: {
    getEmptyDynamicContent () {
      return {
        quasarTemplate: '',
        data: {},
        internals: {},
        lists: {},
        toc: []
      }
    },
    tocClick (elementIdToScrollTo) {
      const e = document.getElementById(elementIdToScrollTo)
      e.scrollIntoView()
    },
    setExampleContent () {
      console.log('set example as:', this.exampleSlct)
      this.validation.state = 'notValidated'
      this.validation.errors = []
      this.dynamicContent = this.getEmptyDynamicContent()
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

        const output = processViewscript(parsed)

        this.dynamicContent.quasarTemplate = output.quasarOutput.template
        this.dynamicContent.data = output.defaultValues.rootView
        this.dynamicContent.internals = output.defaultInternals
        this.dynamicContent.lists = output.lists
        this.dynamicContent.toc = output.toc

        this.validation.state = 'valid'
        this.validation.errors = []
        this.$q.loading.hide()
      } catch (e) {
        this.dynamicContent = this.getEmptyDynamicContent()

        this.validation.state = 'invalid'
        this.validation.errors.push(e.message)
        this.$q.loading.hide()
      }
    }
  }
}

function processViewscript (viewscript) {
  const result = {}
  // const parserResult = parser(viewscriptString)
  // if (parserResult.parsed) {
  // const viewscript = parserResult.parsed
  // result.validatorOutput = validator(viewscript)
  // if (result.validatorOutput.widgetsValid) {
  result.defaultValues = extractDefaults(viewscript)
  result.toc = extractToc(viewscript)
  result.lists = extractLists(viewscript)
  result.defaultInternals = sdk.getDefaultInternals(viewscript)
  result.defaultInternals.subViewDefaults = result.defaultValues.subViews
  result.quasarOutput = quasarConverter(viewscript)
  // }

  // } else { ... }
  return result
}
</script>

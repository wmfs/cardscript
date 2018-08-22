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
      <div v-if="errors.length > 0">
        <q-alert
          v-for="(err, idx) in errors"
          :key="idx"
          type="negative"
        >
          {{err}}
        </q-alert>
      </div>

      <q-tabs no-pane-border>
        <q-tab default slot="title" name="view-tab" label="view"></q-tab>
        <q-tab slot="title" name="model-tab" label="model"></q-tab>
        <q-tab slot="title" name="template-tab" label="template"></q-tab>
        <q-tab-pane name="view-tab">
          <viewscript :content="dynamicContent" />
        </q-tab-pane>
        <q-tab-pane name="model-tab">
          <pre>{{dynamicContent.data}}</pre>
        </q-tab-pane>
        <q-tab-pane name="template-tab">
          {{dynamicContent.quasarTemplate}}
        </q-tab-pane>
      </q-tabs>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import Viewscript from './../components/Viewscript'

const quasarConverter = require('viewscript-to-quasar')
const extractDefaults = require('viewscript-extract-defaults')

export default {
  name: 'PageIndex',
  components: { Viewscript },
  data: function () {
    return {
      dynamicContent: {
        quasarTemplate: '',
        data: {}
      },
      errors: [],
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
    setExampleContent () {
      console.log('set example as:', this.exampleSlct)
      // this.viewscript = examples[this.exampleSlct]
    },
    renderViewscript () {
      this.errors = []
      try {
        const parsed = JSON.parse(this.viewscript)
        const output = processViewscript(parsed)
        this.dynamicContent.quasarTemplate = output.quasarOutput.template
        this.dynamicContent.data = output.defaultValues.rootView
      } catch (e) {
        this.errors.push(e.message)
      }
    }
  }
}

function processViewscript (viewscript) {
  const result = {}
  result.quasarOutput = quasarConverter(viewscript)
  result.defaultValues = extractDefaults(viewscript)
  return result
}
</script>

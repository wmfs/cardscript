<template>
  <q-layout view="lHh Lpr lFf">
    <q-jumbotron class="bg-primary" dark>
      <div class="q-display-3">Viewscript playpen</div>
      <div class="q-subheading q-my-lg">
        Use the editor below to write some of your own Viewscript JSON/YAML, then click <strong>Go</strong> to turn it
        into a UI!
      </div>
      <q-btn color="white" text-color="primary" class="q-py-sm q-px-xl" label="Learn more" @click="learnMore()"/>
    </q-jumbotron>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'Layout',
  methods: {
    openURL
  }
}
</script>

<style>
</style>

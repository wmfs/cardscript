<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar>
        <q-toolbar-title>
          Viewscript Quasar Playpen
          <span slot="subtitle">
            Use the editor below to write some of your own Viewscript JSON/YAML, then click <strong>Go</strong> to turn it into a UI!
          </span>
        </q-toolbar-title>
        <q-btn outline style="color: #fff;" label="Learn More" @click="learnMore" />
      </q-toolbar>
    </q-layout-header>
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
    learnMore () {
      openURL('https://github.com/wmfs/viewscript')
    }
  }
}
</script>

<style>
</style>

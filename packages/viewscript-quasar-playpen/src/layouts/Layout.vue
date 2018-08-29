<template>
  <q-layout view="lHh Lpr lFf">
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

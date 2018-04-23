<template>
    <div class="form-group">
        <label v-bind:for="widgetId">{{heading}}</label>
        <iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=-1.879638,52.483045,-1.87399,52.484927&amp;layer=mapnik" style="border: 1px solid black"></iframe>
        <small class="form-text text-muted">{{help}}</small>
    </div>
</template>
<script>
  export default {
    props: ['widgetId', 'value', 'heading', 'enabled', 'help', 'mandatory'],
    data () {
      return {
      }
    }
  }
</script>



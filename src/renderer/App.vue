<template>
    <router-view></router-view>
</template>

<script>
import appBar from '@/components/app-bar'
import appFooter from '@/components/app-footer'
export default {
  name: 'electron-vue-template',
  components: {
    'app-bar': appBar,
    'app-footer': appFooter
  }
}
</script>

<style lang="stylus">
@import './assets/styl/app.styl'
</style>

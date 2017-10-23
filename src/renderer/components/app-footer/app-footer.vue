<template>
  <section class="app-footer">
    版本：{{version}}
  </section>
</template>

<script>
const {version} = require('../../../../package.json')
export default {
  name: 'app-footer',
  data () {
    return {
      version: version
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-footer
  position fixed
  left: 0
  bottom .8rem
  width 100%
  text-align center
  color #20A0FF
</style>

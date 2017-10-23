<template>
  <!-- <el-container>
    <el-header height="25">
      <app-bar/>
    </el-header>
    <el-main> -->
    <router-view></router-view>
    <!-- </el-main>
    <el-footer>
      <app-footer/>
    </el-footer>
  </el-container> -->
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

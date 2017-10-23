<template>
  <section>
    <el-row class="app-bar"
            type="flex"
            justify="space-between"
            align="top"
    >
      <el-col class="app-drag"
              :span="23"
      />
      <el-col :span="1">
        <el-button class="app-bar-close" 
                  type="text"
                  icon="el-icon-circle-cross"
                  @click="close"
        />
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'app-bar',
  methods: {
    // 关闭`app`
    close () {
      this.$electron.remote.getCurrentWindow().close()
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-bar
  -webkit-app-region drag
  cursor move
  text-align center
  .app-drag
    color #fff
    font-size .9em
  .app-bar-close
    margin-top -1.2rem
    margin-right -3.2rem
    color #5A5E66 !important
    transition-timing-function ease
    transition-duration .25s
  .app-bar-close:hover
    color #FF4949 !important
</style>

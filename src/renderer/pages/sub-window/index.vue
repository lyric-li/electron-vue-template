<template>
  <section>
    <!-- <spinner :show="loading.show"/> -->
    <el-row class="app-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="2">
        <el-button-group>
          <el-button class="app-bar-btn" :class="{'app-bar-btn-active': active.back}" type="text" icon="el-icon-caret-left" @click="back" :disabled="!active.back"></el-button>
          <el-button class="app-bar-btn" :class="{'app-bar-btn-active': active.forward}" type="text" icon="el-icon-caret-right" @click="forward" :disabled="!active.forward"></el-button>
          <el-button class="app-bar-btn-refresh" style="margin-top:-2px;margin-left:2px;" type="text" icon="el-icon-lyric-shuaxin" @click="refresh"></el-button>
        </el-button-group>
      </el-col>
      <el-col class="app-drag" :span="21">{{title}}</el-col>
      <el-col :span="1" style="text-align:end;">
        <el-button class="app-bar-close" type="text" icon="el-icon-circle-close" @click="close"></el-button>
      </el-col>
    </el-row>
    <div class="app-content" 
         v-loading="loading.show"
         element-loading-text="拼命加载中..."
    >
      <webview id="webview" class="app-content-webview" src="https://zh.nuxtjs.org/" disablewebsecurity></webview>
    </div>
  </section>
</template>

<script>
import {remote} from 'electron'
// webview实例
var webview = ''
export default {
  name: 'app',
  data () {
    return {
      title: '',
      active: {
        back: false,
        forward: false
      },
      loading: {
        show: true
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      webview = document.getElementById('webview')
      webview.addEventListener('did-start-loading', () => {
        this.loading.show = true
      })
      webview.addEventListener('did-stop-loading', () => {
        this.loading.show = false
        this.title = webview.getTitle()
        this.active.back = webview.canGoBack()
        this.active.forward = webview.canGoForward()
      })
      webview.addEventListener('new-window', e => {
        webview.loadURL(e.url)
        this.active.back = webview.canGoBack()
        this.active.forward = webview.canGoForward()
      })
    },
    // 刷新
    refresh () {
      webview.reload()
    },
    // 后退
    back () {
      webview.goBack()
    },
    // 前进
    forward () {
      webview.goForward()
    },
    // 关闭app
    close () {
      remote.getCurrentWindow().close()
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-bar
  margin-top -1.8rem
.app-drag
  -webkit-app-region drag
  cursor move
  height 5rem
  line-height 5rem
  text-align center
  color #000
  font-size .9em
.app-bar-close
  color #5A5E66 !important
  &:hover
    color #FF4949 !important
.app-bar-btn
  color #5A5E66 !important
.app-bar-btn-refresh
  color #5A5E66 !important
  &:hover
    color #58B7FF !important
.app-bar-btn-active
  color #58B7FF !important
.app-content
  width 100%
  height 66rem
.app-content-webview
  width 100%
  height 100%
</style>

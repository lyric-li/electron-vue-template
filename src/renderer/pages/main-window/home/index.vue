<template>
  <section class="app-index">
    <img src="/static/logo.png"
        width="100px"
        alt="logo"
    />
    <div class="app-actions">
      <el-button icon="plus"
                 plain
                 @click="newPooject"
      >
        新建工程
      </el-button>
      <el-button icon="document"
                 plain
                 @click="onlineDocument"
      >
        在线文档
      </el-button>
    </div>
  </section>
</template>

<script>
import {remote} from 'electron'
const path = require('path')
// 主窗体
var mainWin = ''
// 副窗体
var subWin = ''
export default {
  name: 'app-index',
  data () {
    return {
      flag: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      this.mainWinEvents()
    },
    // 主窗体监听事件
    mainWinEvents () {
      // 获取主窗体实例
      mainWin = remote.getCurrentWindow()
      // 监听主窗体移动
      mainWin.on('move', () => {
        if (subWin) {
          // 副窗体跟随主窗体
          subWin.setPosition(mainWin.getPosition()[0] + mainWin.getSize()[0] + 5, mainWin.getPosition()[1])
        }
      })
      // 监听主窗口获取焦点
      mainWin.on('focus', () => {
        if (subWin) {
          // 展示窗口但是不获得焦点
          subWin.setAlwaysOnTop(true)
        }
      })
      // 监听主窗口失去焦点
      mainWin.on('blur', () => {
        if (subWin) {
          // 展示窗口但是不获得焦点
          subWin.setAlwaysOnTop(false)
        }
      })
      // 监听主窗口最小化
      mainWin.on('minimize', () => {
        if (subWin) {
          // 展示窗口但是不获得焦点
          subWin.minimize()
        }
      })
      // 监听主窗口最小化恢复
      mainWin.on('restore', () => {
        if (subWin) {
          // 展示窗口但是不获得焦点
          subWin.restore()
        }
      })
      // 监听窗口关闭之前
      window.onbeforeunload = e => {
        subWin.close()
        subWin = null
        this.flag = false
      }
    },
    // 新建工程
    newPooject () {
      this.$router.push('/detail')
    },
    // 在线文档
    onlineDocument () {
      this.flag = !this.flag
      if (this.flag) {
        if (!subWin) {
          const BrowserWindow = remote.BrowserWindow
          subWin = new BrowserWindow({
            width: 720,
            height: 720,
            x: mainWin.getPosition()[0] + mainWin.getSize()[0] + 5,
            y: mainWin.getPosition()[1],
            useContentSize: true,
            resizable: false,
            frame: false,
            icon: path.join(remote.app.getAppPath(), 'favicon.ico')
          })
          subWin.setSkipTaskbar(true)
          subWin.loadURL('http://localhost:9080/#/sub')
          subWin.on('close', () => {
            console.log('I do not want to be closed')
            subWin = null
            this.flag = false
          })
          // Open the DevTools.
          // subWin.webContents.openDevTools()
        } else {
          subWin.show()
        }
      } else {
        subWin.hide()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-index
  text-align: center
  .app-actions
    margin-top: 1.6rem
</style>

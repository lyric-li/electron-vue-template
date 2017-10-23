<template>
  <section class="app-index">
    <img src="static/logo.jpg"
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
import {ipcRenderer} from 'electron'
export default {
  name: 'home',
  data () {
    return {
      flag: false
    }
  },
  methods: {
    // 新建工程
    newPooject () {
      this.$router.push('/detail')
    },
    // 在线文档
    onlineDocument () {
      // global.__flag = !global.__flag
      // console.info('__flag:', global.__flag)
      ipcRenderer.send('open-subWindow')
      // this.flag = !this.flag
      // if (this.flag) {
      //   if (!subWin) {
      //     const BrowserWindow = remote.BrowserWindow
      //     subWin = new BrowserWindow({
      //       width: 720,
      //       height: 720,
      //       x: mainWin.getPosition()[0] + mainWin.getSize()[0] + 5,
      //       y: mainWin.getPosition()[1],
      //       useContentSize: true,
      //       resizable: false,
      //       frame: false,
      //       icon: path.join(remote.app.getAppPath(), 'favicon.ico')
      //     })
      //     subWin.setSkipTaskbar(true)
      //     subWin.loadURL('http://localhost:9080/#/sub')
      //     subWin.on('close', () => {
      //       console.log('I do not want to be closed')
      //       subWin = null
      //       this.flag = false
      //     })
      //     // Open the DevTools.
      //     // subWin.webContents.openDevTools()
      //   } else {
      //     subWin.show()
      //   }
      // } else {
      //   subWin.hide()
      // }
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-index
  text-align center
  .app-actions
    margin-top 1.6rem
</style>

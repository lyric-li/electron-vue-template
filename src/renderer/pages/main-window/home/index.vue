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
      flag: false,
      radio: '6'
    }
  },
  methods: {
    // 新建工程
    newPooject () {
      this.$router.push('/detail')
    },
    // 在线文档
    onlineDocument () {
      ipcRenderer.send('open-subWindow')
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

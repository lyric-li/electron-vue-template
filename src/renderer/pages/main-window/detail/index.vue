<template>
  <section class="detail">
    <el-button class="detail-back" 
               type="text"
               icon="el-icon-lyric-houtui"
               @click="back"
    />
    <transition name="slide-fade">
      <el-alert class="detail-alert"
                show-icon
                :title="alert.title"
                :type="alert.type"
                :closable="false"
                v-show="show"
      />
    </transition>
    <el-row class="detail-target"
            type="flex"
            justify="space-between"
            align="middle"
    >
      <el-col :span="22"
      >
        <el-input v-model="target"
                  size="mini"
                  placeholder="请选择一个空目录"
                  disabled
        />
      </el-col>
      <el-col :span="2">
        <el-button class="detail-folder" 
                  type="text"
                  icon="el-icon-lyric-folder"
                  @click="choiceTargetPath"
        />
      </el-col>
    </el-row>
    <div class="detail-log" ref="log">
      <div v-if="logs.length === 0">暂无输出日志信息...</div>
      <p :key="index"
            v-for="(log, index) in logs"
      >
        <i class="el-icon-success"></i>{{log}}
      </p>
    </div>
    <div>
      <el-button type="primary"
                 plain
                 size="mini"
                 @click="createNewProject(target)"
      >
        生成项目
      </el-button>
      <el-button type="danger"
                 plain
                 size="mini"
                 :disabled="disabled"
                 @click="openNewProject(target)"
      >
        打开项目
      </el-button>
    </div>
  </section>
</template>

<script>
import {ipcRenderer, shell} from 'electron'
const path = require('path')
const fs = require('fs')
const Zip = require('adm-zip')
export default {
  name: 'detail',
  data () {
    return {
      show: false,
      alert: {
        show: true,
        title: '成功提示的文案',
        type: 'success'
      },
      progress: {
        percent: 30,
        status: ''
      },
      source: '',
      target: '',
      logs: [],
      disabled: true
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    show (newValue) {
      const timer = setTimeout(() => {
        this.show = false
        clearTimeout(timer)
      }, 2000)
    }
  },
  methods: {
    // 初始化
    init () {
      this.ipcMonitor()
    },
    // 选择目标路径
    choiceTargetPath () {
      ipcRenderer.send('open-file-dialog')
    },
    // 监听系统对话框的回调
    ipcMonitor () {
      ipcRenderer.on('selected-directory', (event, paths) => {
        this.disabled = true
        // 目标路径
        this.target = path.join(paths[0], '/')
      })
    },
    // 创建新工程
    createNewProject (target) {
      // 空目标路径判断
      if (!target) {
        this.show = true
        this.alert.title = '请选择一个空目录'
        this.alert.type = 'error'
        return
      }
      // 阻止在非空目录生成
      const files = fs.readdirSync(target)
      if (files.length > 0) {
        this.show = true
        this.alert.title = '请选择一个空目录'
        this.alert.type = 'error'
        return
      }
      this.logs = []
      // 源路径
      const source = path.join(__static, '/template.zip')
      const zip = new Zip(source)
      const entries = zip.getEntries()
      const len = entries.length
      for (let i = 0; i < len; i++) {
        const timer = setTimeout(() => {
          const entry = entries[i]
          var entryName = entry.entryName
          this.logs.push(entryName)
          zip.extractEntryTo(entryName, target, true, true)
          if (i === len - 1) {
            this.show = true
            this.alert.title = '生成项目成功'
            this.alert.type = 'success'
            this.disabled = false
          }
          this.$refs.log.scrollTop = this.$refs.log.scrollHeight
          clearTimeout(timer)
        }, i * 100)
      }
    },
    // 打开项目
    openNewProject (target) {
      shell.showItemInFolder(target)
    },
    // 返回上一级
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail
  text-align center
  margin-top -2rem
  .detail-back
    position absolute
    left 0
    top 0
    margin-left .8rem
    margin-top -.5rem
    color: #5A5E66 !important
    transition-timing-function: ease
    transition-duration: .25s
    &:hover
      color: #58B7FF !important
  .detail-alert
    position fixed
    left 0
    top 0
    z-index 2
  .detail-target
    text-align center
    .detail-folder
      color: #5A5E66 !important
      transition-timing-function: ease
      transition-duration: .25s
      &:hover
        color: #58B7FF !important
  .detail-log
    background-color #eee
    color #5A5E66
    text-align left
    height 32.5rem
    margin-top .5rem
    margin-bottom 1rem
    overflow-x hidden
    overflow-y auto
    padding 0 .8rem
    font-size 1.2rem
    text-overflow ellipsis
    white-space nowrap
    div
      text-align center
      margin-top .5rem
      color #5A5E66
    p
     i
      margin-right .8rem
      color #67C23A
</style>

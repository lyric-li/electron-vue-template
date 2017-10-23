<template>
  <el-container>
    <el-header height="25px">
      <app-bar/>
    </el-header>
    <el-main>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </el-main>
    <el-footer>
      <app-footer/>
    </el-footer>
  </el-container>
</template>

<script>
import appBar from '@/components/app-bar'
import appFooter from '@/components/app-footer'
export default {
  name: 'index',
  components: {
    appBar,
    appFooter
  }
}
</script>


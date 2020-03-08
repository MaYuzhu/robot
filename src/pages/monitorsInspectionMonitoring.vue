<template>
  <div>
    <HeaderTop :title="title"></HeaderTop>
    <div style="width: 65%;background:lavender">
      <XunjianContent></XunjianContent>
    </div>
    <taskControl style="width: 65%"></taskControl>

    <TabsBottom></TabsBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import TabsBottom from '../components/tabsBottom.vue'
  import XunjianContent from '../components/xunjianContent.vue'
  import taskControl from '../components/taskControl.vue'

  export default {
    data(){
      return{
        title:'巡检监控 > 巡检监控'
      }
    },
    components: {
      HeaderTop,
      TabsBottom,
      XunjianContent,
      taskControl
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

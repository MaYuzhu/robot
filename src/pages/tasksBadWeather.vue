<template>
  <div>
    <HeaderTop :title="title"></HeaderTop>
    <XunjianTopBox></XunjianTopBox>
    <XunjianFindTool></XunjianFindTool>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import XunjianTopBox from '../components/xunjianTopBox.vue'
  import XunjianFindTool from '../components/xunjianFindTool.vue'
  export default {
    data(){
      return{
        title:'特殊巡检 > 恶劣天气'
      }
    },
    components: {
      HeaderTop,
      XunjianTopBox,
      XunjianFindTool
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

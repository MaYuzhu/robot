<template>
  <div>
    <HeaderTop :title="title"></HeaderTop>

  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'

  export default {
    data(){
      return{
        title:'机器人信息查询 > 机器人告警查询'
      }
    },
    components: {
      HeaderTop,

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
  <div class="line_show_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="pic_line"></div>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'设备告警信息确认 > 主接线展示',
      }
    },
    components: {
      HeaderTop,
      menuBottom
    },
    mounted(){

    },
    methods:{

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .line_show_wrap
    width 100%
    height calc(100% - 90px)
    .pic_line
      width 100%
      height 100%
      background url("../../static/img/zhujiexian.jpg") no-repeat center/100% 100%
</style>

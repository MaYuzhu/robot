<template>
  <div class="monitoring_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div style="overflow: hidden;height: 100%">
      <div class="left" style="width: 65%;">
        <div style="background:lavender">
          <XunjianContent></XunjianContent>
        </div>
        <taskControl></taskControl>
      </div>
      <div class="right" style="width: 35%">
        <div class="right_top">

        </div>
        <div class="right_bottom">
          <!--<Button @click="red_pic">红外</Button>-->
          <!--<img id="chatterMessage" :src="src" style="width: 100%;height: 100%" alt="">-->
        </div>
      </div>
    </div>


    <TabsBottom style="clear: both"></TabsBottom>
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
    mounted(){
      this.$axios({
        method: 'get',
        url: url_api + '/user/userList',

      }).then(res=>{
      	//console.log(res.data)
      })
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .monitoring_wrap
    height 100%
    .left,.right
      float left
      height 100%
      box-sizing border-box
      .right_top,.right_bottom
        height 50%
        border 1px solid
</style>

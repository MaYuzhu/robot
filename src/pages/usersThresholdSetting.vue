<template>
  <div class="threshold_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="threshold_top">
      <div class="top_left">
        <el-input v-model="input" placeholder="请输入内容" style="width: 130px;float: left" size="mini"></el-input>
        <ul>
          <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
          <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
        </ul>
      </div>
      <div class="top_right">
        <p>设备名称：</p>
        <el-input v-model="input2" placeholder="请输入内容" style="width: 180px;float: left" size="mini"></el-input>
        <p>识别类型：</p>
        <el-input v-model="input3" placeholder="请输入内容" style="width: 180px;float: left" size="mini"></el-input>
        <ul>
          <li><img src="../../static/images/save.png" alt=""><span>保存</span></li>
          <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
        </ul>
      </div>
    </div>
    <div class="threshold_content">
      <div class="content_left"><DevTree></DevTree></div>
      <div class="content_right"></div>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import DevTree from '../components/devTree.vue'

  export default {
    data(){
      return{
        title:'告警设置 > 告警阈值设置',
        input:'',
        input2:'',
        input3:'',
      }
    },
    components: {
      HeaderTop,
      DevTree
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .threshold_wrap
    .threshold_top
      display flex
      height 30px
      background #cae7ee\0
      background linear-gradient(#e3f2ee,#cae7ee)
      align-items center
      .top_left
        width 300px
        display flex
        border-right 1px solid #cae7ee
        padding-left 10px
        box-sizing border-box
        float left
        ul
          float left
          display flex
          padding-left 5px
          li
            float left
            margin-right 10px
            display flex
            align-items center
            cursor pointer
            img
              width 16px
              height 16px
              margin-right 4px

      .top_right
        width calc(100% - 300px)
        display flex
        align-items center
        border-right 1px solid #cae7ee
        padding-left 10px
        box-sizing border-box
        float left
        p
          float left
          margin-left 10px
          font-weight 600
        ul
          display flex
          padding-left 5px
          li
            margin 0 30px
            display flex
            align-items center
            cursor pointer
            float left
            img
              width 16px
              height 16px
              margin-right 4px

</style>

<template>
  <div class="systems_outlier_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="systems_outlier_top">
      <p>识别状态：</p>
      <el-radio v-model="radio_shen" v-for="item in radio_items_shen"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-radio>
      <p>开始时间：</p>
      <el-date-picker size="mini" style="width: 160px;float: left"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <p>结束时间：</p>
      <el-date-picker size="mini" style="width: 160px;float: left"
                      v-model="value2"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <ul>
        <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
        <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
        <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
      </ul>
    </div>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'机器人信息查询 > 识别异常点查询',
        radio_shen: '识别正常',
        radio_items_shen:[
          {
            value:1,
            label:'识别正常'
          },
          {
            value:2,
            label:'识别异常'
          }
        ],
        value1:'',
        value2:'',
      }
    },
    components: {
      HeaderTop,
      menuBottom
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .systems_outlier_wrap
    .systems_outlier_top
      display flex
      height 30px
      background #cae7ee\0
      background linear-gradient(#e3f2ee,#cae7ee)
      align-items center
      .el-radio,>p
        margin 0 20px
        float left
      >p
        margin-left  30px
        font-weight 600
      ul
        float left
        display flex
        padding-left 30px
        li
          float left
          margin-right 30px
          display flex
          align-items center
          cursor pointer
          img
            width 16px
            height 16px
            margin-right 4px
</style>

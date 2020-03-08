<template>
  <div class="reports_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <XunjianTopBox></XunjianTopBox>
    <div class="reports_tools">
      <p>开始时间：</p>
      <el-date-picker size="mini" style="width: 160px"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <p>结束时间：</p>
      <el-date-picker size="mini" style="width: 160px"
                      v-model="value2"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <div>
        <ul>
          <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
          <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
          <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
          <li><img src="../../static/images/report.png" alt=""><span>自定义报表</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import XunjianTopBox from '../components/xunjianTopBox.vue'

  export default {
    data(){
      return{
        title:'生成报表 > 生成报表',
        value1:'',
        value2:''

      }
    },
    components: {
      HeaderTop,
      XunjianTopBox
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .reports_wrap
    .reports_tools
      height 30px
      background linear-gradient(#e3f2ee,#cae7ee)
      display flex
      align-items center
      p
        margin-left 10px
        font-weight 600
      div
        margin-right 20px
        ul
          display flex
          padding-left 30px
          li
            margin-right 30px
            display flex
            align-items center
            cursor pointer
            img
              width 16px
              height 16px
              margin-right 4px
</style>

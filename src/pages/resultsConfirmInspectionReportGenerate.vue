<template>
  <div class="generate_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="generate_top_checked">
      <AlarmQueryTop></AlarmQueryTop>
    </div>
    <div class="right_title_tool">
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
          <li><img src="../../static/images/export.png" alt=""><span>导出报告</span></li>
        </ul>
      </div>
    </div>
    <div class="right_title">巡检报告生成</div>
    <div>
      <el-table size="mini"

                border
                style="width: 100%;height: 200px">
        <el-table-column
          prop="date"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column type="selection"
          prop="address"
          label="123"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="任务名称"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="任务状态"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="审核状态"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="开始时间"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="结束时间"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="巡检点位总数"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="正常点位数"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="告警点位数"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="识别异常点位数"
        >
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import AlarmQueryTop from '../components/alarmQueryTop.vue'

  export default {
    data(){
      return{
        title:'巡检报告生成 > 巡检报告生成',
        value1:'',
        value2:''
      }
    },
    components: {
      HeaderTop,
      AlarmQueryTop
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .generate_wrap
    .generate_top_checked
      background #efefef
    .right_title_tool
      width 100%
      height 30px
      background #cae7ee\0
      background linear-gradient(#e3f2ee,#cae7ee)
      display flex
      align-items center
      line-height 28px
      p
        float left
        margin-left 10px
        font-weight 600
      div
        float left
        margin-right 20px
        ul
          display flex
          padding-left 30px
          li
            float left
            margin-right 30px
            display flex
            align-items center
            cursor pointer
            line-height 30px
            img
              width 16px
              height 16px
              margin-right 4px


    .right_title
      width 100%
      height 30px
      line-height 30px
      background #d7f4fb \0
      background linear-gradient(#e3f2ee,#cae7ee)
      padding-left 12px
</style>

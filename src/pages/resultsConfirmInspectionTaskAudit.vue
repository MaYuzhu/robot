<template>
  <div class="task_audit_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="shenhe">
      <span>审核状态：</span>
      <el-checkbox v-model="checked1">未审核</el-checkbox>
      <el-checkbox v-model="checked2">已审核</el-checkbox>
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
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <div>
        <ul>
          <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
          <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
        </ul>
      </div>
    </div>
    <div class="right_title">任务审核</div>
    <div>
      <el-table size="mini"

                border
                style="width: 100%;height: 510px">
        <el-table-column
          prop="date"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="address"
          label="审核状态"
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

  export default {
    data(){
      return{
        title:'巡检结果浏览 > 巡检任务审核',
        checked1: true,
        checked2: false
      }
    },
    components: {
      HeaderTop,

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .task_audit_wrap
    .shenhe
      display flex
      height 30px
      align-items center
      padding-left 20px
      span
        font-weight 600
      .el-checkbox
        margin 0 30px
    .right_title_tool
      width 100%
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



    .right_title
      width 100%
      height 30px
      line-height 30px
      background linear-gradient(#e3f2ee,#cae7ee)
      padding-left 12px

</style>

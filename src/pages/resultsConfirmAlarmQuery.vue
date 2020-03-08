<template>
  <div class="alarm_query_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <AlarmQueryTop></AlarmQueryTop>
    <div class="tools_query">
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
      <el-radio v-model="radio" label="1">已审核</el-radio>
      <el-radio v-model="radio" label="2">未审核</el-radio>
      <div>
        <ul>
          <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
          <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
          <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
          <li><img src="../../static/images/confirm.png" alt=""><span>批量确认</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import AlarmQueryTop from '../components/alarmQueryTop.vue'

  export default {
    data(){
      return{
        title:'设备告警信息确认 > 设备告警查询确认',
        value1:'',
        radio:'1'
      }
    },
    components: {
      HeaderTop,
      AlarmQueryTop

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .alarm_query_wrap
    .tools_query
      height 30px
      background: linear-gradient(#e3f2ee,#cae7ee);
      border-top: 1px solid #cae7ee;
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

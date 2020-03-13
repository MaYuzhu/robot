<template>
  <div class="robot_alarm_query_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="robot_top">
      <el-radio v-model="radio_shen" v-for="item in radio_items_shen"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-radio>
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
      <ul>
        <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
        <li><img src="../../static/images/modify.png" alt=""><span>审核</span></li>
      </ul>
    </div>
    <div class="title">用户操作</div>
    <div>
      <el-table size="mini"

                border
                style="width: 100%">
        <el-table-column
          prop="date"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column type="selection"
          prop="address"
          label=""
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="审核状态"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="报警类型"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="报警级别"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="机器人名称"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="报警内容"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="报警时间"
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
        title:'机器人信息查询 > 机器人告警查询',
        radio_shen: '未审核',
        radio_items_shen:[
          {
            value:1,
            label:'未审核'
          },
          {
            value:2,
            label:'已审核'
          }
        ],
        value1:'',
        value2:'',
      }
    },
    components: {
      HeaderTop,

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .robot_alarm_query_wrap
    .robot_top
      display flex
      height 30px
      background linear-gradient(#e3f2ee,#cae7ee)
      align-items center
      .el-radio,>p
        margin 0 20px
      >p
        margin-left  30px
        font-weight 600
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
    .title
      display flex
      height 30px
      background linear-gradient(#e3f2ee,#cae7ee)
      align-items center
      padding-left 20px

</style>

<template>
  <div class="log_management_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="log_top">
      <p>日志类型：</p>
      <el-select v-model="value" placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
      </ul>
    </div>
    <div class="log_title">日志列表</div>
    <div>
      <el-table size="mini"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="日志类型">
        </el-table-column>
        <el-table-column
          prop="address"
          label="日志内容">
        </el-table-column>
        <el-table-column
          prop="name"
          label="日志时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="创建者">
        </el-table-column>
        <el-table-column
          prop="name"
          label="变电站">
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
        title:'系统设置 > 日志管理',
        value1:'',
        value2:'',
        options: [{
          value: '选项1',
          label: '系统'
        }, {
          value: '选项2',
          label: '机器人'
        }, {
          value: '选项3',
          label: '客户端'
        }],
        value: '',
        tableData: [{
          date: '1',
          name: '123',
          address: ' 1518 '
        }, {
          date: '2',
          name: '1234',
          address: ' 1517 '
        }, {
          date: '3',
          name: '1001',
          address: ' 1519 '
        }, {
          date: '4',
          name: '1002',
          address: ' 1516 '
        }]
      }
    },
    components: {
      HeaderTop,

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .log_management_wrap
    .log_top
      background linear-gradient(#e3f2ee,#cae7ee)
      display flex
      align-items center
      height 32px
      p
        margin-left 10px
        font-weight 600
      ul
        display flex
        padding-left 5px
        li
          margin 0 10px
          display flex
          align-items center
          cursor pointer
          img
            width 16px
            height 16px
            margin-right 4px

    .log_title
      height 30px
      line-height 30px
      background linear-gradient(#e3f2ee,#cae7ee)
      padding-left 10px
</style>

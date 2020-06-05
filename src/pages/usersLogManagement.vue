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
      <el-date-picker size="mini" style="width: 160px;float: left"
                      v-model="value1"
                      type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd"
                      placeholder="选择日期">
      </el-date-picker>
      <p>结束时间：</p>
      <el-date-picker size="mini" style="width: 160px;float: left"
                      v-model="value2"
                      type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd"
                      placeholder="选择日期">
      </el-date-picker>
      <ul>
        <li @click="queryList"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
      </ul>
    </div>
    <div class="log_title">日志列表</div>
    <div class="table_box">
      <el-table size="mini" class="table_height"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column  align="center"
          type="index" :index="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="type" align="center" width="100"
          label="日志类型" :formatter="formatStatus">
        </el-table-column>
        <el-table-column
          prop="content" align="center"
          label="日志内容">
        </el-table-column>
        <el-table-column width="210"
          prop="createTime" align="center"
          label="日志时间">
        </el-table-column>
        <el-table-column width="120"
          prop="user.name" align="center"
          label="创建者">
        </el-table-column>
        <el-table-column width="220"
          prop="" align="center"
          label="变电站">
        </el-table-column>

      </el-table>
      <div class="page_box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
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
        title:'系统设置 > 日志管理',
        value1:'',
        value2:'',
        options: [
        	{
          value: 0,
          label: '系统'
        }, {
          value: 1,
          label: '机器人'
        }],
        value: 0,
        tableData: [
        	{
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
        }],

        total:1,
        logData : {
          size:10,
          page:1
        },
        currentPage: 1,
      }
    },
    components: {
      HeaderTop,
      menuBottom
    },
    mounted(){
      let _this = this
      _this.value1 = _this.convertToLateDate()
      _this.value2 = _this.nowTime()
      _this.getLogList()
    },
    methods:{
    	getLogList(){
    		let _this = this
        _this.logData.startTime = _this.value1
        _this.logData.endTime = _this.value2
        _this.logData.type = _this.value
        _this.ajax_api('get',url_api + '/operation-log/logList',_this.logData,true,function (res) {
          console.log(res)
          if(res.code!==200){
            return
          }
          _this.total = res.data.total
          _this.tableData = res.data.items
        })

      },
      queryList(){
        this.getLogList()
      },
      formatStatus(row, column) {
        return row.type == 0 ? '系统' : row.type == 1 ? '机器人' : '客户端'
      },
      index(val){
        //(listQuery.page - 1) * listQuery.size + scope.$index + 1
        return (this.logData.page - 1)*this.logData.size + val + 1
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.logData.size  =  val
        this.getLogList()
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.logData.page  =  val
        this.getLogList()
      },
      convertToLateDate(){
        var data = new Date();
        var Da = new Date(data.getTime() - 24 * 60 * 60 * 1000 * 31);
        // 以上两行代码为关键代码，若想要返回一天后的时间，则可以将第二行代码更换为下面代码
        // var Da = new Date(data.getTime() + 24 * 60 * 60 * 1000);
        // 若是想要返回值为当前时间，则上面两行代码可以直接修改为下面代码即可。
        // var Da = new Date()
        var y = Da.getFullYear();
        var m = Da.getMonth() + 1;
        var d = Da.getDate();
        var H = Da.getHours();
        var mm = Da.getMinutes();
        var s = Da.getSeconds();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        H = H < 10 ? "0" + H : H;
        s = s < 10 ? "0" + s : s;
        return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + s;

      },
      nowTime(){
        var Da = new Date();
        // 以上两行代码为关键代码，若想要返回一天后的时间，则可以将第二行代码更换为下面代码
        // var Da = new Date(data.getTime() + 24 * 60 * 60 * 1000);
        // 若是想要返回值为当前时间，则上面两行代码可以直接修改为下面代码即可。
        // var Da = new Date()
        var y = Da.getFullYear();
        var m = Da.getMonth() + 1;
        var d = Da.getDate();
        var H = Da.getHours();
        var mm = Da.getMinutes();
        var s = Da.getSeconds();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        H = H < 10 ? "0" + H : H;
        s = s < 10 ? "0" + s : s;
        return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + s;
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .log_management_wrap
    height 100%
    .log_top
      background linear-gradient(#e3f2ee,#cae7ee)
      display flex
      align-items center
      height 32px
      p
        float left
        margin-left 10px
        font-weight 600
      .el-select
        float left
      div>>>el-date-picker
        float left
      ul
        float left
        display flex
        padding-left 5px
        li
          float left
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
      background #e3f2ee\0
      background linear-gradient(#e3f2ee,#cae7ee)
      padding-left 10px
    .table_box
      height calc(100% - 154px)
      border 1px solid #cae7ee
      position relative
      background white
      .table_height
        height calc(100% - 40px)
        overflow-y auto
      .page_box
        width 100%
        position absolute
        bottom 0
</style>

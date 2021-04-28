<template>
  <div class="robot_alarm_query_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="robot_top">
      <el-radio v-model="radio_shen" v-for="item in radio_items_shen"
                :key="item.value"
                :label="item.value"
                :value="item.value">{{item.label}}</el-radio>
      <p>开始时间：</p>
      <el-date-picker size="mini" style="width: 160px;float: left"
                      v-model="startTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <p>结束时间：</p>
      <el-date-picker size="mini" style="width: 160px;float: left"
                      v-model="endTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <ul>
        <li @click="queryAlarm"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
        <li @click="checkDataBox"><img src="../../static/images/modify.png" alt=""><span>审核</span></li>
      </ul>
    </div>
    <div class="title">用户操作</div>
    <div class="table_box">
      <el-table size="mini" ref="alarmRobotTable"
                :data="tableData"
                border
                style="width: 100%">
        <el-table-column align="center"
          prop="date" type="index" :index="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column type="selection"
          prop="address" align="center"
          label=""
        >
        </el-table-column>
        <el-table-column :formatter="checkStatus"
          prop="checkStatus" align="center"
          label="审核状态" width="100"
        >
        </el-table-column>
        <el-table-column
          prop="sysPoint.displayName" align="center"
          label="报警类型" width="240"
        >
        </el-table-column>
        <el-table-column :formatter="alarmLevel"
          prop="address" align="center"
          label="报警级别" width="140"
        >
        </el-table-column>
        <el-table-column
          prop="robot.name" align="center"
          label="机器人名称" width="140"
        >
        </el-table-column>
        <el-table-column
          prop="sysPoint.description" align="center"
          label="报警内容"
        >
        </el-table-column>
        <el-table-column align="center"
          prop="reconTime"
          label="报警时间" width="300"
        >
        </el-table-column>

      </el-table>
      <div class="page_box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="确认" :visible.sync="dialogVisibleShenhe" class="del_user">
      <div class="dialog_content" style="height: 60px;font-weight: 600;font-size: 16px;line-height: 40px">
        <p>{{shenheMessage}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleShenhe = false">取 消</el-button>
        <el-button type="primary" @click="checkData">确 认</el-button>
      </span>
    </el-dialog>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'机器人信息查询 > 机器人告警查询',
        radio_shen: 0,
        radio_items_shen:[
          {
            value:0,
            label:'未审核'
          },
          {
            value:1,
            label:'已审核'
          }
        ],
        startTime:'',
        endTime:'',
        alarmData:{
          page:1,
          size:10,
          checkStatus:0
        },
        currentPage:1,
        total:0,
        tableData:[],
        dialogVisibleShenhe:false,
        shenheMessage:'',
      }
    },
    mounted(){
      var _this = this;
      _this.endTime = _this.todayDate();// 默认显示为当天时间
      _this.startTime = _this.convertToLateDate();
      _this.getAllData()
    },
    methods:{
    	getAllData(){
        let _this = this
        _this.ajax_api('get',url_api + '/sys-point-alarm-history',
          _this.alarmData,
          true,function (res) {
            console.log(res.data)
            _this.tableData = res.data.items
            _this.total = res.data.total
          })
      },
      index(val){
        //(listQuery.page - 1) * listQuery.pageSize + scope.$index + 1
        return (this.alarmData.page - 1)*this.alarmData.size + val + 1
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.alarmData.size  =  val
        this.getAllData()
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.alarmData.page  =  val
        this.getAllData()
      },
      checkStatus(row, column){
      	return row.checkStatus == 0 ? '未审核' : '已审核'
      },
      alarmLevel(row, column){
      	let result
      	switch (row.alarmLevel){
          case 0:
            result = "正常";
            break;
          case 1:
            result = "预警";
            break;
          case 2:
            result = "一般告警";
            break;
          case 3:
            result = "严重告警";
            break;
          case 4:
            result = "危机告警";
            break;
        }
        return result
      },
      index(val){
        //(listQuery.page - 1) * listQuery.pageSize + scope.$index + 1
        return (this.alarmData.page - 1)*this.alarmData.size + val + 1
      },

      //审核
      checkDataBox(){
        let _this = this
        _this.dialogVisibleShenhe = true
        let select_arr = _this.$refs.alarmRobotTable.selection
        if(select_arr.length<1){
          _this.shenheMessage = '请选择要审核的条目...'
          return
        }

        _this.shenheMessage = '确认要审核这些条目？'

      },
      checkData(){
      	let _this = this
      	let select_arr = _this.$refs.alarmRobotTable.selection
        console.log(select_arr)
        let select_id_arr = []
        for(let i=0;i<select_arr.length;i++){
          select_id_arr.push(select_arr[i].id)
        }
        let ids = select_id_arr.toString()

        _this.ajax_api('put',url_api + '/sys-point-alarm-history/batch-confirm',
          {ids:ids},
          true,function (res) {
            if(res.code == 200){
              _this.$message({
                message: '审核成功',
                type: 'success',
              });
            }else {
              _this.$message({
                message: '操作失败，请确认后再试',
              });
            }
          })
        _this.dialogVisibleShenhe = false
      },

      queryAlarm(){
      	let _this = this
        _this.alarmData.checkStatus = _this.radio_shen
        //_this.alarmData.startTime = _this.startTime
        //_this.alarmData.endTime = _this.endTime

        _this.getAllData()
      },

      todayDate(){
        var Da = new Date();
        //var Da = new Date(data.getTime() - 24 * 60 * 60 * 1000 * 31);
        // var Da = new Date()
        var y = Da.getFullYear();
        var m = Da.getMonth() + 1;
        var d = Da.getDate();
        var H = Da.getHours();
        var mm = Da.getMinutes();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        H = H < 10 ? "0" + H : H;
        //return y + "-" + m + "-" + d + " " + H + ":" + mm;
        return y + "-" + m + "-" + d
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
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        H = H < 10 ? "0" + H : H;
        //return y + "-" + m + "-" + d + " " + H + ":" + mm;
        return y + "-" + m + "-" + d
      },
    },
    components: {
      HeaderTop,
      menuBottom
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .robot_alarm_query_wrap
    position relative
    height 100%
    .robot_top
      display flex
      height 30px
      background #cae7ee\0
      background linear-gradient(#e3f2ee,#cae7ee)
      align-items center
      .el-radio,>p
        float left
        margin 0 20px
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
    .title
      display flex
      height 30px
      background #d7f5fc \0
      background linear-gradient(#e3f2ee,#cae7ee)
      align-items center
      padding-left 20px
    .table_box
      height calc(100% - 150px)
      position relative
      background white
      .page_box
        position absolute
        bottom 0

    div>>>
      .el-dialog
        background #d7efec
        width: 48%;
        min-width: 800px;
        padding-bottom: 6px;
        .dialog_content
          background white
          padding 10px 20px
          border 1px solid #90e8c6
          .title
            height 40px
            line-height 40px
            border-bottom 1px solid #bababa
            span
              font-size 14px
              font-weight 600
    div>>>
      .el-dialog__body
        padding 2px 5px 0px
    div>>>
      .el-dialog__footer
        border 1px solid #90e8c6
        border-top none
        padding 5px 10px
        margin 0 5px
        background white
      .el-button
        padding 6px 20px
    div>>>
      .el-dialog__headerbtn
        top 8px
        right 8px
    div>>>.el-dialog
      .el-dialog__title
        display inline-block
        position absolute
        font-size 14px
        top 4px
        left 10px
    .del_user /deep/ .el-dialog
      background #d7efec
      width: 24%;
      min-width: 240px;
      padding-bottom: 6px;

</style>

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
                      v-model="value_start"
                      type="date" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
      </el-date-picker>
      <p>结束时间：</p>
      <el-date-picker size="mini" style="width: 160px"
                      v-model="value_end"
                      type="date" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
      </el-date-picker>
      <div>
        <ul>
          <li @click="queryData"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
          <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
        </ul>
      </div>
    </div>
    <div class="right_title">任务审核</div>
    <div class="table_wrap">
      <el-table size="mini" @row-dblclick="dblGoBrowse"
                :data="dataTable"
                border
                style="width: 100%;">
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
          prop="name"
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
    <menuBottom></menuBottom>
    <div class="audit_dialog">
      <el-dialog title="任务审核" :visible.sync="dialogVisibleAudit" class="">
        <div class="dialog_content">
          <p style="margin-bottom:30px">
            <span>审核人：</span>
            <el-input size="mini" :disabled="true" style="width:160px;margin-left:14px" v-model="input_person"></el-input>
            <span style="margin-left:84px">审核时间：</span>
            <el-date-picker size="mini" style="width: 160px"
                            v-model="value_now" :disabled="true"
                            type="date" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
            </el-date-picker>
          </p>
          <p style="vertical-align: middle">
            <span>审核意见：</span>
            <el-input
              type="textarea"
              :rows="5" style="width: 485px;vertical-align: middle"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAudit = false">取 消</el-button>
        <el-button type="primary" @click=" ">确 认</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'巡检结果浏览 > 巡检任务审核',
        checked1: true,
        checked2: false,
        value_start:'',
        value_end:'',
        value_now:'',
        dataTable:[{name:'abc',id:1},{name:'lkj',id:2}],
        currentPage:1,
        total:1,
        dialogVisibleAudit:false,
        input_person: localStorage.getItem("username"),
        textarea:'',
      }
    },
    mounted(){
      this.value_start = this.convertToLateDate()
      this.value_end = this.getDateTime()
      this.value_now = this.getDateTime()

    },
    methods:{
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
        var ss = Da.getSeconds();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        H = H < 10 ? "0" + H : H;
        mm = mm < 10 ? "0" + mm : mm;
        ss = ss < 10 ? "0" + ss : ss;
        //return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + ss;
        return y + "-" + m + "-" + d
      },
      getDateTime(){ //默认显示今天
        var Da = new Date();
        //var Da = new Date(data.getTime() - 24 * 60 * 60 * 1000 * 31);
        // var Da = new Date()
        var y = Da.getFullYear();
        var m = Da.getMonth() + 1;
        var d = Da.getDate();
        var H = Da.getHours();
        var mm = Da.getMinutes();
        var ss = Da.getSeconds();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        H = H < 10 ? "0" + H : H;
        mm = mm < 10 ? "0" + mm : mm;
        ss = ss < 10 ? "0" + ss : ss;
        //return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + ss;
        return y + "-" + m + "-" + d
      },
      dblGoBrowse(row){
      	let _this = this
      	console.log(row.id)
        //this.$router.push('/resultsConfirm/inspection-results-browse')
        _this.dialogVisibleAudit = true
      },
      queryData(){
      	let _this = this
        let queryDataGet = {
      		startTime: _this.value_start,
          endTime: _this.value_end
        }
        console.log(queryDataGet)
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.taskData.size = val
        this.getTableData()
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.taskData.page = val
        this.getTableData()
      },
    },
    components: {
      HeaderTop,
      menuBottom
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .task_audit_wrap
    height 100%
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
      background #cae7ee\0
      background linear-gradient(#e3f2ee,#cae7ee)
      display flex
      align-items center
      line-height 30px
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
      box-sizing border-box
    .table_wrap
      height calc(100% - 180px)
      background #fff
      position relative
      .page_box
        position absolute
        bottom 0

    .audit_dialog /deep/
      .el-dialog
        background #d7efec
        width: 700px;
        padding-bottom: 6px;
        .el-dialog__header
          padding 10px 10px 5px
          position relative
          height 16px
          .el-dialog__title
            display inline-block
            position absolute
            font-size 14px
            top 4px
            left 10px
          .el-dialog__headerbtn
            top 8px
            right 8px
        .el-dialog__body
          padding 0px 8px
          .dialog_content
            background white
            padding 50px 50px 70px
            overflow hidden
            border 1px solid #90e8c6


        .el-dialog__footer
          background #fff
          border 1px solid #90e8c6
          border-top none
          margin 1px 8px 5px
          padding 5px 10px
          .el-button
            padding 8px 22px


</style>

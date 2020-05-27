<template>
  <div class="task_show_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="task_show_content" style="display: flex">
      <div class="task_show_wrap_left">
        <div class="task_show_top">
          <p style="float: left">任务执行时间：</p>
          <el-date-picker size="mini" :picker-options="pickerOptions" style="float: left;"
            v-model="value_month"
            type="month" format="yyyy-MM"
                          value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择月">
          </el-date-picker>
          <div @click="queryMonth" class="task_show_find"><img src="../../static/images/query.png" alt=""><span>查询</span></div>
        </div>
        <div class="task_show_center_month">
          <el-calendar v-model="value" style="height: 100%">
            <template
              slot="dateCell"
              slot-scope="{date, data}">
              <!--自定义内容-->
              <div>
                <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                <!--<div v-for="item in calendarData">
                  <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                    <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                      &lt;!&ndash;<el-tooltip class="item" effect="dark" :content="item.things" placement="right">
                        <div class="is-selected">{{item.things}}</div>
                      </el-tooltip>&ndash;&gt;
                      <div class="is-selected" :class="'aa'+item.aa">{{item.things}}</div>
                    </div>
                    <div v-else></div>
                  </div>
                  <div v-else></div>
                </div>-->
                <div v-for="(item, index) in monthArr.filter(function(res) {
                  return res.groupDate == data.day
                })">
                  <div v-if="index1<2" class="day_c" v-for="(item_day, index1) in item.list" :class="'c'+item_day.taskType">
                    {{item_day.taskName}}
                  </div>
                  <div v-if="item.count>2" class="day_c" style="color: #333333;text-align: center">另外{{item.count-2}}条</div>
                </div>


              </div>
            </template>

          </el-calendar>
        </div>
        <div style="background: #ecf6fa;padding: 5px">
          <span style="margin-right: 12px;">备注：</span>
          <span style="margin-right: 12px;color:rgb(60, 179, 113)">执行完成：绿色</span>
          <span style="margin-right: 12px;color: rgb(210, 105, 30);">中途终止：棕色</span>
          <span style="margin-right: 12px;color: rgb(0, 255, 255);">中途暂停：青色</span>
          <span style="margin-right: 12px;color: rgb(255, 69, 0);">正在执行：红色</span>
          <span style="margin-right: 12px;color: rgb(65, 105, 225);">等待执行：蓝色</span>
          <span style="margin-right: 12px;color: rgb(255, 215, 0);">超期：黄色</span>
          <span style="margin-right: 12px;color: rgb(218, 112, 214);">超时：紫色</span>
        </div>
      </div>
      <div class="task_show_wrap_right">
        <div style="display: flex;padding:10px 14px 4px">
          <p style="width: 90px;font-weight: 600;float: left">任务状态：</p>
          <div class="task_show_right_zhuangtai">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label='0' v-model="checked1">已执行</el-checkbox>
              <el-checkbox label='1' v-model="checked2">终止</el-checkbox>
              <el-checkbox label='2' v-model="checked3">暂停</el-checkbox>
              <el-checkbox label='3' v-model="checked4">正在执行</el-checkbox>
              <el-checkbox label='4' v-model="checked5">未执行</el-checkbox>
              <el-checkbox label='5' v-model="checked6">超期</el-checkbox>
              <el-checkbox label='6' v-model="checked7">超时</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div style="display: flex;align-items: center;padding:2px 14px 4px;overflow: hidden">
          <p style="width: 90px;font-weight: 600;float: left">开始时间：</p>
          <el-date-picker style="float: left"
            v-model="value_start" size="mini"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
          <p style="width: 90px;font-weight: 600;margin-left: 20px;float: left">结束时间：</p>
          <el-date-picker style="float: left"
            v-model="value_end" size="mini"
            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div style="display: flex;align-items: center;padding:2px 14px 14px;border-bottom:2px solid #90e8c6;overflow: hidden">
          <p style="width: 90px;font-weight: 600;float: left">任务名称：</p>
          <el-input v-model="input_task_name" size="mini" placeholder="请输入内容" style="float: left"></el-input>
        </div>
        <div>
          <ul>
            <li @click="queryStatus"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
            <li @click="addGoTaskMy"><img src="../../static/images/add.png" alt=""><span>添加</span></li>
            <li @click="delTaskPlan"><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
          </ul>
        </div>
        <div class="table_height" style="overflow-y: auto">
          <el-table
            :data="tableData" @selection-change="changeFun"
            border :cell-style="cellStyle"
            style="width: 100%"
            size="mini">
            <el-table-column
              prop="date" align="center"
              label="序号" :index="index" type="index"
              width="50">
            </el-table-column>
            <el-table-column type="selection" align="center"
              width="50">
            </el-table-column>
            <el-table-column
              prop="taskName" align="center"
              label="任务名称"
              >
            </el-table-column>
            <el-table-column
              prop="executTime" align="center"
              label="执行时间"
              width="200"
              >
            </el-table-column>
            <el-table-column
              prop="address" align="center"
              label="任务状态" :formatter="taskStatus"
              width="80"
              >
            </el-table-column>
            <el-table-column
              prop="address" align="center"
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-button @click="editTaskRight(scope.row)" type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page" style="position: absolute;bottom: 0;background: #f0f0f0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <menuBottom></menuBottom>
    <el-dialog title="请选择删除类型" :visible.sync="dialogVisible" class="del_user">
      <div class="dialog_content" style="height: 40px;font-weight: 600;font-size: 16px;line-height: 40px">
        <div style="text-align: center">
          <el-radio v-model="radio_zhou" label="1">当前</el-radio>
          <el-radio v-model="radio_zhou" label="2">周期</el-radio>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="atOnceDle">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import XunjianTopBox from '../components/xunjianTopBox.vue'
  import XunjianFindTool from '../components/xunjianFindTool.vue'
  import menuBottom from '../components/menuBottom.vue'
  export default {
    data(){
      return{
        title:'任务展示 > 任务展示',
        value_month:'',
        pickerOptions: {
          disabledDate: (time) => {
            //return this.dealDisabledDate(time);
          }
        },
        calendarData: [
          /*{ months: ['04', '11'],aa:1,days: ['15'],things: '看电影' },
          { months: ['04', '11'],aa:0, days: ['02'],things: '去公园野炊' },
          { months: ['04'],aa:1, days: ['02'],things: '看星星' },
          { months: ['04'],aa:2, days: ['02'],things: '看月亮' },*/

        ],

        value: new Date(),
        checkList:[],
        checked1:false,
        checked2:false,
        checked3:false,
        checked4:false,
        checked5:false,
        checked6:false,
        checked7:false,
        value_start:'',
        value_end:'',
        input_task_name:'',
        tableData: [],
        irBaseRobotId:1,
        monthArr:[],
        taskMonthData:{},
        taskRightData:{page:1,size:10},
        total:0,
        currentPage: 1,
        delTaskIdsArr:[],
        dialogVisible:false,
        radio_zhou:'1',
      }
    },
    mounted(){
      this.value_end = this.getdatatime();// 默认显示为当天时间
      this.value_start = this.convertToLateDate();
      this.taskRightData.startTime = this.value_start
      this.taskRightData.endTime = this.value_end
      this.getCurrMonth()
      this.getRightLi()
      let table_h = $('.task_show_wrap_right').height()-214
      $('.table_height').height(table_h +'px')
      window.onresize = ()=>{
          let table_h = $('.task_show_wrap_right').height()-214
          $('.table_height').height(table_h +'px')
      }

    },
    methods:{
    	getCurrMonth(){//GET /ui/task/month-show
        let _this = this
        _this.taskMonthData.irBaseRobotId = _this.irBaseRobotId
        _this.taskMonthData.executeTime = _this.value_month
        _this.ajax_api('get',url_api + '/task/month-show',_this.taskMonthData,true,function (res) {
          //console.log(res.data)
          if(res.code==200){
            _this.monthArr = res.data
          }else {
          	//console.log(res)
          }

        })
      },
      queryMonth(){
        let _this = this
        _this.value = _this.value_month
        _this.getCurrMonth()
      },

      getRightLi(){
        let _this = this
        _this.taskRightData.irBaseRobotId = _this.irBaseRobotId
        _this.ajax_api('get',url_api + '/task/execute-plan',
          _this.taskRightData,
          true,function (res) {
          //console.log(res.data)
          if(res.code==200){
            _this.tableData = res.data
          }else {
            console.log(res)
          }

        })
      },
      queryStatus(){
      	let _this = this
        if(_this.checkList.length<1){
          _this.taskRightData.taskStatus = '0,1,2,3,4,5,6'
        }else {
          _this.taskRightData.taskStatus = _this.checkList.toString()
        }
        _this.taskRightData.startTime = _this.value_start
        _this.taskRightData.endTime = _this.value_end
        _this.taskRightData.taskName = _this.input_task_name
        //console.log(_this.taskRightData)
        _this.getRightLi()
      },
      delTaskPlan(){
      	if(this.delTaskIdsArr.length<1){
          this.$message({
            message: '请选择',
          });
      		return
        }
        this.dialogVisible = true
      },
      atOnceDle(){
        let _this = this
        let deleteArr = []
        let a = _this.radio_zhou
        console.log(a)
        /*_this.ajax_api('post',url_api + '/task/delete-execute-plan',
          {deleteExecutePlanRequests:deleteArr},
          true, function (res) {
            if(res.code == 200){
              _this.$message({
                message: '删除成功',
                type: 'success',
              });

            }else {
              _this.$message({
                message: '操作失败，请重试',
              });
            }
          })*/
      },
      editTaskRight(){
        this.$router.push('/tasks/comprehensive-inspection')
      },
      addGoTaskMy(){
        this.$router.push('/tasks/custom-task')
      },
      changeFun(val){
        this.delTaskIdsArr = []
        for(var key in val){
          this.delTaskIdsArr.push(val[key].id)
        }
        //console.log(this.delTaskIdsArr)
      },

      //任务状态
      taskStatus(row){
      	/* //任务类型， 1历史、2定期、3周期、4间隔*/
      	/*0:已执行 1:终止 2:暂停 3:正在执行 4:未执行 5:超期 6:预执行*/
      	let result = ''
        switch (row.taskStatus){
          case 0:
            result = '已执行'
            break
          case 1:
            result = '终止'
            break
          case 2:
            result = '暂停'
            break
          case 3:
            result = '正在执行'
            break
          case 4:
            result = '未执行'
            break
          case 5:
            result = '超期'
            break
          case 6:
            result = '预执行'
            break
        }
        return result
      },
      cellStyle({row, column, rowIndex, columnIndex}){
      	//if(row.taskStatus==4 && columnIndex==4)
      	//return 'color: red'
        let result = ''
        if(columnIndex==4){
          switch (row.taskStatus){
            case 0:
              result = 'color: #3CB371'
              break
            case 1:
              result = 'color: #D2691E'
              break
            case 2:
              result = 'color: #00FFFF'
              break
            case 3:
              result = 'color: #FF4500'
              break
            case 4:
              result = 'color: #4169E1'
              break
            case 5:
              result = 'color: #FFD700'
              break
            case 6:
              result = 'color: #DA70D6'
              break
          }
        }
        return result
      },
    	//选择月
      dealDisabledDate(time) {
        var times = Date.now()
        return time.getTime() > times;
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
        var ss = Da.getSeconds();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        H = H < 10 ? "0" + H : H;
        ss = ss < 10 ? "0" + ss : ss;
        return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + ss;
        //return y + "-" + m + "-" + d
      },
      getdatatime(){ //默认显示今天
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
        ss = ss < 10 ? "0" + ss : ss;
        return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + ss;
        //return y + "-" + m + "-" + d
      },

      index(val){
      	return val
        //(listQuery.page - 1) * listQuery.pageSize + scope.$index + 1
        //return (this.taskData.page - 1)*this.taskData.size + val + 1
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
  .task_show_wrap
    height 100%
    .task_show_content
      height calc(100% - 90px)
      .task_show_wrap_left
        width 60%
        float left
        .task_show_top
          height 30px
          background #cae7ee\0
          background: linear-gradient(#e3f2ee,#cae7ee);
          border-top: 1px solid #cae7ee;
          padding-left: 5px;
          display flex
          align-items center
          .el-date-editor
            float left
            width 150px
            margin 0 20px
          .task_show_find
            float left
            display flex
            align-items center
            cursor pointer
            img
              width 16px
              height 16px
              margin-right 4px
        .task_show_center_month
          height calc(100% - 54px)
          min-height 570px
          overflow-y auto
          div>>>
            .el-calendar__body
              height calc(100% - 54px)
              box-sizing border-box
              .el-calendar-table
                height 100%
            .el-calendar__button-group
              display none
          .day_c
            white-space:nowrap
            overflow:hidden
            text-overflow:ellipsis
          .c0
            color #3CB371
          .c1
            color #D2691E
          .c2
            color #00FFFF
          .c3
            color #FF4500
          .c4
            color #4169E1
          .c5
            color #FFD700
          .c6
            color #DA70D6
      .task_show_wrap_right
        width 40%
        border 2px solid #90e8c6
        float left
        box-sizing border-box
        position relative
        .el-date-editor
          width 130px
        >div
          .task_show_right_zhuangtai
            width calc(100% - 90px)
          .el-checkbox
            margin-bottom 8px
          .el-input
            width 130px
          ul
            display flex
            padding 6px 14px
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

        .input_wrap
          display flex
          align-items center
          margin 15px 0
          p
            width 110px
            margin-right 10px
            text-align right
            font-size 14px
            font-weight 600
            display inline-block
          .el-switch
            display inline-block
          .must-mark
            color red
            font-size 18px
            margin-left 5px
            display inline-block
    div>>>.right_top
            .el-input
              width 220px
              .el-input__inner
                border 1px solid #cae7ee
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
            .el-input
              width 220px
              .el-input__inner
                border 1px solid #cae7ee
            .el-dialog__title
              display inline-block
              position absolute
              font-size 14px
              top 4px
              left 10px
    .del_user /deep/ .el-dialog
      background #d7efec
      width: 20%;
      min-width: 180px;
      padding-bottom: 6px;
</style>

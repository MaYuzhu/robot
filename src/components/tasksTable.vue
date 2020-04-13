<template>
	<div class="tasks_table_wrap">
    <p class="title">任务编制列表</p>
    <el-table class="table"
      :data="tableData" @current-change="taskCurrentChange"
      border highlight-current-row @row-dblclick="editTaskTable"
      style="width: 100%">
      <el-table-column
        type="index" :index="index"
        label="序号" align="center"
        width="50">
      </el-table-column>
      <!--<el-table-column
        type="selection"
        align="center"
        width="50">
      </el-table-column>-->
      <el-table-column
        prop="name" align="center"
        label="任务名称">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="编制时间" align="center"
        width="320">
      </el-table-column>
      <el-table-column
        label="操作" align="center"
        width="260">
        <template slot-scope="scope" v-if="templateShow">
          <el-button @click="handleClickGo(scope.row)" type="text" size="small">立即执行</el-button>
          <el-button @click="fixDate(scope.row)" type="text" size="small">定期执行</el-button>
          <el-button @click="cycleDate(scope.row)" type="text" size="small">周期执行</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--立即执行-->
    <el-dialog title="确认" :visible.sync="dialogVisible" class="del_user">
      <div class="dialog_content" style="height: 60px;font-weight: 600;font-size: 16px;line-height: 40px">
        是否立即执行？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="atOnce">确 认</el-button>
      </span>
    </el-dialog>
    <!--定期执行-->
    <el-dialog title="定期任务配置" :visible.sync="dialogVisibleFix" class="">
      <div class="dialog_content">
        <div class="add">
          <p @click="addFixTime">
            <img src="../../static/images/add.png" alt="">
            <span>新增</span>
          </p>
          <p @click="addSaveFixTime">
            <img src="../../static/images/save.png" alt="">
            <span>保存</span>
          </p>
        </div>
        <el-table class="table_fix"
                  :data="tableDataFix"
                  border
                  style="width: 100%">
          <el-table-column
            type="index"
            label="序号" align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="time" label="开始时间"
            align="center">
            <template slot-scope="scope">
              <el-date-picker size="mini" style="width: 300px"
                v-model="scope.row.createTime"
                type="datetime" format="yyyy 年 MM 月 dd 日 HH时 mm分 ss秒"
                              value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            label="操作" align="center"
            width="160">
            <template slot-scope="scope">
              <el-button @click="delFixTime(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <span slot="footer" class="dialog-footer" style="display: none">
        <el-button @click="dialogVisibleFix = false">取 消</el-button>
        <el-button type="primary" @click="">确 认</el-button>
      </span>
    </el-dialog>
    <!--周期执行-->
    <el-dialog title="任务操作配置" :visible.sync="dialogVisibleCycle" class="">
      <div class="dialog_content">
        <el-tabs class="tab" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="可用周期" name="first">
            <div class="cycle" style="padding:0 8px">
              <div class="cycle_top">
                <p style="background: #d7efec;padding: 4px"><el-radio v-model="radio" label="1">周期</el-radio></p>
                <p class="cycle_top_p">
                  <span>月：</span>
                  <el-checkbox-group v-model="checkMonth" style="display: inline-block">
                    <el-checkbox v-for="(item,index) in month" :key="index" :label="item.num">
                    {{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </p>
                <p class="cycle_top_p">
                  <span>周：</span>
                  <el-checkbox-group v-model="checkWeek" style="display: inline-block">
                    <el-checkbox v-for="(item,index) in week" :key="index" :label="item.num">
                      {{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </p>
                <p class="cycle_top_p">
                  <span>开始时间：</span>
                  <el-time-picker size="mini"
                    v-model="value_time1" format="HH时 mm分 ss秒"
                                  value-format="HH:mm:ss"
                    placeholder="">
                  </el-time-picker>
                </p>
                <p style="background: #d7efec;padding: 4px">
                  <el-radio v-model="radio" label="2">间隔</el-radio>
                </p>
                <p class="cycle_top_p">
                  <el-input-number v-model="num" controls-position="right" size="mini"
                         @change="handleChangeNum" :min="1"></el-input-number>
                  <el-select v-model="cycle_day" style="width: 90px" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in options_cycle_day"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </p>
                <p class="cycle_top_p">
                  <span>开始时间：</span>
                  <el-date-picker size="mini"
                    v-model="value_time2" format="yyyy-MM-dd HH:mm:ss"
                    type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </p>
                <p class="cycle_top_p">
                  <span>结束时间：</span>
                  <el-date-picker size="mini"
                    v-model="value_time3" format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"  value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </p>

              </div>
              <div class="cycle_bottom">
                <div class="add" style="height:20px;background:#e9e9e9;padding:2px 8px">
                  <p @click="clearInput">
                    <img src="../../static/images/reset_a.png" alt="">
                    <span>清空</span>
                  </p>
                  <p @click="saveCycle">
                    <img src="../../static/images/save.png" alt="">
                    <span>保存</span>
                  </p>
                  <p @click="poolCycle">
                    <img src="../../static/images/query.png" alt="">
                    <span>汇总</span>
                  </p>
                </div>
                <el-table class="table_cycle"
                          :data="tableDataCycle"
                          border
                          style="width: 100%;max-height:247px;overflow-y: auto;border-bottom: none">
                  <el-table-column
                    type="index"
                    label="序号" align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="name" label="名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="startTime" label="开始时间"
                    align="center" width="220">
                  </el-table-column>
                  <el-table-column
                    prop="endTime" label="结束时间"
                    align="center" width="220">
                  </el-table-column>
                  <el-table-column
                    label="操作" align="center"
                    width="60">
                    <template slot-scope="scope">
                      <el-button @click="delCycleTime(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="禁用周期" name="second">
            <div style="padding:0 8px">

            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer" style="display: none">
        <el-button @click="dialogVisibleFix = false">取 消</el-button>
        <el-button type="primary" @click="">确 认</el-button>
      </span>

    </el-dialog>
    <!--任务汇总-->
    <el-dialog title="任务执行汇总" :visible.sync="dialogVisibleHuizong" class="huizong_dialog">
      <div class="dialog_content">
        <div>
          <span>开始时间：</span>
          <el-date-picker size="mini" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="value_time_huizong1" type="datetime"
                          placeholder="">
          </el-date-picker>
          <span>结束时间：</span>
          <el-date-picker size="mini" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="value_time_huizong2"  type="datetime"
                          placeholder="">
          </el-date-picker>
          <p @click="queryHuizong" style="display:inline-block;cursor:pointer;">
            <img style="width: 16px;height: 16px;vertical-align: middle" src="../../static/images/query.png" alt="">
            <span style="vertical-align: middle">查询</span>
          </p>

        </div>
        <div style="margin-top: 10px" class="huizong_table">
          <el-table stripe
                    :data="tableDataHuizong"
                    border
                    style="width: 100%">
            <el-table-column
              prop="executTime" label="执行时间"
              align="center">
            </el-table-column>

          </el-table>
        </div>
      </div>
    </el-dialog>

	</div>
</template>

<script>

  export default {

    data() {
      return {
        tableData: [],
        tableDataFix:[
          /*{
          	id:0,
          	time:'2020-09-01 00:00:00'
          }*/
        ],
        tableDataCycle:[
          /*{
          	id:0,
            time_name:'每天',
            time_s:'12:55',
            time_e:'18:00',
          }*/
        ],
        tableDataHuizong:[{time:'2020-01-01 12:00:00'},{time:'2020-01-01 12:00:00'},{time:'2020-01-01 12:00:00'}],
        currentPage: 1,
        total:0,
        taskData : {
          size:10,
          page:1,
        },
        dialogVisible: false,
        dialogVisibleFix: false,
        dialogVisibleCycle: false,
        addFixIdNum:0,
        activeName: 'first',
        radio:'1',
        checkMonth:[],
        checkWeek:[],
        month:[
        	{num:1,name:'一月'},
          {num:2,name:'二月'},
          {num:3,name:'三月'},
          {num:4,name:'四月'},
          {num:5,name:'五月'},
          {num:6,name:'六月'},
          {num:7,name:'七月'},
          {num:8,name:'八月'},
          {num:9,name:'九月'},
          {num:10,name:'十月'},
          {num:11,name:'十一月'},
          {num:12,name:'十二月'},
        ],
        week:[
          {num:2,name:'周一'},
          {num:3,name:'周二'},
          {num:4,name:'周三'},
          {num:5,name:'周四'},
          {num:6,name:'周五'},
          {num:7,name:'周六'},
          {num:1,name:'周日'},
        ],
        value_time1:'',
        value_time2:'',
        value_time3:'',
        num:1,
        options_cycle_day: [
        	{
            value: '2',
            label: '天'
          }, {
            value: '1',
            label: '时'
          }, {
            value: '0',
            label: '分钟'
          }
        ],
        cycle_day:'2',
        addCycleIdNum:0,
        dialogVisibleHuizong:false,
        value_time_huizong1:'',
        value_time_huizong2:'',
        irProjTaskId:'',
        templateShow:true,
      }
    },

    //props:["irBaseRobotId", "irBaseInspectTypeId"],
    props:{
      irBaseRobotId:{
        required: false
      },
      irBaseInspectTypeId:{
        required: false
      },
      customTaskTable:{
        type: null,
        default: ()=>{ return []}
      }

    },
    mounted(){
      this.getTableData()
      this.value_time2 = this.getdatatime()
      this.value_time_huizong1 = this.getdatatime()
      this.value_time_huizong2 = this.getdatatime10()
    },

    methods: {

    	getTableData(){
        let _this = this
        _this.tableData = [{name:'数据加载中'}]
        _this.taskData.irBaseRobotId = _this.irBaseRobotId
        _this.taskData.irBaseInspectTypeId = _this.irBaseInspectTypeId
        //console.log(_this.customTaskTable)
        if(_this.customTaskTable.length>0){
          _this.tableData = _this.customTaskTable
          _this.templateShow = false
          return
        }
        _this.ajax_api('get',url_api + '/task/taskList',_this.taskData,true,function (res) {
          //console.log(res.data.items)
          _this.total = res.data.total
          _this.tableData = res.data.items
        })

      },

      handleClickGo(row) {
        //console.log(row);
        this.dialogVisible = true
      },
      //定期执行
      fixDate(row){
    		let _this = this
        _this.irProjTaskId = row.id
        _this.dialogVisibleFix = true
        _this.ajax_api('get',url_api + '/task-regular/taskRegularList',
        {
          page:1,
          size:100,
          irBaseRobotId:1,
          irProjTaskId:row.id
        },
        true,
        function (res) {
          //console.log(res.data)
          _this.tableDataFix = res.data.items

        })

      },
      //周期执行
      cycleDate(row){
        let _this = this
        _this.checkMonth = []
        _this.checkWeek = []
        _this.value_time1 = ''
        _this.irProjTaskId = row.id
        _this.dialogVisibleCycle = true
        _this.ajax_api('get',url_api + '/task-cycle/taskCycleList',
          {
            page:1,
            size:100,
            irBaseRobotId:1,
            irProjTaskId:row.id
          },
          true,
          function (res) {
            //console.log(res.data)
            _this.tableDataCycle = res.data.items

          })

      },

      //增加定期执行时间表
      addFixTime(){
      	let _this = this
        _this.addFixIdNum++
        _this.tableDataFix.push({
          id:_this.addFixIdNum+'my',
          createTime:''
        })
      },
      //保存定期执行时间表
      addSaveFixTime(){
        let _this = this
        let addSaveFixTimeData = {
          irBaseRobotId:1,
          irProjTaskId:_this.irProjTaskId,
          taskRegularRequests:[]
        }
        for(var item in _this.tableDataFix){
          addSaveFixTimeData.taskRegularRequests.push({
            executeTime:_this.getTimeMy(_this.tableDataFix[item].createTime)
          })
        }
        //console.log(addSaveFixTimeData)
        _this.ajax_api('put',url_api + '/task-regular/batch',
          addSaveFixTimeData,true,function (res) {
          //console.log(res.data.items)
          if(res.code==200){
            _this.$message({
              message: '新增成功',
              type: 'success',
            });
          }
        })

      },

      delFixTime(x){
        let _this = this
        //console.log(x)
        _this.tableDataFix = _this.tableDataFix.filter(item => {
        	return item.id != x.id
        })
      },
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      handleChangeNum(value) {
        //console.log(value);
      },
      clearInput(){
        this.value_time1 = ''
        this.value_time2 = ''
        this.value_time3 = ''
        this.checkMonth = []
        this.checkWeek = []
        this.num = 1
        this.cycle_day = '2'
      },
      saveCycle(){
      	let _this = this
      	/*this.addCycleIdNum++
      	this.tableDataCycle.push({
          id:this.addCycleIdNum++,
          name:'每天',
          startTime:'12:55',
          endTime:'18:00',
        })*/
        /*
        * {
         "endTime": "2020-04-09T01:40:54.917Z",
         "executeTime": "string",
         "executeType": "string",
         "intervalTime": 0,
         "intervalUnit": "string",
         "irBaseRobotId": 0,
         "irProjTaskId": 0,
         "month": "string",
         "name": "string",
         "startTime": "2020-04-09T01:40:54.917Z",
         "week": "string"
         }*/
        /*
        * ProjTaskCycleRequest {
         endTime (string, optional): 结束时间 ,
         executeTime (string, optional): 执行时间 ,
         executeType (string, optional): 执行类型，0：周期执行，1：间隔执行 ,
         intervalTime (integer, optional): 间隔时间 ,
         intervalUnit (string, optional): 间隔单位，0：分，1：时，2：天 ,
         irBaseRobotId (integer, optional): 机器人编号 ,
         irProjTaskId (integer, optional): 任务编号 ,
         month (string, optional): 月， 多个以逗号隔开 ,
         name (string, optional): 任务周期/间隔名称 ,
         startTime (string, optional): 开始时间 ,
         week (string, optional): 周， 多个以逗号隔开
         }*/
        let addSaveCycleData = {}
        if(_this.radio == 1){
          addSaveCycleData.irBaseRobotId = 1
          addSaveCycleData.irProjTaskId = _this.irProjTaskId
          addSaveCycleData.executeType = '0'
          addSaveCycleData.month = _this.checkMonth.length>0 ? _this.checkMonth.toString() : '1,2,3,4,5,6,7,8,9,10,11,12'
          addSaveCycleData.week =  _this.checkWeek.length>0 ? _this.checkWeek.toString() : '1,2,3,4,5,6,7'
          addSaveCycleData.executeTime = _this.value_time1 ? _this.value_time1 : '00:00:00'
          addSaveCycleData.name = '任务周期'
        }else if(_this.radio == 2){
          addSaveCycleData.irBaseRobotId = 1
          addSaveCycleData.irProjTaskId = _this.irProjTaskId
          addSaveCycleData.executeType = '1'
          addSaveCycleData.intervalUnit = _this.cycle_day
          addSaveCycleData.intervalTime = _this.num
          addSaveCycleData.startTime = _this.value_time2
          addSaveCycleData.endTime = _this.value_time3
          addSaveCycleData.name = '间隔任务'
        }
        //console.log(addSaveCycleData)//POST /ui/task-cycle/addTaskCycle
        _this.ajax_api('post',url_api + '/task-cycle/addTaskCycle',
          addSaveCycleData,true,function (res) {
            //console.log(res.data.items)
            if(res.code==200){
              _this.$message({
                message: '新增成功',
                type: 'success',
              });
              _this.cycleDate({id:_this.irProjTaskId})
            }
          })


      },
      delCycleTime(x){
        let _this = this
        //console.log(x.id)//DELETE /ui/task-cycle/delTaskCycle/{id}
        /*_this.tableDataCycle = _this.tableDataCycle.filter(item => {
          return item.id != x.id
        })*/
        _this.$confirm('是否删除?', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.ajax_api('delete',url_api + '/task-cycle/delTaskCycle/' + x.id,
            null,true,function (res) {
              //console.log(res.data.items)
              if(res.code==200){
                _this.$message({
                  message: '删除成功',
                  type: 'success',
                });
                _this.cycleDate({id:_this.irProjTaskId})
              }
            })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      poolCycle(){
      	let _this = this
        _this.dialogVisibleHuizong = true
        let taskExecutePlanData = {
          irBaseRobotId:_this.irBaseRobotId,
          startTime:_this.value_time_huizong1,
          endTime:_this.value_time_huizong2
        }
        _this.ajax_api('get',url_api + '/task/execute-plan',
          taskExecutePlanData,
          true, function (res) {
            if(res.code == 200){
              _this.tableDataHuizong = res.data
            }
          })

      },
      queryHuizong(){
        let _this = this
        let taskExecutePlanData = {
          irBaseRobotId:_this.irBaseRobotId,
          startTime:_this.value_time_huizong1,
          endTime:_this.value_time_huizong2
        }
        _this.ajax_api('get',url_api + '/task/execute-plan',
          taskExecutePlanData,
          true, function (res) {
            if(res.code == 200){
              _this.tableDataHuizong = res.data
            }
          })
      },

      taskCurrentChange(row){
      	//console.log(row.id)
        this.$root.eventHub.$emit('currentChange', row.id);
      },
      editTaskTable(row){
        //console.log(row.id)
        let _this = this  //GET /ui/task/{id}/editStatus
        _this.ajax_api('get',url_api + '/task/'+ row.id +'/editStatus',{},true,function (res) {
          //console.log(res.data)
          if(!res.data.editStatus){
            _this.$message({
              message: '该任务不可编辑',
            });
            return
          }
          _this.$root.eventHub.$emit('editTaskDbl', row.id);
        })

      },

      index(val){
        //(listQuery.page - 1) * listQuery.pageSize + scope.$index + 1
        return (this.taskData.page - 1)*this.taskData.size + val + 1
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

      //立即执行
      atOnce(){
      	let _this = this
        _this.dialogVisible = false
      },

      //时间格式转换
      getTimeMy(time){
        //var time="2018-05-19T08:04:52.000+0000";
        var d = new Date(time);

        var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return times
        //输出 2018-05-19 15:59:10
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
        return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + ss;
        //return y + "-" + m + "-" + d
      },
      getdatatime10(){
        var Da = new Date();
        Da = new Date(Da.getTime() + 24 * 60 * 60 * 1000 * 10);
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
        return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + ss;
      },

    },

    computed: {

    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .tasks_table_wrap
    width 100%
    height 100%
    position relative
    .title
      height 30px
      line-height 30px
      padding-left 10px
      background background #ddece8
      background linear-gradient(#e3f2ee,#cae7ee)
    .table /deep/.el-table td
      padding 0
    .page
      position absolute
      bottom 0px
    div>>>
      .el-dialog
        background #d7efec
        width: 68%;
        min-width: 800px;
        padding-bottom: 6px;
    .dialog_content
      background white
      padding 10px 20px
      border 1px solid #90e8c6
      .add
        font-size 14px
        p
          float left
          height 18px
          line-height 18px
          margin-right 18px
          margin-bottom 8px
          cursor pointer
          img
            width 16px
            height 16px
            vertical-align: middle;
          span
            vertical-align: middle;
      .table_fix
        max-height 500px
        overflow-y auto
      .table_fix /deep/.el-table td
        padding 0
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
      .tab /deep/
        .el-tabs__header
          background: linear-gradient(#e3f2ee,#cae7ee)
          .el-tabs__item
            height: 30px;
            margin: 0 3px;
            line-height: 30px;
            border: 1px solid #ccc;
            border-bottom: none;
            border-radius: 4px 4px 0 0;
            color #000000
          .is-active
            color: #109cb4;
            border: 1px solid #109cb4;
            border-bottom: none;
            background white
        .cycle
          .cycle_top
            border 1px solid #3d8fff
            /deep/.el-input
              width auto
            .cycle_top_p
              margin 12px 0
              padding-left 25px
          .cycle_bottom
            margin-top 5px
            border 1px solid #a0fbd9
            /deep/.el-table td
              padding 0
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
    .huizong_dialog /deep/ .el-dialog
      background #d7efec
      width: 68%;
      min-width: 800px;
      padding-bottom: 6px;
    .huizong_table /deep/ .el-table td
      padding 4px 0

</style>

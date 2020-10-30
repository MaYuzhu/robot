<template>
	<div class="tasks_table_wrap">
    <p class="title">任务编制列表</p>
    <el-table class="table"
      :data="tableData" @current-change="taskCurrentChange" @select="selectChange"
      border highlight-current-row @row-dblclick="editTaskTable" @select-all="selectChangeAll"
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
                v-model="scope.row.executeTime"
                type="datetime" format="yyyy-MM-dd HH:mm:ss"
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
                    placeholder="159">
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
                    prop="" label="开始时间"
                    align="center" width="220">
                    <template slot-scope="scope">
                      <span>{{scope.row.startTime || scope.row.executeTime}}</span>
                    </template>
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
            value: '0',
            label: '分钟'
          },
          {
            value: '1',
            label: '小时'
          },
          {
            value: '2',
            label: '天'
          },
        ],
        cycle_day:'2',
        addCycleIdNum:0,
        dialogVisibleHuizong:false,
        value_time_huizong1:'',
        value_time_huizong2:'',
        irProjTaskId:'',
        templateShow:true,
        url: robotUrl,
        taskServer: null,
        taskServerClear:null,
        ros:null,
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
      let _this = this
      _this.ros = new ROSLIB.Ros({
        url : _this.url
      });
      _this.ros.on('connection', function() {
        console.log('任务ros.');
      });
      _this.ros.on('close', function() {
        console.log('任务ros closed.');
      });

      _this.getTableData()
      _this.value_time2 = _this.getdatatime()
      _this.value_time3 = _this.getdatatime10()
      _this.value_time_huizong1 = _this.getdatatime()
      _this.value_time_huizong2 = _this.getdatatime10()
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

      //复选删除
      selectChange(selection,row){
    	  let _this = this
        console.log(selection)
        let arrSelection = []
        for(let i=0;i<selection.length;i++){
          arrSelection.push(selection[i].id)
        }
        _this.$root.eventHub.$emit('currentChange', arrSelection.toString());
      },
      selectChangeAll(selection){
        let _this = this
        console.log(selection)
        //_this.$root.eventHub.$emit('currentChange', row.id);
      },

      handleClickGo(row) {
        let _this = this
        //console.log(row);
        _this.dialogVisible = true
        _this.irProjTaskId = row.id
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
        _this.value_time1 = _this.getdatatimehh()
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
          executeTime:''
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
            //executeTime:_this.getTimeMy(_this.tableDataFix[item].createTime)
            executeTime:_this.tableDataFix[item].executeTime
          })
        }
        //console.log(addSaveFixTimeData)
        _this.ajax_api('put',url_api + '/task-regular/batch',
          addSaveFixTimeData,true,function (res) {
          //console.log(res)
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
          //addSaveCycleData.name = '任务周期'
          let week_name = []
          for(let i=0;i<_this.checkWeek.length;i++){
            switch (_this.checkWeek[i]) {
              case 2:
                week_name.push('一')
                break
              case 3:
                week_name.push('二')
                break
              case 4:
                week_name.push('三')
                break
              case 5:
                week_name.push('四')
                break
              case 6:
                week_name.push('五')
                break
              case 7:
                week_name.push('六')
                break
              case 1:
                week_name.push('日')
                break
            }
          }
          //console.log(week_name)
          addSaveCycleData.name = '每年'+_this.checkMonth.toString()+'月,'+'每周'+week_name.toString()+','+
            addSaveCycleData.executeTime+',执行一次'
          if(!addSaveCycleData.executeTime){
            _this.$message({
              message: '请选择时间',
            });
            return
          }
        }else if(_this.radio == 2){
          addSaveCycleData.irBaseRobotId = 1
          addSaveCycleData.irProjTaskId = _this.irProjTaskId
          addSaveCycleData.executeType = '1'
          addSaveCycleData.intervalUnit = _this.cycle_day
          addSaveCycleData.intervalTime = _this.num
          addSaveCycleData.startTime = _this.value_time2
          addSaveCycleData.endTime = _this.value_time3
          //addSaveCycleData.name = '间隔任务'
          addSaveCycleData.name = '每隔 ' + _this.num + _this.options_cycle_day[_this.cycle_day].label + ' 执行一次'
          if(!addSaveCycleData.startTime || !addSaveCycleData.endTime){
            _this.$message({
              message: '请选择时间',
            });
            return
          }
        }
        //console.log(addSaveCycleData)  //POST /ui/task-cycle/addTaskCycle

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
          /*if(!res.data.editStatus){
            _this.$message({
              message: '该任务不可编辑',
            });
            return
          }*/
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
        /*_this.$root.eventHub.$emit('taskSuccess', '1111');
        _this.$router.push({path:'/robots/robot-management'})*/
        /*var linePlan = {
            "InspectId":"1",
            "Tasks":[
                {
                    "Align":"middle",
                    "IsAnterograde":false,
                    "Status":"0",
                    "TLoc":"0.386;6.807;-1.854",
                    "TLocType":"start",
                    "TLocWidth":5,
                    "TurnAngle":0
                },
                {
                    "Align":"middle",
                    "CameraPose":"2:1/0.649,-3.534,9.054,50.0,50.0,1,4,down,0.0,0.0,0.0,0.0,0,0.0/1/783",
                    "Id":"1002",
                    "IsAnterograde":false,
                    "Status":"0",
                    "TLoc":"0.386;7.457;-1.854",
                    "TLocType":"transfer",
                    "TLocWidth":5,
                    "TurnAngle":0
                },
                {
                    "Align":"middle",
                    "Id":"4",
                    "IsAnterograde":false,
                    "Status":"0",
                    "TLoc":"-0.424;6.806;-1.691",
                    "TLocType":"end",
                    "TLocWidth":5,
                    "TurnAngle":92
                }
            ]
        }
        var linePlanStr = JSON.stringify(linePlan)
        var linePlanObj = JSON.parse(linePlanStr)
        var lineArr = []
        if(lineArr.length>0){
          lineArr = []
        }
        for(var i=0;i<linePlanObj.Tasks.length;i++){
            var pointArr = linePlanObj.Tasks[i].TLoc.split(";")
            var point = [pointArr[0],pointArr[1]]
            lineArr.push(point)
        }
        _this.$root.eventHub.$emit('planLine', lineArr);*/
        //  /ui/task/{id}/execute
        // 查看可否执行  /ui/task/{id}/execut-status
        console.log(this.irProjTaskId)
        /*_this.ajax_api('get',url_api + '/task/'+ _this.irProjTaskId+'/execut-status',
            null,true,function (res) {
                //console.log(res)
            })*/
        _this.ajax_api('post',url_api + '/task/'+ _this.irProjTaskId+'/execute',
            {
                "cumulativeRunTime": 0,
                "hum": 0,
                "irBaseRobotId": _this.irBaseRobotId,
                "irProjTaskId": _this.irProjTaskId,
                "taskEndTime": _this.getdatatime10(),
                "taskStartTime": _this.getdatatime(),
                "taskStatus": "1",
                "wind": 0
            },true,function (resData) {
                //console.log(resData)
                _this.ajax_api('get',url_api + '/task/'+ _this.irProjTaskId +'/path',
                    {},true,function (res) {
                        console.log(res)
                        //console.log(res.data.path)
                        //取到计划线路的点
                        if(!res.data.path){
                          _this.$message({
                            message: '未获取到有效路径',
                          });
                          return
                        }else {
                          /*_this.$message({
                            type: 'success',
                            message: '任务发送成功',
                          });
                          _this.$root.eventHub.$emit('taskSuccess', '1111');*/
                        }

                        _this.taskServer = new ROSLIB.Service({
                            ros : _this.ros,
                            name : '/tasklist',
                            serviceType : 'robotmsg/TaskList'
                        });
                        _this.taskServerClear = new ROSLIB.Service({
                            ros : _this.ros,
                            name : '/taskclear',
                            serviceType : 'robotmsg/TaskList'
                        });
                        _this.taskServerClear.callService({flag:0},function(result) {
                            console.log('Clear');
                            if(result){
                              var request = new ROSLIB.ServiceRequest({
                                plan : res.data.path,
                                //plan : JSON.stringify(aa),
                              });
                              console.log(res.data.path);
                              _this.taskServer.callService(request, function(result) {
                                //console.log('返回'+result);
                                if(result){
                                  _this.$message({
                                    type: 'success',
                                    message: '任务发送成功',
                                  });
                                  _this.$root.eventHub.$emit('taskSuccess', '1111');
                                  _this.$router.push({path:'/'})
                                }
                              });
                            }else {
                              _this.taskServerClear.callService({flag:0},function(result) {
                                if(result){
                                  var request = new ROSLIB.ServiceRequest({
                                    plan : res.data.path,
                                    //plan : JSON.stringify(aa),
                                  });
                                  _this.taskServer.callService(request, function(result) {
                                    console.log(result);
                                    _this.$message({
                                      type: 'success',
                                      message: '任务发送成功',
                                    });
                                    _this.$root.eventHub.$emit('taskSuccess', '1111');
                                  });
                                }else{
                                  _this.$message({
                                    type: 'success',
                                    message: '任务发送失败',
                                  });
                                }
                              })
                            }
                        });
                        //地图显示路径 start
                        var linePlanObj = JSON.parse(res.data.path)
                        //三楼var aa = '{"InspectId":"1041","Tasks":[{"Align":"middle","IsAnterograde":false,"Status":"0","TLoc":"27.0;24.181;9.928","TLocType":"start","TLocWidth":5},{"Align":"middle","Id":"23","IsAnterograde":false,"Status":"0","TLoc":"25.25;24.18;9.77","TLocType":"back","TLocWidth":5,"TurnAngle":"180"},{"Align":"middle","Id":"22","IsAnterograde":false,"Status":"0","TLoc":"25.15;24.18;9.76","TLocType":"turn","TLocWidth":5,"TurnAngle":"95"},{"Align":"middle","Id":"21","IsAnterograde":false,"Status":"0","TLoc":"25.12;24.15;13.15","TLocType":"turn","TLocWidth":5,"TurnAngle":"-93"},{"Align":"middle","CameraPose":"23:1/10.339,17.74,25.558,60.0,60.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.0/1/1041;24:1/10.578,17.738,25.522,150.0,150.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.8/1/1041;25:1/10.757,17.768,25.543,100.0,100.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.73/1/1041;32:1/10.295,17.707,25.167,150.0,150.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.0/1/1041;33:1/10.54,17.749,25.2,100.0,100.0,1,7,down,-0.1,330.0,-0.1,0.9,0,2.4/1/1041;34:1/10.74,17.771,25.189,60.0,60.0,1,7,down,-0.1,330.0,-0.1,0.9,0,2.1/1/1041;41:1/10.22,17.705,24.818,100.0,100.0,1,8,down,-0.1,330.0,-0.1,3.0,0,0.0/1/1041;42:1/10.468,17.74,24.847,60.0,60.0,1,7,down,-0.1,330.0,-0.1,0.9,0,1.42/1/1041;43:1/10.695,17.752,24.795,150.0,150.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.58/1/1041","Id":"1015","IsAnterograde":false,"Status":"0","TLoc":"11.066;24.356;11.859","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"20:1/9.601,17.636,25.517,150.0,150.0,1,7,down,-0.1,330.0,-0.1,0.9,0,3.5/1/1041;21:1/9.852,17.685,25.528,60.0,60.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.0/1/1041;22:1/10.14,17.696,25.487,100.0,100.0,2,3,down,-0.1,330.0,-0.1,0.9,0,0.0/1/1041;29:1/9.494,17.626,25.167,150.0,150.0,1,7,down,-0.1,330.0,-0.1,0.9,0,1.58/1/1041;30:1/9.783,17.673,25.186,150.0,150.0,1,8,down,-0.1,330.0,-0.1,3.0,0,0.0/1/1041;31:1/10.023,17.704,25.177,60.0,60.0,1,7,down,-0.1,330.0,-0.1,0.9,0,2.35/1/1041;38:1/9.418,17.626,24.846,100.0,100.0,1,7,down,-0.1,330.0,-0.1,0.9,0,1.03/1/1041;39:1/9.693,17.654,24.823,150.0,150.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.295/1/1041;40:1/9.932,17.675,24.795,100.0,100.0,2,3,down,-0.1,330.0,-0.1,0.9,0,0.0/1/1041","Id":"1014","IsAnterograde":false,"Status":"0","TLoc":"10.26;24.359;11.775","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"17:1/8.975,17.587,25.474,150.0,150.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.124/1/1041;18:1/9.146,17.612,25.538,60.0,60.0,1,7,down,-0.1,330.0,-0.1,0.9,0,17.9/1/1041;19:1/9.335,17.622,25.505,150.0,150.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.0/1/1041;26:1/8.955,17.594,25.199,60.0,60.0,1,7,down,-0.1,330.0,-0.1,0.9,0,1.89/1/1041;27:1/9.096,17.611,25.182,60.0,60.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.0/1/1041;28:1/9.281,17.62,25.217,100.0,100.0,1,7,down,-0.1,330.0,-0.1,0.9,0,1.35/1/1041;35:1/8.939,17.576,24.857,100.0,100.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.58/1/1041;36:1/9.047,17.6,24.846,60.0,60.0,1,7,down,-0.1,330.0,-0.1,0.9,0,1.5/1/1041;37:1/9.178,17.61,24.836,100.0,100.0,1,7,down,-0.1,330.0,-0.1,0.9,0,0.3/1/1041","Id":"1013","IsAnterograde":false,"Status":"0","TLoc":"9.656;24.361;11.712","TLocType":"transfer","TLocWidth":5},{"Align":"middle","Id":"2","IsAnterograde":false,"Status":"0","TLoc":"8.85;23.714;11.628","TLocType":"turn","TLocWidth":5,"TurnAngle":"180"},{"Align":"middle","Id":"21","IsAnterograde":false,"Status":"0","TLoc":"25.12;24.15;13.15","TLocType":"turn","TLocWidth":5,"TurnAngle":"93"},{"Align":"middle","Id":"22","IsAnterograde":false,"Status":"0","TLoc":"25.15;24.18;9.76","TLocType":"turn","TLocWidth":5,"TurnAngle":"-95"},{"Align":"middle","IsAnterograde":false,"Status":"0","TLoc":"25.25;24.18;9.77","TLocType":"end","TLocWidth":5}]}'
                        //var linePlanObj = JSON.parse(aa)
                        //console.log(linePlanObj)
                        var lineArr = []
                        if(lineArr.length>0){
                          lineArr = []
                        }
                        for(var i=0;i<linePlanObj.Tasks.length;i++){
                          /*if(linePlanObj.Tasks[i].CameraPose){
                            return;
                          }*/
                          var pointArr = linePlanObj.Tasks[i].TLoc.split(";")
                          var point = projRobotXY(pointArr[0]*1,pointArr[2]*1)
                          lineArr.push(point)
                        }
                        planLinePointArr = lineArr
                        console.log(planLinePointArr)
                        sessionStorage.setItem("planLine",lineArr);
                        //地图显示路径 end
                    })
            })

          /*_this.ajax_api('get',url_api + '/task/'+ _this.irProjTaskId +'/path',
              {},true,function (res) {
                  console.log(res.data.path)
                  //取到计划线路的点
                  if(!res.data.path){
                      //console.log(res.data.path)
                      return
                  }
                  var linePlanObj = JSON.parse(res.data.path)
                  var lineArr = []
                  if(lineArr.length>0){
                      lineArr = []
                  }
                  for(var i=0;i<linePlanObj.Tasks.length;i++){
                      var pointArr = linePlanObj.Tasks[i].TLoc.split(";")
                      var point = [pointArr[0]*1,pointArr[2]*1]
                      lineArr.push(point)
                  }
                  planLinePointArr = lineArr

                  _this.taskServer = new ROSLIB.Service({
                      ros : _this.ros,
                      name : '/tasklist',
                      serviceType : 'robotmsg/TaskList'
                  });
                  _this.taskServerClear = new ROSLIB.Service({
                      ros : _this.ros,
                      name : '/taskclear',
                      serviceType : 'robotmsg/TaskList'
                  });
                  _this.taskServerClear.callService({flag:0},function(result) {
                      console.log('new plan before Clear');
                      var request = new ROSLIB.ServiceRequest({
                          plan : res.data.path,
                          //plan : JSON.stringify(aa),
                      });

                      _this.taskServer.callService(request, function(result) {
                          console.log(request);
                          console.log(result);
                      });
                  })

              })*/
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
        mm = mm < 10 ? "0" + mm : mm;
        ss = ss < 10 ? "0" + ss : ss;
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
        mm = mm < 10 ? "0" + mm : mm;
        ss = ss < 10 ? "0" + ss : ss;
        return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + ss;
      },

      getdatatimehh(){ //默认显示今天
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
        return  H + ":" + mm + ":" + ss;
        //return y + "-" + m + "-" + d
      },

    },

    computed: {

    },
    destroyed(){
      let _this = this
      _this.ros.close()
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

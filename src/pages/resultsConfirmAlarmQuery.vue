<template>
  <div class="alarm_query_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <!--<AlarmQueryTop></AlarmQueryTop>-->
    <div class="xunjian_wrap">

      <div class="li_xunjian_title">
        <p>设备区域：</p>
        <div class="all_content all_content_quyu">
          <el-checkbox style="float: left" :indeterminate="isIndeterminateQuyu"
                       v-model="checkAllQuyu" @change="handleCheckAllChange">全部</el-checkbox>
          <el-checkbox-group v-model="checkedQuyu" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item,index) in citiesQuyu" :label="item"
                         :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-checkbox v-model="moreQuyu" @change="moreQuyuF">查看更多</el-checkbox>
      </div>

      <div class="li_xunjian_title">
        <p>设备类型：</p>
        <div class="all_content all_content_dev_type">
          <el-checkbox style="float: left" :indeterminate="isIndeterminateDevType" v-model="checkAllDevType"
                       @change="handleCheckAllChangeDevType">全部</el-checkbox>
          <el-checkbox-group v-model="checkedDevType" @change="handleCheckedCitiesChangeDevType">
            <el-checkbox v-for="(item,index) in listDevType" :label="item" :key="item.id">{{item.displayName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-checkbox v-model="moreDevType" @change="moreDevTypeF">查看更多</el-checkbox>
      </div>

      <div class="li_xunjian_title">
        <p>识别类型：</p>
        <div class="all_content all_content_recon_type">
          <el-checkbox style="float: left" :indeterminate="isIndeterminateReconType" v-model="checkAllReconType"
                       @change="handleCheckAllChangeReconType">全部</el-checkbox>
          <el-checkbox-group v-model="checkedReconType" @change="handleCheckedCitiesChangeReconType">
            <el-checkbox v-for="(item,index) in listReconType" :label="item" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-checkbox v-model="moreReconType" @change="moreReconTypeF">查看更多</el-checkbox>
      </div>

      <div class="li_xunjian_title">
        <p>告警等级：</p>
        <div class="all_content all_content_alarm">
          <el-checkbox style="float: left" :indeterminate="isIndeterminateAlarm" v-model="checkAllAlarm"
                       @change="handleCheckAllChangeAlarm">全部</el-checkbox>
          <el-checkbox-group v-model="checkedAlarm" @change="handleCheckedCitiesChangeAlarm">
            <el-checkbox v-for="(item,index) in listAlarm" :label="item" :key="item.id">{{item.displayName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-checkbox v-model="moreAlarm" @change="moreAlarmF">查看更多</el-checkbox>
      </div>
      <!--<div class="li_xunjian_title">
        <p>表计类型：</p>
        <div class="all_content all_content_meter_type">
          <el-checkbox style="float: left" :indeterminate="isIndeterminateMeterType" v-model="checkAllMeterType"
                       @change="handleCheckAllChangeMeterType">全部</el-checkbox>
          <el-checkbox-group v-model="checkedMeterType" @change="handleCheckedCitiesChangeMeterType">
            <el-checkbox v-for="(item,index) in listMeterType" :label="item" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-checkbox v-model="moreMeterType" @change="moreMeterTypeF">查看更多</el-checkbox>
      </div>-->

      <!--<div class="li_xunjian_title">
        <p>设备外观类型：</p>
        <div class="all_content all_content_face_type">
          <el-checkbox style="float: left" :indeterminate="isIndeterminateFaceType" v-model="checkAllFaceType"
                       @change="handleCheckAllChangeFaceType">全部</el-checkbox>
          <el-checkbox-group v-model="checkedFaceType" @change="handleCheckedCitiesChangeFaceType">
            <el-checkbox v-for="(item,index) in listFaceType" :label="item" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-checkbox v-model="moreFaceType" @change="moreFaceTypeF">查看更多</el-checkbox>
      </div>-->

    </div>
    <div class="tools_query">
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
      <el-radio v-model="radio" label="1">已审核</el-radio>
      <el-radio v-model="radio" label="0">未审核</el-radio>
      <div>
        <ul>
          <li @click="queryList"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
          <li @click="resetList"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
          <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
          <li @click="dialogVisibleMoreCheckShow"><img src="../../static/images/confirm.png" alt=""><span>批量确认</span></li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <devTreeNoCheck @devTreeKey="treeCheck" :toTreeData="toTreeData"></devTreeNoCheck>
      </div>
      <div class="right">
        <p>设备告警查询确认</p>
        <el-table class="table_alarm" :row-class-name="tableRowClassName"
                  :data="tableDataAlarm" @selection-change="handleSelectionChangeTable"
                  border highlight-current-row @row-dblclick="dblBoxShow"
                  style="width: 100%">
          <el-table-column
            type="index" :index="index"
            label="序号" align="center"
            width="50">
          </el-table-column>
          <!--<el-table-column
            prop="id"
            label="id" align="center"
            width="50">
          </el-table-column>-->
          <el-table-column
						type="selection"
						align="center"
						width="50">
					</el-table-column>
          <el-table-column
            prop="reconType.name" align="center"
            label="识别类型" width="100">
          </el-table-column>
          <el-table-column
            prop="point.displayName"
            label="点位名称" align="center"
            width="320">
          </el-table-column>
          <el-table-column
            prop="resultStatus"
            label="识别结果" align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="alarmLevel" :formatter="alarmLevelShow"
            label="告警等级" align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="alarmType.name"
            label="告警类型" align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="reconTime"
            label="告警时间" align="center"
            width="280">
          </el-table-column>
          <el-table-column
            prop=""
            label="采集信息" align="center"
            >
          </el-table-column>

        </el-table>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <menuBottom></menuBottom>

    <div class="alarm_dialog">
      <el-dialog title="告警确认" :visible.sync="dialogVisibleAlarm" class="" style="margin-top: -8vh;">
        <div class="dialog_content">
          <div class="dialog_left">
            <div style="background: #D9ECEA;height: 26px;line-height: 26px">
              <p @click="prevData" style="margin-left: 10px;cursor: pointer">上一页</p>
            </div>
            <div style="height: 26px;line-height: 26px;padding-left: 8px">
              <span>点位信息：</span>
              <span style="border: 1px solid #90e8c6;border-radius:3px;
                padding: 2px 8px">{{point_info}}</span>
            </div>
            <div style="height: 400px;overflow-y: auto">
              <ul>
                <li v-for="(item, index) in imgArr" style="width:33.3333%;float:left;
                  box-sizing:border-box;border:1px solid #90e8c6">
                  <p style="background: #D9ECEA;height: 22px;line-height: 22px">{{item.title}}</p>
                  <img style="width:100%;height:100%;" :src="item.url" alt="">
                </li>
              </ul>
            </div>
            <div>
              <p style="background: #D9ECEA;height: 26px;line-height: 26px;padding-left: 10px">音频文件</p>
              <div>123</div>
            </div>
            <div>
              <p style="background: #D9ECEA;height: 26px;line-height: 26px;padding-left: 10px">阈值信息</p>
              <p>
                <span>环境信息</span>
                <span>环境温度0摄氏度</span>
              </p>
              <p>
                <span>环境信息</span>
                <span>环境温度0摄氏度</span>
              </p>
              <p>
                <span>环境信息</span>
                <span>环境温度0摄氏度</span>
              </p>
              <p>
                <span>环境信息</span>
                <span>环境温度0摄氏度</span>
              </p>
              <p>
                <span>环境信息</span>
                <span>环境温度0摄氏度</span>
              </p>
            </div>
          </div>
          <div class="dialog_right">
            <div style="background: #D9ECEA;height: 26px;line-height: 26px;padding: 0 10px;">
              <p style="float: left">识别结果</p>
              <p @click="nextData" style="float: right;cursor: pointer">下一页</p>
            </div>
            <div style="padding:10px">
              <p style="margin-bottom:10px">结果：</p>
              <p><el-radio @change="radioResultChange" v-model="radio_result" label="0">正常</el-radio></p>
              <div style="height: 120px;">
                <el-radio @change="radioResultChange" v-model="radio_result" label="1" style="margin: 0">异常：</el-radio>
                <el-select size="mini" v-model="value_type" multiple
                           placeholder="请选择" style="width: 220px">
                  <el-option
                    v-for="item in alarm_type_option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div style="height: 80px">
                <span>告警等级：</span>
                <el-select size="mini" v-model="value_level" :disabled="disabled_option"
                           placeholder="请选择" style="width: 220px;margin-left:-4px">
                  <el-option
                    v-for="item in alarm_level_option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div style="height: 100px">
                <p style="margin-bottom:10px">实际值：</p>
                <p><el-radio @change="radioValueChange" v-model="radio_value" label="0">识别正确</el-radio></p>
                <p>
                  <el-radio @change="radioValueChange" v-model="radio_value" label="1">识别错误</el-radio>
                  <el-input v-model="input_value_wrong" size="mini"
                            :disabled="disabled_input_value" style="width: 150px"></el-input>
                </p>
              </div>
              <div>
                <p style="margin-bottom:10px">意见：</p>
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>

              </div>

            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAlarm = false">取 消</el-button>
        <el-button type="primary" @click="checkConfirm">确 认</el-button>
      </span>
      </el-dialog>
    </div>
    <div class="tip_dialog">
      <el-dialog title="确认" :visible.sync="dialogVisibleMoreCheck" class="del_user">
        <div class="dialog_content" style="height: 60px;font-weight: 600;
            font-size: 16px;line-height: 60px">
          是否批量确认？
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleMoreCheck = false">取 消</el-button>
          <el-button type="primary" @click="moreCheckCommit">确 认</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import menuBottom from '../components/menuBottom.vue'
  import HeaderTop from '../components/headerTop.vue'
  import AlarmQueryTop from '../components/alarmQueryTop.vue'
  import devTreeNoCheck from '../components/devTreeNoCheck.vue'

  export default {
    data(){
      return{
        title:'设备告警信息确认 > 设备告警查询确认',
        value_start:'',
        value_end:'',
        radio:'0',

        checkAllQuyu: false,
        checkedQuyu: [],
        citiesQuyu: [],
        isIndeterminateQuyu: false,
        moreQuyu:false,

        checkAllDevType: false,
        checkedDevType: [],
        listDevType: [],
        isIndeterminateDevType: false,
        moreDevType:false,

        checkAllReconType: false,
        checkedReconType: [],
        listReconType: [],
        isIndeterminateReconType: false,
        moreReconType:false,

        checkAllAlarm: false,
        checkedAlarm: [],
        listAlarm: [],
        isIndeterminateAlarm: false,
        moreAlarm:false,

        checkAllFaceType: false,
        checkedFaceType: [],
        listFaceType: [],
        isIndeterminateFaceType: false,
        moreFaceType:false,

        toTreeData:{
          quyu:[],
          type:[],
          recon:[],
          meter:[],
          face:[]
        },
        currentPage:1,
        total:1,
        tableDataAlarm:[],
        dialogVisibleAlarm:false,
        point_info:'点位信息',
        imgArr:[
        	{
        		title:'A相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'B相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'C相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'A相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'B相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'C相可见光',
            url:'../../static/abc.jpg'
          },
        ],
        radio_result:'1',
        value_type:'',
        alarm_type_option:[
          {value:1,label:'超温报警'},
          {value:2,label:'温升报警'},
          {value:3,label:'三相对比报警'},
          {value:4,label:'三相温差报警'},
          {value:5,label:'越限报警'},
        ],
        disabled_option:true,
        value_level:'',
        alarm_level_option:[
          {value:0,label:'正常'},
          {value:1,label:'预警'},
          {value:2,label:'一般缺陷'},
          {value:3,label:'严重缺陷'},
          {value:4,label:'危险缺陷'},
        ],
        radio_value:'1',
        input_value_wrong:'',
        disabled_input_value:true,
        textarea:'',
        ajaxTableData:{
        	page:1,
          size:10
        },
        rowIndex:0,
        checkId:'',
        dialogVisibleMoreCheck:false,
        multipleSelection: [],
      }
    },
    mounted(){
    	this.init()
      this.value_end = this.getDateTime()
      this.value_start = this.convertToLateDate()
      this.getTableData()
    },
    methods:{
      init(){
        let _this = this

        _this.ajax_api('get',url_api + '/device/region',null,true,function (res) {
          //console.log(res.data)
          let inspect = res.data
          let result = inspect.filter(item => {
            return item.parentId == 4
          })
          _this.citiesQuyu = result
          //_this.checkedQuyu = [result[1],result[3]]
        })

        _this.ajax_api('get',url_api + '/recon-type?size=30',null,true,function (res) {
          //console.log(res.data)
          let result = res.data.items
          _this.listReconType = result
        })

        _this.ajax_api('get',url_api + '/device-type?size=100',null,true,function (res) {
          //console.log(res.data)
          let inspect = res.data.items
          let result = inspect.filter(item => {
            return item.name >2000
          })
          _this.listDevType = result
        })

        _this.listAlarm = [
          {
            displayName: "正常",
            id: 0,
            name: 1
          },
          {
            displayName: "预警",
            id: 1,
            name: 1
          },
          {
            displayName: "一般缺陷",
            id: 2,
            name: 1
          },
          {
            displayName: "严重缺陷",
            id: 3,
            name: 1
          },
          {
            displayName: "危险缺陷",
            id: 4,
            name: 1
          },
        ]

      },

      getTableData(){
        let _this = this
        _this.ajaxTableData.startTime = _this.value_start
        _this.ajaxTableData.endTime = _this.value_end
        _this.ajaxTableData.checkStatus = _this.radio*1
        //console.log(_this.checkedAlarm)
        if(_this.checkedAlarm.length<1){
          _this.ajaxTableData.alarmLevel = null
        }else {
        	let alarmIds = []
          for(let i in _this.checkedAlarm){
            alarmIds.push(_this.checkedAlarm[i].id)
          }
          _this.ajaxTableData.alarmLevel = alarmIds.toString()
        }


        //console.log(_this.ajaxTableData)
        _this.ajax_api('post',url_api + '/point-alarm-history',
          _this.ajaxTableData,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data.items)
              _this.tableDataAlarm = res.data.items
              _this.total = res.data.total
            }
          })

      },

      handleCheckAllChange(val) {
        this.checkedQuyu = val ? this.citiesQuyu : [];
        this.isIndeterminateQuyu = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAllQuyu = checkedCount === this.citiesQuyu.length;
        this.isIndeterminateQuyu = checkedCount > 0 && checkedCount < this.citiesQuyu.length;
      },
      moreQuyuF(value){
        if(value){
          $('.all_content_quyu').height('auto')
        }else {
          $('.all_content_quyu').height('20px')
        }
      },

      handleCheckAllChangeDevType(val) {
        this.checkedDevType = val ? this.listDevType : [];
        this.isIndeterminateDevType = false;
      },
      handleCheckedCitiesChangeDevType(value) {
        let checkedCount = value.length;
        this.checkAllDevType = checkedCount === this.listDevType.length;
        this.isIndeterminateDevType = checkedCount > 0 && checkedCount < this.listDevType.length;
      },
      moreDevTypeF(value){
        if(value){
          $('.all_content_dev_type').height('auto')
        }else {
          $('.all_content_dev_type').height('20px')
        }
      },

      handleCheckAllChangeReconType(val) {
        this.checkedReconType = val ? this.listReconType : [];
        this.isIndeterminateReconType = false;
      },
      handleCheckedCitiesChangeReconType(value) {
        let checkedCount = value.length;
        this.checkAllReconType = checkedCount === this.listReconType.length;
        this.isIndeterminateReconType = checkedCount > 0 && checkedCount < this.listReconType.length;
      },
      moreReconTypeF(value){
        if(value){
          $('.all_content_recon_type').height('auto')
        }else {
          $('.all_content_recon_type').height('20px')
        }
      },

      handleCheckAllChangeAlarm(val) {
        this.checkedAlarm = val ? this.listAlarm : [];
        this.isIndeterminateAlarm = false;
      },
      handleCheckedCitiesChangeAlarm(value) {
        let checkedCount = value.length;
        this.checkAllAlarm = checkedCount === this.listAlarm.length;
        this.isIndeterminateAlarm = checkedCount > 0 && checkedCount < this.listAlarm.length;
      },
      moreAlarmF(value){
        if(value){
          $('.all_content_alarm').height('auto')
        }else {
          $('.all_content_alarm').height('20px')
        }
      },

      handleCheckAllChangeFaceType(val) {
        this.checkedFaceType = val ? this.listFaceType : [];
        this.isIndeterminateFaceType = false;
      },
      handleCheckedCitiesChangeFaceType(value) {
        let checkedCount = value.length;
        this.checkAllFaceType = checkedCount === this.listFaceType.length;
        this.isIndeterminateFaceType = checkedCount > 0 && checkedCount < this.listFaceType.length;
      },
      moreFaceTypeF(value){
        if(value){
          $('.all_content_face_type').height('auto')
        }else {
          $('.all_content_face_type').height('20px')
        }
      },

      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.ajaxTableData.size = val
        this.getTableData()
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.ajaxTableData.page = val
        this.getTableData()
      },
      index(val){
        return (this.ajaxTableData.page - 1)*this.ajaxTableData.size + val + 1
        //return (this.taskData.page - 1)*this.taskData.size + val + 1
      },
      radioResultChange(val){
      	if(val==1){
      		this.disabled_option = false
        }else {
          this.disabled_option = true
        }
      },
      radioValueChange(val){
        if(val==1){
          this.disabled_input_value = false
        }else {
          this.disabled_input_value = true
        }
      },

      queryList(){
        let _this = this
        _this.getTableData()
      },
      alarmLevelShow(row){
      	let alarmLevelName = ''
      	switch (row.alarmLevel){
          case 0:
            alarmLevelName = '正常'
            break
          case 1:
            alarmLevelName = '预警'
            break
          case 2:
            alarmLevelName = '一般缺陷'
            break
          case 3:
            alarmLevelName = '严重缺陷'
            break
          case 4:
            alarmLevelName = '危险缺陷'
            break
        }
        return alarmLevelName
      },
      dblBoxShow(row){
        let _this = this
        _this.rowIndex = row.index
        _this.checkId = row.id
        //console.log(row.index)
        //console.log(row.id) GET /ui/point-alarm-history/info/{id}
        _this.dialogVisibleAlarm = true
        _this.point_info = row.point.displayName
        _this.input_value_wrong = ''
        _this.textarea=''
        _this.ajax_api('get',url_api + '/point-alarm-history/info/'+row.id,
          null,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data)
              //报警等级
              if(res.data.resultStatus==0){
                _this.radio_result = '0'
                _this.value_level = res.data.alarmLevel*1
                _this.disabled_option = true
              }else {
                _this.radio_result = '1'
                _this.value_level = res.data.alarmLevel*1
                _this.disabled_option = false
              }
              //识别状态
              if(res.data.errorFlag==0){
                _this.radio_value = '0'
                _this.disabled_input_value = true
              }else {
                _this.radio_value = '1'
                _this.disabled_input_value = false
              }
            }
          })

      },
      prevData(){
        let _this = this
        if(_this.rowIndex<1){
          //alert('本页第一条了')
          _this.$message({
            message: '本页最后一条了',
          });
          return
        }else {
          _this.rowIndex--
        }
        _this.input_value_wrong = ''
        _this.textarea=''
        _this.point_info = _this.tableDataAlarm[_this.rowIndex].point.displayName
        let id = _this.tableDataAlarm[_this.rowIndex].id
        _this.checkId = id
        //console.log(id,'index'+_this.rowIndex)
        _this.ajax_api('get',url_api + '/point-alarm-history/info/'+id,
          null,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data)
              //报警等级
              if(res.data.resultStatus==0){
                _this.radio_result = '0'
                _this.value_level = res.data.alarmLevel*1
                _this.disabled_option = true
              }else {
                _this.radio_result = '1'
                _this.value_level = res.data.alarmLevel*1
                _this.disabled_option = false
              }
              //识别状态
              if(res.data.errorFlag==0){
                _this.radio_value = '0'
                _this.disabled_input_value = true
              }else {
                _this.radio_value = '1'
                _this.disabled_input_value = false
              }
            }
          })

      },
      nextData(){
      	let _this = this
        _this.rowIndex++
        if(_this.rowIndex>=_this.tableDataAlarm.length){
      		//alert('本页最后一条了')
          _this.$message({
            message: '本页最后一条了',
          });
          return
        }
        _this.input_value_wrong = ''
        _this.textarea=''
        _this.point_info = _this.tableDataAlarm[_this.rowIndex].point.displayName
        let id = _this.tableDataAlarm[_this.rowIndex].id
        _this.checkId = id
        //console.log(id,'index'+_this.rowIndex)
        _this.ajax_api('get',url_api + '/point-alarm-history/info/'+id,
          null,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data)
              //报警等级
              if(res.data.resultStatus==0){
                _this.radio_result = '0'
                _this.value_level = res.data.alarmLevel*1
                _this.disabled_option = true
              }else {
                _this.radio_result = '1'
                _this.value_level = res.data.alarmLevel*1
                _this.disabled_option = false
              }
              //识别状态
              if(res.data.errorFlag==0){
                _this.radio_value = '0'
                _this.disabled_input_value = true
              }else {
                _this.radio_value = '1'
                _this.disabled_input_value = false
              }
            }
          })
      },
      checkConfirm(){
      	let _this = this
        let data = {
          alarmLevel: _this.value_level,
          checkDesc: _this.textarea,
          irBaseAlarmTypeId: _this.value_type.toString(),
          modifyValue: _this.input_value_wrong,
          reconStatus: _this.radio_value,
          resultStatus: _this.radio_result
        }
        _this.ajax_api('put',url_api + '/point-alarm-history/updPointAlarmHistory/'+_this.checkId,
          data,
          true,
          function (res) {
            if(res.code == 200){
              _this.$message({
                message: '审核成功',
                type: 'success',
              });
            }
          })

      },
      dialogVisibleMoreCheckShow(){
        if(this.multipleSelection.length<1){
          this.$message({
            message: '请选择',
          });
          return
        }
      	this.dialogVisibleMoreCheck = true
      },
      moreCheckCommit(){
        let _this = this
        let ids = []
        for(let i in _this.multipleSelection){
        	ids.push(_this.multipleSelection[i].id)
        }
        let moreCheckData = {
          ids: ids.toString()
        }
        //console.log(moreCheckData)
        _this.ajax_api('put',url_api + '/point-alarm-history/batch-confirm',
          moreCheckData,
          true,
          function (res) {
            if(res.code == 200){
              _this.$message({
                message: '审核成功',
                type: 'success',
              });
              this.dialogVisibleMoreCheck = false
              _this.getTableData()
            }
          })

      },
      resetList(){
      	this.checkAllQuyu = false
        this.checkedQuyu = []
        this.isIndeterminateQuyu = false
        this.moreQuyu = false

        this.checkAllDevType = false
        this.checkedDevType = []
        this.isIndeterminateDevType = false
        this.moreDevType = false

        this.checkAllReconType = false
        this.checkedReconType = []
        this.isIndeterminateReconType = false
        this.moreReconType = false

        this.checkAllAlarm = false
        this.checkedAlarm = []
        this.isIndeterminateAlarm = false
        this.moreAlarm = false

        this.radio = '0'
        this.value_end = this.getDateTime()
        this.value_start = this.convertToLateDate()
        this.getTableData()
      },
      handleSelectionChangeTable(val){
        this.multipleSelection = val
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
      tableRowClassName ({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
      treeCheck(data){
        //console.log(data)
      },
    },
    components: {
      HeaderTop,
      AlarmQueryTop,
      menuBottom,
      devTreeNoCheck,
    },
    watch:{

      checkedQuyu:function (newVal,oldVal) {
        let _this = this
        //console.log(newVal,oldVal)
        _this.toTreeData.quyu = newVal
      },
      checkedDevType:function (newVal,oldVal) {
        let _this = this
        //console.log(newVal,oldVal)
        _this.toTreeData.type = newVal
      },
      checkedReconType:function (newVal,oldVal) {
        let _this = this
        //console.log(newVal,oldVal)
        _this.toTreeData.recon = newVal
      },
      checkedMeterType:function (newVal,oldVal) {
        let _this = this
        //console.log(newVal,oldVal)
        _this.toTreeData.meter = newVal
      },
      checkedFaceType:function (newVal,oldVal) {
        let _this = this
        //console.log(newVal,oldVal)
        _this.toTreeData.face = newVal
      },

      saveData:{
        handler(newVal,oldVal){
          //console.log(newVal.points)
        },
        immediate: true,
        deep: true
      },
      savePutData:{
        handler(newVal,oldVal){
          //console.log(newVal.points)
        },
        immediate: true,
        deep: true
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .alarm_query_wrap
    height 100%
    .xunjian_wrap
      margin 20px
      .li_xunjian_title
        margin 10px 0
        display flex
        overflow hidden
        .el-radio
          width 210px
          margin-left 10px
          float left
        p
          float left
          font-size 14px
          font-weight 600
          width 120px
          text-align right
          margin-right 20px
        .all_content
          width: calc(100% - 380px);
          float: left;
          overflow: hidden;
          .el-radio
            margin-bottom 10px
          .el-checkbox
            width 210px
            margin 0 30px 10px 10px
        .all_content_quyu,.all_content_recon_type,.all_content_dev_type,.all_content_meter_type,
        .all_content_face_type,.all_content_alarm
          height 20px


    .tools_query
      height 30px
      background #cae7ee\0
      background: linear-gradient(#e3f2ee,#cae7ee);
      border-top: 1px solid #cae7ee;
      display flex
      align-items center
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

    .content
      height calc(100% - 271px)
      .left
        width 300px
        height 100%
        border 1px solid #cae7ee
        float left
        box-sizing border-box
      .right
        width calc(100% - 300px)
        height 100%
        border 1px solid #cae7ee
        float left
        box-sizing border-box
        position relative
        background white
        /deep/ .el-table th
          padding 4px 0
        /deep/ .el-table td
          padding 4px 0
        p
          height 30px
          line-height 30px
          padding-left 10px
          background linear-gradient(#e3f2ee,#cae7ee)
          background #e3f2ee/0
        .table_alarm
          max-height calc(100% - 62px)
          overflow-y auto

        .el-table::before
          left: 0;
          bottom: 0;
          width: 100%;
          height: 0px;

        .page
          position absolute
          bottom 0
    .alarm_dialog /deep/
      .el-dialog
        background #d7efec
        /*width: 65%;*/
        /*min-width: 800px;*/
        width: 1100px;
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
            /*padding 10px 10px*/
            overflow hidden
            border 1px solid #90e8c6
            .dialog_left
              width calc(100% - 336px)
              border-right 1px solid #90e8c6
              float left
              box-sizing border-box
            .dialog_right
              width 336px
              float left

        .el-dialog__footer
          background #fff
          border 1px solid #90e8c6
          border-top none
          margin 1px 8px 5px
          padding 5px 10px
          .el-button
            padding 8px 22px


    .tip_dialog /deep/
      .el-dialog
        background #d7efec
        width: 500px;
        min-width: 500px;
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
            padding 10px 20px
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

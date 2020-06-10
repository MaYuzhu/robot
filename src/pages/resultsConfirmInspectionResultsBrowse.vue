<template>
  <div class="results_browse_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <!--<div class="results_browse_top">
      <p>点位类型：</p>
      <div class="all_content">
        <el-checkbox style="float: left" :indeterminate="isIndeterminatePoint" v-model="checkAllPoint" @change="handleCheckAllChangePoint">全部</el-checkbox>
        <el-checkbox-group style="float: left" v-model="checkedPoints" @change="handleCheckedCitiesChangePoint">
          <el-checkbox v-for="pointWeizhi in pointsArr" :label="pointWeizhi" :key="pointWeizhi">{{pointWeizhi}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>-->
    <div class="results_browse_content">
      <div class="results_browse_left">
        <devTreeNoCheck @childKey="childKeyId" :toTreeData="toTreeData"></devTreeNoCheck>
      </div>
      <div class="results_browse_right">
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
          <el-radio style="line-height: 27px" v-model="radio" label="1">已审核</el-radio>
          <el-radio v-model="radio" label="0">未审核</el-radio>
          <div>
            <ul>
              <li @click="queryList"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
              <li @click="resetList"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
              <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
            </ul>
          </div>
        </div>
        <div class="right_title">巡检结果</div>
        <div style="border: 0px solid" class="table_box">
          <el-table size="mini" @row-dblclick="dblBoxShow"
                    border :data="tableDataResults" :row-class-name="tableRowClassName"
                    style="width: 100%;" class="el_table">
            <el-table-column
              prop="date" align="center"
              label="序号" type="index" :index="index1"
              width="50">
            </el-table-column>
            <el-table-column
              prop="task.name" align="center"
              label="任务名称" width="200"
            >
            </el-table-column>
            <el-table-column
              prop="point.deviceName" align="center"
              label="点位名称" width="200"
            >
            </el-table-column>
            <el-table-column
              prop="createTime" align="center"
              label="识别时间" width="200"
            >
            </el-table-column>
            <el-table-column
              prop="value" align="center"
              label="识别结果" width="90"
            >
            </el-table-column>
            <el-table-column
              prop="checkStatus" align="center"
              label="审核结果" width="100"
            >
              <template slot-scope="scope">
                <p>{{scope.row.checkStatus==0?'未审核':'已审核'}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="reconType.name" align="center"
              label="识别类型" width="100"
            >
            </el-table-column>
            <el-table-column
              prop="address" align="center"
              label="采集信息"
            >
              <template slot-scope="scope">
                <p style="cursor:pointer;text-decoration:underline;color:blue" @click="openImg(imgUrlBefore+scope.row.cameraPic)">图片信息</p>
              </template>
            </el-table-column>

          </el-table>
          <div class="page_box">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              :page-sizes="[6, 10, 20, 50]"
              :page-size="6"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total1">
            </el-pagination>
          </div>
        </div>
        <div class="right_bottom" style="border: 0px solid">
          <ul class="ul_img_wrap">
            <li v-for="(item, index) in imgDataResults" style="width:33.3333%;height:50%;float:left;
                  box-sizing:border-box;border:1px solid #90e8c6">
              <el-image class="li_img"  v-if="item.cameraPic"
                   :preview-src-list="srcList" style="width:100%;" :src="imgUrlBefore+item.cameraPic" alt="">
              </el-image>
              <p v-if="item.point" style="background: #D9ECEA;height: 22px;line-height: 22px">{{item.point.name}}</p>
            </li>
          </ul>
          <div class="page_box">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes="[6, 10, 20, 50]"
              :page-size="6"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total2">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <menuBottom></menuBottom>
    <div class="alarm_dialog">
      <el-dialog title="巡检结果审核" :visible.sync="dialogVisibleAlarm" class="" style="margin-top: -8vh;">
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
                <li v-for="(item, index) in imageArr" style="width:33.3333%;float:left;
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
              <p style="padding: 6px 3px">
                <span>环境信息</span>
                <span>环境温度0摄氏度</span>
              </p>
              <ul style="padding: 6px 3px">
                <span v-if="tableDataDuiOld[0]" >{{tableDataDuiOld[0].alarmType.name}}
                  :&nbsp;</span>
                <span v-for="(item, index) in tableDataDuiOld">
                  {{alarmLevel(item.alarmLevel)}}({{item.upOrDown==2?'下限':'上限'}})
                  {{item.limitValue}}
                </span>
              </ul>
              <ul style="padding: 6px 3px">
                <span v-if="tableDataChaOld[0]" >{{tableDataChaOld[0].alarmType.name}}
                  :&nbsp;</span>
                <span v-for="(item, index) in tableDataChaOld">
                  {{alarmLevel(item.alarmLevel)}}({{item.upOrDown==2?'下限':'上限'}})
                  {{item.limitValue}}
                </span>
              </ul>
              <ul style="padding: 6px 3px">
                <span v-if="tableDataWenOld[0]" >{{tableDataWenOld[0].alarmType.name}}
                  :&nbsp;</span>
                <span v-for="(item, index) in tableDataWenOld">
                  {{alarmLevel(item.alarmLevel)}}({{item.upOrDown==2?'下限':'上限'}})
                  {{item.limitValue}}
                </span>
              </ul>
              <ul style="padding: 6px 3px">
                <span v-if="tableDataChaoOld[0]" >{{tableDataChaoOld[0].alarmType.name}}
                  :&nbsp;</span>
                <span v-for="(item, index) in tableDataChaoOld">
                  {{alarmLevel(item.alarmLevel)}}({{item.upOrDown==2?'下限':'上限'}})
                  {{item.limitValue}}
                </span>
              </ul>
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
    <el-dialog width="500px" :visible.sync="imgVisible" class="img-dialog">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
  import menuBottom from '../components/menuBottom.vue'
  import HeaderTop from '../components/headerTop.vue'
  import devTreeNoCheck from '../components/devTreeNoCheck.vue'
  import ElImage from "../../node_modules/element-ui/packages/image/src/main";

  const pointsOptions = ['点', '面' ]
  export default {
    data(){
      return{
        title:'巡检结果浏览 > 巡检结果浏览',
        tableDataResults:[
        	{address:'123',id:0},
          {address:'123',id:1},
          {address:'123',id:2},
          {address:'123',id:3},
          {address:'123',id:4},
          {address:'123',id:5},
        ],
        imgDataResults:[],
        checkAllPoint: false,
        checkedPoints: [],
        pointsArr: pointsOptions,
        isIndeterminatePoint: false,
        value_start:'',
        value_end:'',
        radio:'0',
        currentPage1:1,
        total1:1,
        currentPage2:1,
        total2:1,
        imageArr:[
          {
            title:'A相可见光',
            url:'/static/abc.jpg'
          },
          {
            title:'B相可见光',
            url:'/static/abc.jpg'
          },
          {
            title:'C相可见光',
            url:'/static/abc.jpg'
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
        srcList: [],
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
          {value:1,label:'正常'},
          {value:2,label:'预警'},
          {value:3,label:'一般缺陷'},
          {value:4,label:'严重缺陷'},
          {value:5,label:'危险缺陷'},
        ],
        radio_value:'1',
        input_value_wrong:'',
        disabled_input_value:true,
        textarea:'',
        ajaxTableData:{page:1, size:6},
        ajaxTableImgData:{page:1, size:6},
        rowIndex:0,
        checkId:'',
        toTreeData:{
          quyu:[],
          type:[],
          recon:[],
          meter:[],
          face:[]
        },
        alarmData:{
          pageSize:1000
        },

        imgVisible: false,
        dialogImgUrl: '',
        imgUrlBefore: url_img + '/smcsp/',
        pointIds:'',

        tableDataChao:[],
        tableDataWen:[],
        tableDataDui:[],
        tableDataCha:[],
        tableDataChaoOld:[],
        tableDataWenOld:[],
        tableDataDuiOld:[],
        tableDataChaOld:[],
      }
    },
    components: {
      ElImage,
      HeaderTop,
      devTreeNoCheck,
      menuBottom
    },
    mounted(){
    	this.value_end = this.getDateTime()
      this.value_start = this.convertToLateDate()
      this.getTableData()
      this.getImgData()
    },
    methods:{
      getTableData(){
        let _this = this
        _this.ajaxTableData.startTime = _this.value_start
        _this.ajaxTableData.endTime = _this.value_end
        _this.ajaxTableData.checkStatus = _this.radio*1

/*{
 "checkStatus": 0,
 "endTime": "string",
 "irBaseRobotId": 0,
 "irDataTaskHistoryId": 0,
 "irProjSaveType": 0,
 "page": 0,
 "pointIds": "string",
 "pointType": 0,
 "reconStatus": "string",
 "size": 0,
 "startTime": "string"
 }*/
/*checkStatus (integer, optional): 审核状态 0:未审核 1:已审核 ,
 endTime (string, optional): 结束时间 ,
 irBaseRobotId (integer, optional): 机器人编号 ,
 irDataTaskHistoryId (integer, optional): 巡检记录编号 ,
 irProjSaveType (integer, optional): 保存类型 ,
 page (integer, optional): 当前页数 ,
 pointIds (string, optional): 点位编号 ,
 pointType (integer, optional): 点位类型，0：点位，1：类型 ,
 reconStatus (string, optional): 识别状态 1 正确； 0 错误 ,
 size (integer, optional): 每页显示条数 ,
 startTime (string, optional): 开始时间*/

        //console.log(_this.ajaxTableData)
        _this.ajax_api('post',url_api + '/point-history',
          _this.ajaxTableData,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data.items)
              _this.tableDataResults = res.data.items
              _this.total1 = res.data.total
            }
          })

      },
      getImgData(){
          let _this = this
          _this.ajaxTableImgData.startTime = _this.value_start
          _this.ajaxTableImgData.endTime = _this.value_end
          _this.ajaxTableImgData.checkStatus = _this.radio*1

          _this.ajax_api('post',url_api + '/point-history',
              _this.ajaxTableImgData,
              true,
              function (res) {
                  if(res.code == 200){
                      //console.log(res.data.items)
                      _this.total2 = res.data.total
                      _this.imgDataResults = res.data.items
                      _this.srcList = []
                      for(let i=0;i<res.data.items.length;i++){
                          _this.srcList.push(_this.imgUrlBefore + res.data.items[i].cameraPic)
                      }

                  }
              })

      },
      handleCheckAllChangePoint(val){
        this.checkedPoints = val ? pointsOptions : [];
        this.isIndeterminatePoint = false;
      },
      handleCheckedCitiesChangePoint(value){
        let checkedCount = value.length;
        this.checkAllPoint = checkedCount === this.pointsArr.length;
        this.isIndeterminatePoint = checkedCount > 0 && checkedCount < this.pointsArr.length;
      },
      //点位ID
      childKeyId(val){
          let _this = this
          //console.log(val)
          _this.pointIds = val.id
          _this.ajaxTableData.pointIds = _this.pointIds
          _this.ajaxTableImgData.pointIds = _this.pointIds
          _this.getTableData()
          _this.getImgData()
      },
      queryList(){
        let _this = this
        _this.getTableData()
        _this.getImgData()
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

      handleSizeChange1(val) {
        //console.log(`每页 ${val} 条`);
        this.ajaxTableData.size = val
        this.getTableData()
      },
      handleCurrentChange1(val) {
        //console.log(`当前页: ${val}`);
        this.ajaxTableData.page = val
        this.getTableData()
      },
      index1(val){
        return (this.ajaxTableData.page - 1)*this.ajaxTableData.size + val + 1
      },
      handleSizeChange2(val) {
        //console.log(`每页 ${val} 条`);
          this.ajaxTableImgData.size = val
          this.getImgData()
      },
      handleCurrentChange2(val) {
        //console.log(`当前页: ${val}`);
          this.ajaxTableImgData.page = val
          this.getImgData()
      },
      dblBoxShow(row){
      	let _this = this
      	//console.log(row.id)
        _this.rowIndex = row.index
        _this.checkId = row.id
        //console.log(row.index)
        //console.log(row.id) GET /ui/point-alarm-history/info/{id}
        _this.dialogVisibleAlarm = true
        _this.point_info = row.point.name
        _this.input_value_wrong = ''
        _this.textarea = ''
        _this.imageArr = []
        _this.imageArr.push({
            title:row.point.name,
            url:_this.imgUrlBefore + row.cameraPic
        })
        _this.ajax_api('get',url_api + '/point-history/info/'+row.id,
          null,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data)
              //报警等级
              /*if(res.data.resultStatus==0){
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
              }*/
              _this.input_value_wrong = res.data.modifyValue
            }
          })
        _this.getAlarmDataOld(row.id)
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
      resetList(){
        this.radio = '0'
        this.value_end = this.getDateTime()
        this.value_start = this.convertToLateDate()
        this.pointIds = ''
        this.ajaxTableData.pointIds = this.pointIds
        this.ajaxTableImgData.pointIds = this.pointIds
        this.getTableData()
        this.getImgData()
      },
      prevData(){
        let _this = this
        if(_this.rowIndex<1){
          //alert('本页第一条了')
          _this.$message({
            message: '本页第一条了',
          });
          return
        }else {
          _this.rowIndex--
        }
        _this.input_value_wrong = ''
        _this.textarea=''
        _this.point_info = _this.tableDataResults[_this.rowIndex].point.name
        _this.imageArr = []
        _this.imageArr.push({
            title: _this.tableDataResults[_this.rowIndex].point.name,
            url: _this.imgUrlBefore +_this.tableDataResults[_this.rowIndex].cameraPic//_this.imgUrlBefore + row.cameraPic
        })
        let id = _this.tableDataResults[_this.rowIndex].id
        _this.checkId = id
        //console.log(id,'index'+_this.rowIndex)
        _this.ajax_api('get',url_api + '/point-history/info/'+id,
          null,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data)
              //报警等级
              /*if(res.data.resultStatus==0){
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
              }*/
              _this.input_value_wrong = res.data.modifyValue
            }
          })
        _this.getAlarmDataOld(id)

      },
      nextData(){
        let _this = this
        _this.rowIndex++
        if(_this.rowIndex>=_this.tableDataResults.length){
          //alert('本页最后一条了')
          _this.$message({
            message: '本页最后一条了',
          });
          return
        }
        _this.input_value_wrong = ''
        _this.textarea=''
        _this.point_info = _this.tableDataResults[_this.rowIndex].point.name
        _this.imageArr = []
        _this.imageArr.push({
            title: _this.tableDataResults[_this.rowIndex].point.name,
            url: _this.imgUrlBefore +_this.tableDataResults[_this.rowIndex].cameraPic//_this.imgUrlBefore + row.cameraPic
        })
        let id = _this.tableDataResults[_this.rowIndex].id
        _this.checkId = id
        //console.log(id,'index'+_this.rowIndex)
        _this.ajax_api('get',url_api + '/point-history/info/'+id,
          null,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data)
              //报警等级
              /*if(res.data.resultStatus==0){
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
              }*/
              _this.input_value_wrong = res.data.modifyValue
            }
          })
        _this.getAlarmDataOld(id)
      },
      checkConfirm(){
      	/*"cameraPic": "string",
         "checkStatus": "string",
         "flirPic": "string",
         "irBaseRobotId": 0,
         "irDataTaskHistoryId": 0,
         "irProjPointId": 0,
         "irProjWatchPosId": 0,
         "modifyValue": 0,
         "pointType": "string",
         "reconStatus": "string",
         "reconTime": "2020-04-17T00:20:52.434Z",
         "sound": "string",
         "value": 0*/
      	/*cameraPic (string, optional): 可见光图片 ,
         checkStatus (string, optional): 审核状态 0:未审核 1:已审核 ,
         flirPic (string, optional): 红外图片 ,
         irBaseRobotId (integer, optional): 机器人编号 ,
         irDataTaskHistoryId (integer, optional): 巡检记录编号 ,
         irProjPointId (integer, optional): 巡检点位编号 ,
         irProjWatchPosId (integer, optional): 观察位编号 ,
         modifyValue (number, optional): 人工判断结果值 ,
         pointType (string, optional): 点位类型，0：点位，1：类型 ,
         reconStatus (string, optional): 识别状态 0 正确； 1 错误 ,
         reconTime (string, optional): 识别时间 ,
         sound (string, optional): 声音 ,
         value (number, optional): 识别值*/
        let _this = this
        let data = {
          //alarmLevel: _this.value_level,
          checkDesc: _this.textarea,
          modifyValue: _this.input_value_wrong,
          reconStatus: _this.radio_value,
          irBaseRobotId: 1,
          //resultStatus: _this.radio_result,
        }
        _this.ajax_api('put',url_api + '/point-history/updPointHistory/'+_this.checkId,
          data,
          true,
          function (res) {
            if(res.code == 200){
              _this.$message({
                message: '审核成功',
                type: 'success',
              });
            }else {
              _this.$message({
                message: '服务器繁忙...',
              });
            }
          })

      },
      tableRowClassName ({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
      openImg(url) {
          let _this = this
          if (url) {
              _this.imgVisible = true
              _this.dialogImgUrl = url
              _this.$emit('isVideo', false)
          }
      },
      getAlarmDataOld(irProjPointId){
        let _this = this
        _this.alarmData.irProjPointId = irProjPointId
        _this.ajax_api('get',url_api + '/point-alarm-setting',_this.alarmData,true,function (res) {
          console.log(res.data)
          if(!res.data.items.length<0){
            return
          }
          let result = res.data.items.filter(item => {
            return item.irBaseAlarmTypeId == 1
          })
          //_this.tableDataChao = result
          _this.tableDataChaoOld = result

          let result2 = res.data.items.filter(item => {
            return item.irBaseAlarmTypeId == 2
          })
          //_this.tableDataWen = result2
          _this.tableDataWenOld = result2

          let result3 = res.data.items.filter(item => {
            return item.irBaseAlarmTypeId == 3
          })
          //_this.tableDataDui = result3
          _this.tableDataDuiOld = result3

          let result4 = res.data.items.filter(item => {
            return item.irBaseAlarmTypeId == 4
          })
          //_this.tableDataCha = result4
          _this.tableDataChaOld = result4
          //console.log(result)
        })
      },
      alarmLevel(num){
        let result = ''
        switch(num){
          case 1:
            result = '预警'
            break
          case 2:
            result = '一般告警'
            break
          case 3:
            result = '严重告警'
            break
          case 4:
            result = '危险告警'
            break
          case 5:
            result = '？'
            break
        }
        return result
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .results_browse_wrap
    height 100%
    .results_browse_top
      height 30px
      display flex
      align-items center
      p
        float left
        font-weight 600
        margin 0 50px 0 40px
        line-height 28px
      .all_content
        float left
        display flex
        height 28px
        line-height 28px
        div
          margin 0 30px
    .results_browse_content
      height calc(100% - 90px)
      min-height 840px
      display flex
      .results_browse_left
        width 300px
        background white
        border 1px solid #cae7ee
        float left
        box-sizing border-box
      .results_browse_right
        border 1px solid #cae7ee
        width calc(100% - 300px)
        background white
        float left
        box-sizing border-box
        .right_title_tool
          width 100%
          height 30px
          background #cae7ee\0
          background linear-gradient(#e3f2ee,#cae7ee)
          display flex
          align-items center
          p
            float left
            margin-left 10px
            font-weight 600
            line-height 28px
          div
            float left
            margin-right 10px
            ul
              float left
              display flex
              padding-left 20px
              li
                float left
                margin-right 30px
                display flex
                align-items center
                cursor pointer
                line-height 30px
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

        .table_box
          height calc(100% - 618px)
          min-height 234px
          /*overflow-y auto*/
          position relative
          /deep/ .el-table th
            padding 2px 0
          /deep/ .el-table td
            padding 2px 0
          .el-table::before
            height: 0px;
          .el_table
            max-height calc(100% - 30px)
            overflow-y auto
          .page_box
            position absolute
            bottom 0
        .right_bottom
          height 528px
          .ul_img_wrap
            height calc(100% - 30px)
            overflow-y auto
            .li_img
              height calc(100% - 22px)
    .alarm_dialog /deep/
      .el-dialog
        background #d7efec
        /*width: 65%;
        min-width: 800px;*/
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


    /deep/ .img-dialog
      .el-dialog__header
        padding: 0!important;
        .el-dialog__headerbtn
          right 10px
          top 10px
    /deep/ .el-image-viewer__close
      color white
    /deep/ .el-image-viewer__canvas img
      transform scale(1)
</style>

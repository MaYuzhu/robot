<template>
  <div class="reports_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <!--<XunjianTopBox></XunjianTopBox>-->
    <div class="xunjian_wrap">
      <!--<div class="li_xunjian_title" style="height:auto">
        <p>巡检类型：</p>
        <div class="all_content">
          <el-radio v-model="radio" v-for="item in radio_items"
                    :key="item.id"
                    :label="item.id"
                    :value="item.id">{{item.name}}</el-radio>
          <el-radio v-model="radio_infrared" v-for="item in radio_items_infrared"
                    :key="item.id" :disabled="item.id!=5"
                    :label="item.id"
                    :value="item.id">{{item.name}}</el-radio>
        </div>
      </div>-->
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
        <p>表计类型：</p>
        <div class="all_content all_content_meter_type">
          <el-checkbox style="float: left" :indeterminate="isIndeterminateMeterType" v-model="checkAllMeterType"
                       @change="handleCheckAllChangeMeterType">全部</el-checkbox>
          <el-checkbox-group v-model="checkedMeterType" @change="handleCheckedCitiesChangeMeterType">
            <el-checkbox v-for="(item,index) in listMeterType" :label="item" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-checkbox v-model="moreMeterType" @change="moreMeterTypeF">查看更多</el-checkbox>
      </div>

      <div class="li_xunjian_title">
        <p>设备外观类型：</p>
        <div class="all_content all_content_face_type">
          <el-checkbox style="float: left" :indeterminate="isIndeterminateFaceType" v-model="checkAllFaceType"
                       @change="handleCheckAllChangeFaceType">全部</el-checkbox>
          <el-checkbox-group v-model="checkedFaceType" @change="handleCheckedCitiesChangeFaceType">
            <el-checkbox v-for="(item,index) in listFaceType" :label="item" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-checkbox v-model="moreFaceType" @change="moreFaceTypeF">查看更多</el-checkbox>
      </div>

    </div>
    <div class="reports_tools">
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
          <li @click="queryList()"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
          <li @click="resetList()"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
          <li @click="exportExcel_zanshi()"><img src="../../static/images/export.png" alt=""><span>导出</span></li>
          <li @click="alertBox()"><img src="../../static/images/report.png" alt=""><span>自定义报表</span></li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <devTree @devTreeKey="treeCheck" :toTreeData="toTreeData"></devTree>
      </div>
      <div class="right">
        <p class="title">生成报表</p>
        <el-table size="mini" class="table_box"
                  :data="tableDataResults"
                  border id="out-table"
                  style="width: 100%">
          <el-table-column align="center"
            prop="date" :index="index"type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column align="center"
                           prop="point.id"
                           label="ID"
          >
          </el-table-column>
          <!--<el-table-column type="selection" align="center"
                           prop="address"
                           label=""
          >
          </el-table-column>-->
          <el-table-column align="center"
            prop="value" width="120"
            label="识别结果" v-if="tableVisibleObj['1']"
          >
            <template slot-scope="scope">
              <span>{{scope.row.value}}{{scope.row.point.unit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
            prop="reconType.name"
            label="识别类型" v-if="tableVisibleObj['2']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="point.deviceName" width="150"
            label="点位名称" v-if="tableVisibleObj['3']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="createTime" width="150"
            label="识别时间" v-if="tableVisibleObj['4']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="deviceRegion"
            label="设备区域" v-if="tableVisibleObj['5']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="deviceInterval"
            label="间隔名称" v-if="tableVisibleObj['6']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="deviceName"
            label="设备名称" v-if="tableVisibleObj['7']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="deviceType"
            label="设备类型" v-if="tableVisibleObj['8']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="表计类型" v-if="tableVisibleObj['9']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="设备外观类型" v-if="tableVisibleObj['10']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="发热类型" v-if="tableVisibleObj['11']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="识别状态" v-if="tableVisibleObj['12']"
          >
            <template slot-scope="scope">
              <p>{{scope.row.reconStatus==0?'正确':'错误'}}</p>
            </template>
          </el-table-column>
          <!--<el-table-column align="center"
            prop="address"
            label="审核结果" v-if="tableVisibleObj['13']"
          >
          </el-table-column>-->
          <el-table-column align="center"
            prop="address"
            label="环境温度" v-if="tableVisibleObj['14']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="环境湿度" v-if="tableVisibleObj['15']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="环境风速" v-if="tableVisibleObj['16']"
          >
          </el-table-column>
          <el-table-column align="center"
                           prop="alarmLevel" :formatter="alarmLevelShow"
            label="告警等级" v-if="tableVisibleObj['17']"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="irProjSaveTypeId" width="90"
            label="采集信息" v-if="tableVisibleObj['18']"
          >
            <!--<template slot-scope="scope">
              <p>{{scope.row.irProjSaveTypeId==1?'红外图片':'可见光图片'}}</p>
            </template>-->
            <template slot-scope="scope">
              <p style="cursor:pointer;text-decoration:underline;color:blue"
                 @click="openImg(scope.row.cameraPic?imgUrlBefore+scope.row.cameraPic:imgUrlBefore+scope.row.flirPic)">
                {{scope.row.irProjSaveTypeId==1?'红外图片':'可见光图片'}}
              </p>
            </template>
          </el-table-column>
          <el-table-column align="center"
            prop="checkStatus"
            label="是否审核" v-if="tableVisibleObj['19']"
          >
            <template slot-scope="scope">
              <p>{{scope.row.checkStatus==0?'未审核':'已审核'}}</p>
            </template>
          </el-table-column>

        </el-table>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 50, 200, 500, 5000, 10000]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="报表字段" :visible.sync="dialogVisible">
      <!--<div class="dialog_content">
        <my-transfer v-model="chapterNameIdList" :inputList="chapterNameList"
                     :alias="{key: 'id',label: 'templateChapterName'}"></my-transfer>
      </div>-->

      <div class="dialog_content">
        <!--穿梭框-->
        <div class="my_transfer">
          <ul class="left_box">
            <li v-for="(item, index) in chapterNameList" :value="item.id" :class="{'left_li_checked':isLeftActive==item.id}"
                @click="checkLeft(item.id)">{{item.templateChapterName}}</li>
          </ul>
          <div class="but_left_box">
            <div class="but_left" @click="allRight">
              <i class="el-icon-d-arrow-right"></i>
            </div>
            <div class="but_left" @click="goRight">
              <i class="el-icon-arrow-right"></i>
            </div>
            <div class="but_left" @click="goLeft">
              <i class="el-icon-arrow-left"></i>
            </div>
            <div class="but_left" @click="allLeft">
              <i class="el-icon-d-arrow-left"></i>
            </div>
          </div>
          <ul class="right_box">
            <li v-for="(item, index) in checkedNameList" :value="item.id" :class="{'left_li_checked':isRightActive==item.id}"
                @click="checkRight(item.id)">{{item.templateChapterName}}</li>
          </ul>
          <div class="but_right_box">
            <div @click="upTop" class="but_right"><i class="el-icon-d-arrow-left transform90"></i></div>
            <div @click="upOne" class="but_right"><i class="el-icon-arrow-left transform90"></i></div>
            <div @click="downOne" class="but_right"><i class="el-icon-arrow-right transform90"></i></div>
            <div @click="downBottom" class="but_right"><i class="el-icon-d-arrow-right transform90"></i></div>
          </div>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="jumpPage()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="500px" :visible.sync="imgVisible" class="img-dialog">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import menuBottom from '../components/menuBottom.vue'
  import HeaderTop from '../components/headerTop.vue'
  import XunjianTopBox from '../components/xunjianTopBox.vue'
  import myTransfer from '../components/myTransfer.vue'
  import CustomTransfer from '../components/customTransfer.vue'
  import devTree from '../components/devTree.vue'

  import FileSaver from "file-saver";
  import XLSX from "xlsx";

  export default {
    data(){
      return{
        title:'生成报表 > 生成报表',
        tableDataResults:[], //tableDataResults:[],
        value_start:'',
        value_end:'',
        ajaxTableData:{page:1, size:10},
        dialogVisible: false,
        chapterNameIdList:[1,2,3],
        chapterNameList:[
        	{
            disabled: false,
            id: 1,
            templateChapterName: "识别结果"
          },
          {
            disabled: false,
            id: 2,
            templateChapterName: "识别类型"
          },
          {
            disabled: false,
            id: 3,
            templateChapterName: "点位名称"
          },
          {
            disabled: false,
            id: 4,
            templateChapterName: "识别时间"
          },{
            disabled: false,
            id: 5,
            templateChapterName: "设备区域"
          },
          {
            disabled: false,
            id: 6,
            templateChapterName: "间隔名称"
          },
          {
            disabled: false,
            id: 7,
            templateChapterName: "设备名称"
          },
          {
            disabled: false,
            id: 8,
            templateChapterName: "设备类型"
          },
          {
            disabled: false,
            id: 9,
            templateChapterName: "表计类型"
          },
          {
            disabled: false,
            id: 10,
            templateChapterName: "设备外观类型"
          },
          {
            disabled: false,
            id: 11,
            templateChapterName: "发热类型"
          },{
            disabled: false,
            id: 12,
            templateChapterName: "识别状态"
          },
          /*{
            disabled: false,
            id: 13,
            templateChapterName: "审核结果"
          },*/
          {
            disabled: false,
            id: 14,
            templateChapterName: "环境温度"
          },
          {
            disabled: false,
            id: 15,
            templateChapterName: "环境湿度"
          },
          {
            disabled: false,
            id: 16,
            templateChapterName: "环境风速"
          },
          {
            disabled: false,
            id: 17,
            templateChapterName: "告警等级"
          },
          {
            disabled: false,
            id: 18,
            templateChapterName: "采集信息"  //irProjSaveTypeId  1,红外，2，可见光
          },{
            disabled: false,
            id: 19,
            templateChapterName: "是否审核"
          }


        ],
        checkedNameList:[],
        alias:[{id:1,templateChapterName:'qqq'},{id:2,templateChapterName:'rrr'}],
        isLeftActive:-1,
        isRightActive:-1,
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

        checkAllMeterType: false,
        checkedMeterType: [],
        listMeterType: [],
        isIndeterminateMeterType: false,
        moreMeterType:false,

        checkAllFaceType: false,
        checkedFaceType: [],
        listFaceType: [],
        isIndeterminateFaceType: false,
        moreFaceType:false,

        currentPage:1,
        total:1,

        toTreeData:{
          quyu:[],
          type:[],
          recon:[],
          meter:[],
          face:[]
        },
        tableDataAllExcel:[],
        tableVisibleObj:{
          1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true,
          11:true,12:true,13:true,14:true,15:true,16:true,17:true,18:true,19:true,
        },
        imgVisible: false,
        dialogImgUrl: '',
        imgUrlBefore: url_img + '/smcsp/',
      }
    },
    components: {
      HeaderTop,
      XunjianTopBox,
      myTransfer,
      CustomTransfer,
      menuBottom,
      devTree
    },
    mounted(){
    	this.init()
      this.value_start = this.convertToLateDate()
      this.value_end = this.getDateTime()
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

        })

        _this.ajax_api('get',url_api + '/device-type?size=100',null,true,function (res) {
          //console.log(res.data)
          let inspect = res.data.items
          let result = inspect.filter(item => {
            return item.name >2000
          })
          _this.listDevType = result

        })

        _this.ajax_api('get',url_api + '/recon-type?size=30',null,true,function (res) {
          //console.log(res.data)
          let result = res.data.items
          _this.listReconType = result
        })

        _this.ajax_api('get',url_api + '/meter-type?size=100',null,true,function (res) {
          //console.log(res.data)
          let inspect = res.data.items
          _this.listMeterType = inspect
        })

        _this.ajax_api('get',url_api + '/face-type?size=100',null,true,function (res) {
          //console.log(res.data)
          let inspect = res.data.items
          _this.listFaceType = inspect

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

      handleCheckAllChangeMeterType(val) {
        this.checkedMeterType = val ? this.listMeterType : [];
        this.isIndeterminateMeterType = false;
      },
      handleCheckedCitiesChangeMeterType(value) {
        let checkedCount = value.length;
        this.checkAllMeterType = checkedCount === this.listMeterType.length;
        this.isIndeterminateMeterType = checkedCount > 0 && checkedCount < this.listMeterType.length;
      },
      moreMeterTypeF(value){
        if(value){
          $('.all_content_meter_type').height('auto')
        }else {
          $('.all_content_meter_type').height('20px')
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

      alertBox(){
        this.dialogVisible = true
      },
      handleClose(done) {
        /*this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});*/
      },
      jumpPage(){
      	let _this = this
        _this.dialogVisible = false
        //console.log(_this.checkedNameList)  //tableVisibleObj
        if(_this.checkedNameList.length>1){
          for(let key in _this.tableVisibleObj){
            _this.tableVisibleObj[key] = false
          }
        }
        for(let i=0;i<_this.checkedNameList.length;i++){
          _this.tableVisibleObj[_this.checkedNameList[i].id] = true
        }
        //console.log(_this.tableVisibleObj)
      },
      //穿梭框
      checkLeft(value){
      	let that = this
      	//alert(value)
        that.isLeftActive = value
      },
      checkRight(value){
        let that = this
        that.isRightActive = value
      },
      goRight(){
        let that = this
      	if(that.isLeftActive == -1){
      		alert('请选择')
          return
        }
        let newLeftArr = that.chapterNameList.filter(item => item.id !== that.isLeftActive);
        let newRightArr = that.chapterNameList.filter(item => item.id == that.isLeftActive);
        //console.log(newLeftArr)
        that.chapterNameList = newLeftArr
        that.checkedNameList.push(newRightArr[0])
        that.isLeftActive = -1
        that.isRightActive = -1
      },
      goLeft(){
        let that = this
        if(that.isRightActive == -1){
          alert('请选择')
          return
        }
        let newRightArr = that.checkedNameList.filter(item => item.id !== that.isRightActive);
        let newLeftArr = that.checkedNameList.filter(item => item.id == that.isRightActive);
        //console.log(newLeftArr)
        that.checkedNameList = newRightArr
        that.chapterNameList.push(newLeftArr[0])
        that.isLeftActive = -1
        that.isRightActive = -1
      },
      allRight(){
        let that = this
        that.checkedNameList.push.apply(that.checkedNameList,that.chapterNameList)
        that.chapterNameList = []
        that.isLeftActive = -1
      },
      allLeft(){
        let that = this
        that.chapterNameList.push.apply(that.chapterNameList,that.checkedNameList)
        that.checkedNameList = []
        that.isRightActive = -1
      },
      upTop(){
        let indexNum = 0;
        let newRightArr = this.checkedNameList.filter(item => item.id == this.isRightActive);
        for(let i=0; i<newRightArr.length; i++){
          indexNum = this.checkedNameList.indexOf(newRightArr[i])
          if(indexNum > 0){
            this.checkedNameList.splice(0, 0, newRightArr[i]);
            this.checkedNameList.splice(indexNum + 1, 1);
          }
        }
      },
      upOne(){
        let indexNum = 0;
        let newRightArr = this.checkedNameList.filter(item => item.id == this.isRightActive);
        for(let i=0; i<newRightArr.length; i++){
          indexNum = this.checkedNameList.indexOf(newRightArr[i])
          if(indexNum > 0){
            this.checkedNameList.splice(indexNum - 1, 0, newRightArr[i]);
            this.checkedNameList.splice(indexNum + 1, 1);
          }
        }
      },
      downOne(){
        let indexNum = 0;
        let newRightArr = this.checkedNameList.filter(item => item.id == this.isRightActive);
        for(let i=0; i<newRightArr.length; i++){
          indexNum = this.checkedNameList.indexOf(newRightArr[i]);
          if(indexNum > -1 && indexNum != this.checkedNameList.length - 1){
            this.checkedNameList.splice(indexNum + 2, 0, newRightArr[i]);
            this.checkedNameList.splice(indexNum, 1);
          }
        }
      },
      downBottom(){
        let indexNum = 0;
        let newRightArr = this.checkedNameList.filter(item => item.id == this.isRightActive);
        for(let i=0; i<newRightArr.length; i++){
          indexNum = this.checkedNameList.indexOf(newRightArr[i])
          if(indexNum > -1 && indexNum != this.checkedNameList.length - 1){
            this.checkedNameList.splice(this.checkedNameList.length, 0, newRightArr[i]);
            this.checkedNameList.splice(indexNum, 1);
          }
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
      },

      getTableData(){
        let _this = this
        _this.ajaxTableData.startTime = _this.value_start+' 00:00:00'
        _this.ajaxTableData.endTime = _this.value_end+' 23:59:59'
        //_this.ajaxTableData.pointIds = ''
        //console.log(_this.ajaxTableData)
        _this.ajax_api('post',url_api + '/point-history',
          _this.ajaxTableData,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data.items)
              _this.tableDataResults = res.data.items
              _this.total = res.data.total
              //自己得到表格显示的内容
              _this.tableDataAllExcel = []
              for(let i=0;i<res.data.items.length;i++){

              }
            }
          })

      },

      treeCheck(data){
        //console.log(data)
        this.ajaxTableData.pointIds = data.toString()
      },
      //查询
      queryList(){
        let _this = this
        _this.getTableData()
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

        this.value_end = this.getDateTime()
        this.value_start = this.convertToLateDate()
        this.ajaxTableData.pointIds = ''
        this.getTableData()
        for(let key in this.tableVisibleObj){
          this.tableVisibleObj[key] = true
        }
      },

      exportExcelRes(){
        let _this = this
        if(_this.checkedNameList.length<1){
          _this.$message({
              type: 'success',
              message: '请选择自定义报表',
            });
          return
        }
        //console.log(_this.checkedNameList)

        var url = url_api + '/file/download';
        var xhr = new XMLHttpRequest();
        var data = {
          dataSet: [
            { taskName:"12", deviceRegion:"13"},
            { taskName:"12", deviceRegion:"13"}
          ],
          heads: {taskName:"任务名称", deviceRegion:"设备区域", },
          sheetName: "test"
        };
        xhr.open('post', url, true);    // 也可以使用POST方式，根据接口
        xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
        xhr.setRequestHeader("token",localStorage.getItem('token'));
        xhr.send(JSON.stringify(data))
        xhr.responseType = "blob";  // 返回类型blob
        // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
        xhr.onload = function () {
          // 请求完成
          if (this.status === 200) {
            // 返回200
            var blob = this.response;
            var reader = new FileReader();
            reader.readAsDataURL(blob);  // 转换为base64，可以直接放入a表情href
            reader.onload = function (e) {
              // 转换完成，创建一个a标签用于下载
              var a = document.createElement('a');
              a.download = 'data.xlsx';
              a.href = e.target.result;
              $("body").append(a);  // 修复firefox中无法触发click
              a.click();
              $(a).remove();
            }
          }
        };
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
      getDateTimeHhMmSs(){ //默认显示今天
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
        return y + "-" + m + "-" + d + "-" + H + "-" + mm + "-" + ss;
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

      //irProjSaveTypeId  1,红外，2，可见光
      openImg(url) {
        let _this = this
        if (url) {
          _this.imgVisible = true
          _this.dialogImgUrl = url
          //_this.$emit('isVideo', false)
        }
      },

      //暂时导出结果
      exportExcel_zanshi() {
        var _this = this
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称 name生成报表
            "生成报表" + _this.getDateTimeHhMmSs() + ".xlsx"
            //"sheetjs.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      }

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
  .reports_wrap
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
          width: calc(100% - 240px);
          float: left;
          overflow: hidden;
          .el-radio
            margin-bottom 10px
          .el-checkbox
            width 210px
            margin 0 30px 10px 10px
        .all_content_quyu,.all_content_recon_type,.all_content_dev_type,.all_content_meter_type,
        .all_content_face_type
          height 20px


    .reports_tools
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
            line-height 30px
            img
              width 16px
              height 16px
              margin-right 4px

    .content
      height calc(100% - 300px)
      background #fff
      .left
        width 300px
        float left
        height 100%
        border 1px solid #cae7ee
        box-sizing border-box
      .right
        width calc(100% - 300px)
        float left
        height 100%
        border 1px solid #cae7ee
        box-sizing border-box
        position relative
        .title
          background linear-gradient(#e3f2ee,#cae7ee)
          background #e3f2ee/0
          padding-left 10px
          height 30px
          line-height 30px
          box-sizing border-box
        .page
          position absolute
          bottom 0
        .table_box
          max-height calc(100% - 64px)
          overflow-y auto

  div>>>
    .el-dialog
      background #d7efec
      width: 48%;
      min-width: 800px;
      padding-bottom: 6px;
    .dialog_content
      background white
      border 1px solid #90e8c6
      padding 20px 50px
      .my_transfer
        display flex
        justify-content space-around
        height 400px
        ul
          float left
          width 200px
          height 360px
          border 1px solid #d3d3d3
          overflow auto
          li
            padding 4px 8px
          :hover
            background #f5f7fa
          .left_li_checked
            background #d7efec


        .but_left_box
          float left
          display flex
          flex-direction column
          justify-content center
          margin 0 20px
          .but_left
            border: 1px solid gray;
            padding: 2px 25px;
            border-radius: 3px;
            margin-left: 0;
            background-color: #149eb0;
            margin-bottom: 8px;
            height: 27px;
            cursor pointer
            color white
            font-size 20px
            display flex
            justify-content center
            align-items center

        .but_right_box
          float left
          display flex
          flex-direction column
          justify-content center
          margin 0 20px
          .but_right
            border: 1px solid gray;
            padding: 2px 25px;
            border-radius: 3px;
            margin-left: 0;
            background-color: #fff;
            margin-bottom: 8px;
            height: 27px;
            cursor pointer
            color #149eb0
            font-size 20px
            display flex
            justify-content center
            align-items center

          .transform90
            transform rotate(90deg)

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
    div>>>
      .el-dialog__title
        display inline-block
        position absolute
        font-size 14px
        top 4px
        left 10px
  div>>>
    .el-table::before
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0px;

</style>

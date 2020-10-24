<template>
  <div class="task_infrared_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="xunjian_wrap">
      <div class="li_xunjian_title" style="height:auto">
        <p style="line-height: 28px">任务名称：</p>
        <el-input @input="saveName" v-model="input_task_name" placeholder="请输入内容" size="mini" style="width: 190px"></el-input>
        <p style="line-height: 28px;margin-left: 20px">自定义任务描述：</p>
        <el-input v-model="input_content" placeholder="请输入内容" size="mini" style="width: 290px"></el-input>
      </div>
      <div class="li_xunjian_title" style="height:auto">
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
      </div>
      <div class="li_xunjian_title">
        <p>设备区域：</p>
        <div class="all_content all_content_quyu">
          <el-checkbox style="float: left" :indeterminate="isIndeterminateQuyu"
                       v-model="checkAllQuyu" @change="handleCheckAllChange">全部</el-checkbox>
          <el-checkbox-group v-model="checkedQuyu" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item,index) in citiesQuyu" :label="item.id"
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
            <el-checkbox v-for="(item,index) in listDevType" :label="item.id" :key="item.id">{{item.displayName}}</el-checkbox>
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
            <el-checkbox v-for="(item,index) in listReconType" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
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
            <el-checkbox v-for="(item,index) in listMeterType" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
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
            <el-checkbox v-for="(item,index) in listFaceType" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-checkbox v-model="moreFaceType" @change="moreFaceTypeF">查看更多</el-checkbox>
      </div>

    </div>
    <XunjianFindTool @xunjianFind="xunjianFind" :saveData="saveData" :savePutData="savePutData"
                     @importBox='importBox' :importImg="true"></XunjianFindTool>
    <div class="content">
      <div class="left">
        <devTree @devTreeKey="treeCheck" :toTreeData="toTreeData" :toTreeCheckData="toTreeCheckData"></devTree>
      </div>
      <div class="right">
        <taskTable :irBaseRobotId="irBaseRobotId" :irBaseInspectTypeId="irBaseInspectTypeId"
                   v-if="taskTableReset" :customTaskTable="customTaskTable"
        ></taskTable>
      </div>
    </div>
    <menuBottom></menuBottom>
    <el-dialog title="任务导入" :visible.sync="dialogVisibleImport" class="huizong_dialog">
      <div class="dialog_content">
        <div>
          <span>任务编制时间：</span>
          <el-date-picker size="mini" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="value_time_import1" type="datetime"
                          placeholder="" style="width: 180px">
          </el-date-picker>
          <span>结束时间：</span>
          <el-date-picker size="mini" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="value_time_import2"  type="datetime"
                          placeholder="" style="width: 180px">
          </el-date-picker>
          <span>任务名称：</span>
          <el-input v-model="input_task_name_import" placeholder="请输入内容" size="mini"
                    style="width: 150px"></el-input>
          <p @click="queryImport" style="display:inline-block;cursor:pointer;">
            <img style="width: 16px;height: 16px;vertical-align: middle" src="../../static/images/query.png" alt="">
            <span style="vertical-align: middle">查询</span>
          </p>

        </div>
        <div style="margin-top: 10px" class="huizong_table">
          <p style="background: #d7efec;height:26px;line-height:26px;padding-left:8px;">任务编制列表</p>
          <el-table stripe
                    :data="tableDataImport"
                    border @selection-change="changeFun"
                    style="width: 100%">
            <el-table-column
              prop="executTime" label=""
              align="center" type="selection">
            </el-table-column>
            <el-table-column
              prop="name" label="任务名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="createTime" label="编制时间"
              align="center">
            </el-table-column>

          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleImport = false">取 消</el-button>
        <el-button type="primary" @click="importPrimary">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import devTree from '../components/devTree.vue'
  import taskTable from '../components/tasksTable.vue'
  import HeaderTop from '../components/headerTop.vue'
  import XunjianTopBox from '../components/xunjianTopBox.vue'
  import XunjianFindTool from '../components/xunjianFindTool.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'自定义任务 > 自定义任务',

        radio: '',
        radio_items:[
          {
            value:1,
            label:'1'
          },
        ],
        radio_items_infrared:[],
        radio_infrared:5,

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

        irBaseRobotId:1,
        irBaseInspectTypeId:1,

        toTreeData:{
          quyu:[],
          type:[],
          recon:[],
          meter:[],
          face:[]
        },
        saveData:{
          description:'',
          irBaseInspectTypeId:'1',
          irBaseRobotId:1,
          isCustom:'1',
          name:'自定义任务',
          points:'',
        },
        savePutData:{},
        taskTableReset:true,
        input_task_name:'',
        input_content:'',
        dialogVisibleImport:false,
        value_time_import1:'',
        value_time_import2:'',
        input_task_name_import:'',
        tableDataImport:[],
        queryImportData:{},
        checkedTaskArr:[],
        customTaskTable:[],

        toTreeCheckData:[],  //默认选择的树节点
        getTreeDataDev:{},
        dataTreeAll:[],
        checkedQuyuTreeIds:[],
        checkedDevTypeTreeIds:[],
        checkedReconTypeTreeIds:[],
        checkedMeterTypeTreeIds:[],
        checkedFaceTypeTreeIds:[],
      }
    },
    components: {
      devTree,
      taskTable,
      HeaderTop,
      XunjianTopBox,
      XunjianFindTool,
      menuBottom
    },
    mounted(){
      let _this = this
      _this.getAllTree()
    },
    methods: {

      init(){
        let _this = this
        _this.ajax_api('get',url_api + '/inspect-type?size=30',null,true,function (res) {
          let inspect = res.data.items
          //console.log(inspect)
          let result = inspect.filter(item => {
            return item.parentId == 0
          })
          let result2 = inspect.filter(item => {
            return item.parentId == 3
          })
          _this.radio_items = result
          _this.radio_items_infrared = []
        })

        _this.ajax_api('get',url_api + '/device/region',null,true,function (res) {
          //console.log(res.data)
          let inspect = res.data
          let result = inspect.filter(item => {
            return item.parentId == 4
          })
          _this.citiesQuyu = result
          //_this.checkedQuyu = [result[1],result[3]]
          /*let arrQuIds = []
          for(let i=0;i<result.length;i++){
            arrQuIds.push(result[i].id)
          }
          if(result.length>0){
            _this.checkedQuyu = arrQuIds
            _this.isIndeterminateQuyu = true
          }*/
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
          //console.log(inspect)
        })

      },
      getAllTree(){
        let _this = this
        _this.ajax_api('get',url_api + '/point/tree',
          null,
          true,
          function (res) {
            if(res.code == 200){
              _this.dataTreeAll = res.data
            }
            _this.init()
          })
      },
      //勾选类型区域等 设备树同时勾选
      updateTreeCheck(){
        let _this = this
        let arr = []
        return new Promise(function(resolve) {
          //console.log(_this.getTreeDataDev)
          _this.ajax_api('get',url_api + '/point/tree',
            _this.getTreeDataDev,  //{reconTypeIds:'5'},
            true,
            function (res) {
              if(res.code == 200){
                arr = _this.readNodes(res.data)
                resolve(arr);
              }
            })
        });

        /*_this.ajax_api('get',url_api + '/point/tree',
          _this.getTreeDataDev,  //{reconTypeIds:'5'},
          true,
          function (res) {
            if(res.code == 200){
              arr = _this.readNodes(res.data)
              cb(arr)
            }
          })*/

      },

      readNodes (nodes = [], arr = []) {
        let _this = this
        for (let item of nodes) {
          //arr.push(item.id)
          if (item.treeNode && item.treeNode.length){
            _this.readNodes(item.treeNode, arr)
          }else {
            arr.push(item.id)
          }
        }
        return arr
      },

      handleCheckAllChange(val) {
        let _this = this
        let idArr = []
        if(val){
          for(let i=0;i<_this.citiesQuyu.length;i++){
            idArr.push(_this.citiesQuyu[i].id)
          }
        }
        this.checkedQuyu = idArr;
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
        let _this = this
        let idArr = []
        if(val){
          for(let i=0;i<_this.listDevType.length;i++){
            idArr.push(_this.listDevType[i].id)
          }
        }
        _this.checkedDevType = idArr;
        _this.isIndeterminateDevType = false;
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
        let _this = this
        let idArr = []
        if(val){
          for(let i=0;i<_this.listReconType.length;i++){
            idArr.push(_this.listReconType[i].id)
          }
        }
        this.checkedReconType = idArr;
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
        let _this = this
        let idArr = []
        if(val){
          for(let i=0;i<_this.listMeterType.length;i++){
            idArr.push(_this.listMeterType[i].id)
          }
        }
        _this.checkedMeterType = idArr;
        _this.isIndeterminateMeterType = false;
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
        let _this = this
        let idArr = []
        if(val){
          for(let i=0;i<_this.listFaceType.length;i++){
            idArr.push(_this.listFaceType[i].id)
          }
        }
        _this.checkedFaceType = idArr;
        _this.isIndeterminateFaceType = false;
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
      treeCheck(data){
        this.saveData.points = data.toString()
        this.savePutData.points = data.toString()
      },
      //刷新任务列表
      xunjianFind(){
        this.taskTableReset= false;
        this.$nextTick(() => {
          this.taskTableReset= true;
        });
      },
      importBox(){
      	let _this = this
        _this.dialogVisibleImport = true
        _this.getImportDataTable()
      },
      queryImport(){
        /*value_time_import1:'',
          value_time_import2:'',
          input_task_name_import:'',*/
        let  _this = this
        _this.queryImportData = {
        	startTime:_this.value_time_import1,
          endTime:_this.value_time_import2,
          taskName:_this.input_task_name_import
        }
        _this.getImportDataTable()
      },
      getImportDataTable(){
      	let _this = this
        _this.ajax_api('get',url_api + '/task/taskList',
          _this.queryImportData,true,
          function (res) {
            if(res.code == 200){
            	//console.log(res.data.items)
              _this.tableDataImport = res.data.items
            }
          })
      },
      changeFun(val){
        this.checkedTaskArr = []
        for(var key in val){
          this.checkedTaskArr.push(val[key])
        }
      },
      importPrimary(){
      	let _this = this
        _this.dialogVisibleImport = false
        _this.customTaskTable = _this.checkedTaskArr
        //console.log(this.customTaskTable)
        this.taskTableReset= false;
        this.$nextTick(() => {
          this.taskTableReset= true;
        });
      },
      saveName(){
        this.saveData.name = this.input_task_name?this.input_task_name:'自定义任务'
      },
    },
    watch:{
      checkedQuyu:function (newVal,oldVal) {
        let _this = this
        //console.log(newVal,oldVal)
        if(newVal.length<1){
          _this.checkedQuyuTreeIds = []
          _this.toTreeCheckData = []
          _this.toTreeCheckData = _this.toTreeCheckData
            .concat(_this.checkedQuyuTreeIds)
            .concat(_this.checkedDevTypeTreeIds)
            .concat(_this.checkedReconTypeTreeIds)
            .concat(_this.checkedMeterTypeTreeIds)
            .concat(_this.checkedFaceTypeTreeIds)
        }else {
          let quyuArr = []
          for(let i=0;i<newVal.length;i++){
            let li = _this.dataTreeAll[0].treeNode.filter(item => {
              return item.id == newVal[i]
            })
            quyuArr.push.apply(quyuArr,_this.readNodes(li))
          }
          _this.checkedQuyuTreeIds = quyuArr
          _this.toTreeCheckData = []
          _this.toTreeCheckData = _this.toTreeCheckData
            .concat(_this.checkedQuyuTreeIds)
            .concat(_this.checkedDevTypeTreeIds)
            .concat(_this.checkedReconTypeTreeIds)
            .concat(_this.checkedMeterTypeTreeIds)
            .concat(_this.checkedFaceTypeTreeIds)
        }
      },
      checkedDevType:function (newVal,oldVal) {
        let _this = this
        if(newVal.length<1){
          _this.getTreeDataDev.typeIds = null
          _this.checkedDevTypeTreeIds = []
          _this.toTreeCheckData = []
          _this.toTreeCheckData = _this.toTreeCheckData
            .concat(_this.checkedQuyuTreeIds)
            .concat(_this.checkedDevTypeTreeIds)
            .concat(_this.checkedReconTypeTreeIds)
            .concat(_this.checkedMeterTypeTreeIds)
            .concat(_this.checkedFaceTypeTreeIds)
        }else {
          _this.getTreeDataDev.typeIds = newVal.toString()
          //_this.toTreeData.recon = newVal
          _this.updateTreeCheck().then(updateTreeArrAdd)
          function updateTreeArrAdd(x) {
            //console.log(x)
            _this.checkedDevTypeTreeIds = x
            _this.toTreeCheckData = []
            _this.toTreeCheckData = _this.toTreeCheckData
              .concat(_this.checkedQuyuTreeIds)
              .concat(_this.checkedDevTypeTreeIds)
              .concat(_this.checkedReconTypeTreeIds)
              .concat(_this.checkedMeterTypeTreeIds)
              .concat(_this.checkedFaceTypeTreeIds)
          }
        }

      },
      checkedReconType:function (newVal,oldVal) {
        let _this = this
        if(newVal.length<1){
          _this.getTreeDataDev.reconTypeIds = null
          _this.checkedReconTypeTreeIds = []
          _this.toTreeCheckData = []
          _this.toTreeCheckData = _this.toTreeCheckData
            .concat(_this.checkedQuyuTreeIds)
            .concat(_this.checkedDevTypeTreeIds)
            .concat(_this.checkedReconTypeTreeIds)
            .concat(_this.checkedMeterTypeTreeIds)
            .concat(_this.checkedFaceTypeTreeIds)
        }else {
          _this.getTreeDataDev.reconTypeIds = newVal.toString()
          _this.getTreeDataDev.faceTypeIds = null
          _this.getTreeDataDev.meterTypeIds = null
          _this.getTreeDataDev.typeIds = null
          //_this.toTreeData.recon = newVal
          //console.log(_this.getTreeDataDev.reconTypeIds)
          _this.updateTreeCheck().then(updateTreeArrAdd)
          function updateTreeArrAdd(x) {
            _this.checkedReconTypeTreeIds = x
            //console.log(x)
            _this.toTreeCheckData = []
            _this.toTreeCheckData = _this.toTreeCheckData
              .concat(_this.checkedQuyuTreeIds)
              .concat(_this.checkedDevTypeTreeIds)
              .concat(_this.checkedReconTypeTreeIds)
              .concat(_this.checkedMeterTypeTreeIds)
              .concat(_this.checkedFaceTypeTreeIds)
          }
        }
      },
      checkedMeterType:function (newVal,oldVal) {
        let _this = this
        if(newVal.length<1){
          _this.getTreeDataDev.meterTypeIds = null
          _this.checkedMeterTypeTreeIds = []
          _this.toTreeCheckData = []
          _this.toTreeCheckData = _this.toTreeCheckData
            .concat(_this.checkedQuyuTreeIds)
            .concat(_this.checkedDevTypeTreeIds)
            .concat(_this.checkedReconTypeTreeIds)
            .concat(_this.checkedMeterTypeTreeIds)
            .concat(_this.checkedFaceTypeTreeIds)
        }else {
          _this.getTreeDataDev.meterTypeIds = newVal.toString()
          _this.getTreeDataDev.faceTypeIds = null
          _this.getTreeDataDev.reconTypeIds = null
          _this.getTreeDataDev.typeIds = null
          _this.updateTreeCheck().then(updateTreeArrAdd)
          function updateTreeArrAdd(x) {
            //console.log(x)
            _this.checkedMeterTypeTreeIds = x
            _this.toTreeCheckData = []
            _this.toTreeCheckData = _this.toTreeCheckData
              .concat(_this.checkedQuyuTreeIds)
              .concat(_this.checkedDevTypeTreeIds)
              .concat(_this.checkedReconTypeTreeIds)
              .concat(_this.checkedMeterTypeTreeIds)
              .concat(_this.checkedFaceTypeTreeIds)
          }
        }
      },
      checkedFaceType:function (newVal,oldVal) {
        let _this = this
        if(newVal.length<1){
          _this.getTreeDataDev.faceTypeIds = null
          _this.checkedFaceTypeTreeIds = []
          _this.toTreeCheckData = []
          _this.toTreeCheckData = _this.toTreeCheckData
            .concat(_this.checkedQuyuTreeIds)
            .concat(_this.checkedDevTypeTreeIds)
            .concat(_this.checkedReconTypeTreeIds)
            .concat(_this.checkedMeterTypeTreeIds)
            .concat(_this.checkedFaceTypeTreeIds)
        }else {
          _this.getTreeDataDev.faceTypeIds = newVal.toString()
          _this.getTreeDataDev.meterTypeIds = null
          _this.getTreeDataDev.reconTypeIds = null
          _this.getTreeDataDev.typeIds = null
          _this.updateTreeCheck().then(updateTreeArrAdd)
          function updateTreeArrAdd(x) {
            //console.log(x)
            _this.checkedFaceTypeTreeIds = x
            _this.toTreeCheckData = []
            _this.toTreeCheckData = _this.toTreeCheckData
              .concat(_this.checkedQuyuTreeIds)
              .concat(_this.checkedDevTypeTreeIds)
              .concat(_this.checkedReconTypeTreeIds)
              .concat(_this.checkedMeterTypeTreeIds)
              .concat(_this.checkedFaceTypeTreeIds)
          }
        }
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
  .task_infrared_wrap
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


    .content
      background white
      height calc(100% - 376px)
      .left
        width 300px
        height 100%
        float left
      .right
        float left
        width calc(100% - 300px)
        height 100%

    div>>>
      .el-dialog
        background #d7efec
        width: 90%;
        min-width: 1000px;
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
            padding 10px 10px
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

        .el-dialog__footer
          background #fff
          border 1px solid #90e8c6
          border-top none
          margin 1px 8px 5px
          padding 5px 10px
          .el-button
            padding 8px 22px
        .huizong_table /deep/ .el-table th
          padding 4px 0
        .huizong_table /deep/ .el-table td
          padding 4px 0
</style>

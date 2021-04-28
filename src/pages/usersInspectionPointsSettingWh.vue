<template>
  <div class="task_com_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <!--<XunjianTopBox></XunjianTopBox>-->
    <div class="xunjian_wrap">
      <div class="li_xunjian_title" style="height:auto">
        <p>巡检类型：</p>
        <div class="all_content">
          <el-radio v-model="radio" v-for="item in radio_items"
                    :key="item.id" :disabled="item.id!=1"
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
    <XunjianFindTool @xunjianFind="xunjianFind" :saveData="saveData" :savePutData="savePutData"></XunjianFindTool>
    <div class="content">
      <div class="left">
        <devTree @devTreeKey="treeCheck" :toTreeData="toTreeData" :toTreeCheckData="toTreeCheckData"></devTree>
      </div>
      <div class="right">
        <el-upload
            class="upload-demo"
            :action=pointsExcelUpdate
            :headers="importHeaders"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            accept=".xls,.xlsx"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :show-file-list="false"
            :file-list="fileList">
          <el-button size="small" type="primary" class="">点位导入</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过一个</div>
        </el-upload>
        <div v-if="false" class="import_but">
          点位导入
        </div>
        <div @click="exportPoints" class="export_but">
          点位导出
        </div>
        <div class="add_but">
          <el-button size="mini" @click="handleAdd()"
                    style="border-color:#1D9A9A" type="primary">新增点位</el-button>
        </div>
        <div class="table_point_wrap">
          <el-table size="mini" class="table_box" ref="mytable"
                    :data="dataTableNew" v-if="hardReset"
                    border
                    style="width: 100%;">
            <el-table-column
                prop="date" align="center"
                label="序号" type="index" :index="index"
                width="50">
            </el-table-column>

            <el-table-column
                prop="name" align="center" width="350"
                label="点位名称"
            >
              <template slot-scope="scope">
                <el-input
                    v-if="scope.row.edit"
                    size="small"
                    v-model="scope.row['name']"
                    :placeholder="'请输入'"
                ></el-input>
                <span v-if="!scope.row.edit">{{scope.row['name']}}</span>
              </template>
            </el-table-column>

            <el-table-column
                prop="unit" align="center"
                label="单位" width="150"
            >
              <template slot-scope="scope">
                <el-input
                    v-if="scope.row.edit"
                    size="small"
                    v-model="scope.row['unit']"
                    :placeholder="'请输入'"
                ></el-input>
                <span v-if="!scope.row.edit">{{scope.row['unit']}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="x" align="center"
                label="x" width="100"
            >
              <template slot-scope="scope">
                <el-input
                    v-if="scope.row.edit"
                    size="small"
                    v-model="scope.row['x']"
                    :placeholder="'请输入'"
                ></el-input>
                <span v-if="!scope.row.edit">{{scope.row['x']}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="y" align="center"
                label="y" width="100"
            >
              <template slot-scope="scope">
                <el-input
                    v-if="scope.row.edit"
                    size="small"
                    v-model="scope.row['y']"
                    :placeholder="'请输入'"
                ></el-input>
                <span v-if="!scope.row.edit">{{scope.row['y']}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="z" align="center"
                label="z" width="100"
            >
              <template slot-scope="scope">
                <el-input
                    v-if="scope.row.edit"
                    size="small"
                    v-model="scope.row['z']"
                    :placeholder="'请输入'"
                ></el-input>
                <span v-if="!scope.row.edit">{{scope.row['z']}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="createTime" align="center"
                label="创建时间"
            >
            </el-table-column>
            <el-table-column
                prop="abnormalPointNum" align="center"
                label="操作" width="150"
            >
              <template slot-scope="scope">
                <!-- 全局控制的编辑 -->
                <div v-if="is_edit&&scope.row.add==undefined" style="display: inline-block;">
                  <!-- 编辑 -->
                  <el-button
                      size="mini" style="border-color:#1D9A9A"
                      v-if="!scope.row.edit"
                      @click="handleEdit(scope.$index, scope.row)"
                      type="primary"
                  >编辑</el-button>
                  <!-- 保存 -->
                  <el-button
                      size="mini"
                      type="success"
                      :plain="true"
                      v-if="scope.row.edit"
                      @click="handleSave(scope.$index, scope.row)"
                  >保存</el-button>
                </div>
                <!-- 添加控制 -->
                <div v-if="scope.row.add!=undefined&&scope.row.add" style="display: inline-block;">
                  <!-- 保存 -->
                  <el-button
                      size="mini"
                      type="success"
                      :plain="true"
                      v-if="scope.row.edit"
                      @click="handleSaveF(scope.$index, scope.row)"
                  >保存</el-button>
                </div>
                <!-- 全局控制删除 -->
                <el-button
                    size="mini"
                    v-if="is_delete&&scope.row.add==undefined"
                    :plain="true"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>

          </el-table>
          <div class="page_box">
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
    </div>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import menuBottom from '../components/menuBottom.vue'
  import devTree from '../components/devTree.vue'
  import HeaderTop from '../components/headerTop.vue'
  import XunjianTopBox from '../components/xunjianTopBox.vue'
  import XunjianFindTool from '../components/xunjianFindToolDianwei.vue'
  import taskTable from '../components/tasksTable.vue'

  export default {
    data(){
      return{
        title:'点位设置 > 典型点位库维护',
        currentPage: 1,

        radio: 1,
        radio_items:[
          {
            value:1,
            label:'全面巡检~'
          },
          {
            value:2,
            label:'例行巡视'
          },
          {
            value:3,
            label:'专项巡视'
          },
          {
            value:4,
            label:'特殊巡视'
          },
          {
            value:5,
            label:'紧急任务'
          },
          {
            value:6,
            label:'多光谱任务'
          },
        ],
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
          isCustom:'0',
          name:'点位',
          points:'',
        },
        savePutData:{},
        taskTableReset:true,
        fileList: [],
        importHeaders: {
          token: localStorage.getItem('token')
        },
        pointsExcelUpdate: url_api + '/file/uploadExcel',  //POST /ui/file/uploadExcel

        dataTable:[],
        ajaxTableData: {page:1, size:10},
        total:0,
        dataTableNew:[],
        is_edit: true, //是否可编辑
        is_delete: true, //是否可删除
        space_color: true, //隔行变色
        hardReset: true,
        new_date_json: {}, //数据结构新增


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
      HeaderTop,
      XunjianTopBox,
      XunjianFindTool,
      devTree,
      taskTable,
      menuBottom,
    },
    mounted(){
      let _this = this
      _this.init()
      _this.getAllTree()
      _this.getPointList()
    },
    methods: {
      init(){
        let _this = this
        _this.ajax_api('get',url_api + '/inspect-type?size=30',null,true,function (res) {
          //console.log(res.data)
          let inspect = res.data.items
          let result = inspect.filter(item => {
            return item.parentId == 0
          })
          _this.radio_items = result
        })

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
          })
      },

      getPointList(){
        let _this = this
        _this.ajax_api('get',url_api + '/point/pointList',
          _this.ajaxTableData,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data)
              _this.dataTable = res.data.items
              _this.total = res.data.total
              _this.initEditAttribute()
            }
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

      //初始化编辑属性
      initEditAttribute() {
        var _this = this;

        if (_this.dataTable.length > 0) {
          _this.dataTableNew = []
          //添加编辑事件
          for (var index in _this.dataTable) {
            _this.dataTable[index]["edit"] = false;
            _this.dataTableNew.push(_this.dataTable[index]);
          }
          if (Object.keys(this.new_date_json).length === 0) {
            //新增时，初始化数据结构
            this.initAddDataJson(_this.dataTable[0]);
          }

        }
        //console.log("tableData:", this.dataTableNew);
      },
      //编辑
      handleEdit(index, row) {
        //console.log(index, row);
        row.edit = true;
        this.hardReset= false
        this.$nextTick(() => {
          this.hardReset = true
        });
      },
      //保存  PUT /ui/point/updPoint/{id}
      handleSave(index, row) {
        let _this = this
        let updatePoint = {
          name:row.name,
          unit:row.unit,
          x:row.x,
          y:row.y,
          z:row.z
        }
        //console.log(index, row);
        row.edit = false;
        this.hardReset= false
        this.$nextTick(() => {
          this.hardReset = true
        });
        _this.ajax_api('put',url_api + '/point/updPoint/' + row.id,
          updatePoint,
          true, function (res) {
            if(res.code == 200){
              _this.$message({
                message: '修改成功',
                type: 'success',
              });
              //_this.getPointList()
            }else {
              _this.$message({
                message: '操作失败，请重试',
              });
            }
          })
      },
      tableRowClassName() {
        //选取DOM节点
        var trs = this.$refs.mytable.$el
          .getElementsByTagName("tbody")[0]
          .getElementsByTagName("tr");
        for (var i in trs) {
          if (i % 2 == 0) {
            //当隔行变色未true时改变颜色
            if (this.space_color) {
              trs[i].style.backgroundColor = "#fff";
            } else {
              trs[i].style.backgroundColor = "";
            }
          }
        }
      },

      handleSaveF(index, row) {
        let _this = this
        delete _this.dataTableNew[index].add;
        //console.log(index, row);
        row.createTime = _this.getDateTime()
        row.edit = false;
        this.hardReset= false
        this.$nextTick(() => {
          this.hardReset = true
        });
        _this.$message({
          message: '保存成功',
          type: 'success',
        });
      },
      //新增
      handleAdd() {
        var addDataJson = {};
        for (var key in this.new_date_json) {
          if (key === "edit") {
            delete addDataJson[key];
          } else if (key === "add") {
            delete addDataJson[key];
          } else {
            addDataJson[key] = "";
          }
        }
        addDataJson.edit = true;
        addDataJson.add = true;
        this.dataTableNew.unshift(addDataJson);
      },
      initAddDataJson(dataArray) {
        //新增时，初始化数据结构
        var dataJson = dataArray;
        var newDateJson = {};
        for (var key in dataJson) {
          if (key === "edit") {
            newDateJson[key] = "true";
          } else {
            newDateJson[key] = "";
          }
        }
        newDateJson["add"] = true;
        this.new_date_json = newDateJson;
      },
      //删除
      handleDelete(index, row) {
        //console.log(index, row);
        this.dataTableNew.splice(index, 1);
        this.$message({
          message: "删除成功！",
          type: "success"
        });
      },

      treeCheck(data){
        //console.log(data)
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
      //文件上传 导入点位表
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file.response);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeUpload(file) {
        //console.log(file)
        var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        // const isLt2M = file.size / 1024 / 1024 < 10
        if(!extension && !extension2) {
          this.$message({
            message: '上传文件只能是 xls、xlsx格式!',
            type: 'warning'
          });
        }
        // if(!isLt2M) {
        //     this.$message({
        //         message: '上传文件大小不能超过 10MB!',
        //         type: 'warning'
        //     });
        // }
        // return (extension || extension2) && isLt2M
        return extension || extension2
      },
      onSuccess(response, file, fileList){
        //console.log(response, file, fileList)
        console.log(response)
        if(response.code==200){
          this.$message({
            message: '导入成功',
            type: 'success'
          });
          setTimeout(function () {
            location.reload()
          },1000)
        }
      },
      exportPoints(){
        //console.log(this.saveData.points) //POST /ui/file/download
        let _this = this
        let points = _this.saveData.points.toString()
        /*_this.ajax_api('post',url_api + '/file/downloadExcel',points,true,function (res) {
          console.log(res)
        })*/
        /*_this.ajax_api('post',url_api + '/file/download',
          {
            dataSet: [
              {}
            ],
            heads: {},
            sheetName: "test"
          },true,function (res) {
          console.log(res)
        })*/
        if(points){
          //console.log(points)
          var url = url_api + '/file/downloadExcel?_='+ +new Date();
          var xhr = new XMLHttpRequest();
          xhr.open('post', url, true);    // 也可以使用POST方式，根据接口
          xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
          xhr.setRequestHeader("token",localStorage.getItem('token'));
          var a = points+''
          var b = points.toString()
          var c = points
          //console.log('a='+a+'|','b='+b,'c='+c,)
          xhr.send(a)
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
                a.download = 'Points-data.xlsx';
                a.href = e.target.result;
                $("body").append(a);  // 修复firefox中无法触发click
                a.click();
                $(a).remove();
              }
            }
          };
        }else {
          console.log('all')
          _this.$alert('请选择点位', '提示', {
            confirmButtonText: '确定',
            callback: action => {

            }
          })
        }




      },

      index(val){
        //(listQuery.page - 1) * listQuery.pageSize + scope.$index + 1
        return (this.ajaxTableData.page - 1)*this.ajaxTableData.size + val + 1
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.ajaxTableData.size = val
        this.getPointList()
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.ajaxTableData.page = val
        this.getPointList()
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
        return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + ss;
        //return y + "-" + m + "-" + d
      },

    },
    watch:{
      dataTableNew: function() {
        //监听数据变化f
        this.$nextTick(function() {
          /////方法
          this.tableRowClassName();
        });
      },

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
  .task_com_wrap
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
        .all_content_face_type
          height 20px


    .content
      background white
      height calc(100% - 344px)
      .left
        width 300px
        height 100%
        float left
      .right
        float left
        width calc(100% - 300px)
        height 100%
        position relative
        .upload-demo
          width 300px
          margin 20px
          .el-button
            padding 9px 34px
            background #1D9A9A
            border-color #1D9A9A
            border-radius 5px
          .el-button:hover
            background #21bbbb
        .import_but,.export_but
          width 120px
          height 32px
          background #1D9A9A
          border 1px solid #1D9A9A
          box-sizing border-box
          margin 20px
          text-align center
          border-radius 5px
          line-height 32px
          cursor pointer
          color white
        .export_but
          margin -71px 0 40px 300px
        .add_but
          position absolute
          top 50px
          right 38px

        .export_but:hover
          background #21bbbb
        .table_point_wrap
          height calc(100% - 95px)
          border-top 1px solid #21bbbb
          .table_box
            height calc(100% - 32px)
            overflow-y auto
          .table_box::before
            height 0px


        .el-button--primary
          background #1D9A9A
        .el-button--primary:hover
          background #21bbbb
</style>
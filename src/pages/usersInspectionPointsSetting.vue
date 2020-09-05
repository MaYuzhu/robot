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
    <XunjianFindTool @xunjianFind="xunjianFind" :saveData="saveData" :savePutData="savePutData"></XunjianFindTool>
    <div class="content">
      <div class="left">
        <devTree @devTreeKey="treeCheck" :toTreeData="toTreeData"></devTree>
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
      this.init()
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

      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
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
        console.log(this.saveData.points) //POST /ui/file/download
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
          console.log(points)
          var url = url_api + '/file/downloadExcel';
          var xhr = new XMLHttpRequest();
          xhr.open('post', url, true);    // 也可以使用POST方式，根据接口
          xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
          xhr.setRequestHeader("token",localStorage.getItem('token'));
          xhr.send(points+'')
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
        }else {
          console.log('all')
          _this.$alert('请选择点位', '提示', {
            confirmButtonText: '确定',
            callback: action => {

            }
          })
        }




      },

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
        .export_but:hover
          background #21bbbb

</style>
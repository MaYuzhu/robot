<template>
  <div class="task_infrared_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="xunjian_wrap" v-if="hardReset">
      <div class="li_xunjian_title" style="height:auto">
        <p>巡检类型：</p>
        <div class="all_content">
          <el-radio v-model="radio" v-for="item in radio_items"
                    :key="item.id" :disabled="item.id!=3"
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
        <devTree @devTreeKey="treeCheck" :toTreeData="toTreeData" :toTreeCheckData="toTreeCheckData"></devTree>
      </div>
      <div class="right">
        <taskTable v-if="taskTableReset" :irBaseRobotId="irBaseRobotId"
                   :irBaseInspectTypeId="irBaseInspectTypeId"></taskTable>
      </div>
    </div>
    <menuBottom></menuBottom>
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
        title:'专项巡检 > 红外测温',

        radio: 3,
        radio_items:[
          {
            value:1,
            label:'全面巡检1'
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
        checkedReconType:[],
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
        irBaseInspectTypeId:5,
        toTreeData:{
          quyu:[],
          type:[],
          recon:[],
          meter:[],
          face:[]
        },
        saveData:{
          description:'',
          irBaseInspectTypeId:'5',
          irBaseRobotId:1,
          isCustom:'0',
          name:'红外测温',
          points:'',
        },
        savePutData:{},
        taskTableReset:true,
        hardReset: true,
        toTreeCheckData:[],
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
      _this.init()
      _this.ajax_api('get',url_api + '/point/tree',
        {reconTypeIds:'5'},
        true,
        function (res) {
          if(res.code == 200){
            //_this.toTreeCheckData = res.data
            _this.setName(res.data)
          }
        })
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
          _this.radio_items_infrared = result2
        })

        _this.ajax_api('get',url_api + '/device/region',null,true,function (res) {
          //console.log(res.data)
          let inspect = res.data
          let result = inspect.filter(item => {
            return item.parentId == 4
          })
          _this.citiesQuyu = result

          _this.ajax_api('get',url_api + '/inspect-type-choose/default-checks?inspectId='+_this.irBaseInspectTypeId,
            null,true,
            function (res) {
              let result_choose = res.data
              result_choose = result_choose.filter(item =>{
                return item.chooseType == 0
              })
              let choose_id_arr = []
              for(let i=0;i<result_choose.length;i++){
                choose_id_arr.push(result_choose[i].chooseId)
                /*choose_id_arr = _this.citiesQuyu.filter(item =>{
                  return item.id == 6917
                })*/
              }
              //console.log(choose_id_arr)
              _this.checkedQuyu = choose_id_arr
            })

        })

        _this.ajax_api('get',url_api + '/device-type?size=100',null,true,function (res) {
          //console.log(res.data)
          let inspect = res.data.items
          let result = inspect.filter(item => {
            return item.name >2000
          })
          _this.listDevType = result
          _this.ajax_api('get',url_api + '/inspect-type-choose/default-checks?inspectId='+_this.irBaseInspectTypeId,
            null,true,
            function (res) {
              let result_choose = res.data
              result_choose = result_choose.filter(item =>{
                return item.chooseType == 1
              })
              let choose_id_arr = []
              for(let i=0;i<result_choose.length;i++){
                //choose_id_arr.push(result_choose[i].chooseId)
                choose_id_arr = _this.listDevType.filter(item =>{
                  return item.id == 8
                })
              }
              //console.log(choose_id_arr)
              _this.checkedDevType = choose_id_arr
            })
        })

        _this.ajax_api('get',url_api + '/recon-type?size=30',null,true,function (res) {
          //console.log(res.data)
          let result = res.data.items
          _this.listReconType = result
          
          /*_this.ajax_api('get',url_api + '/inspect-type-choose/default-checks?inspectId='+_this.irBaseInspectTypeId,
            null,true,
            function (res) {
            //console.log(res)
              let result_choose = res.data
              result_choose = result_choose.filter(item =>{
                return item.chooseType == 2
              })
              let choose_id_arr = []
              for(let i=0;i<result_choose.length;i++){
                //choose_id_arr.push(result_choose[i].chooseId)
                choose_id_arr = _this.listReconType.filter(item =>{
                  return item.id == 2
                })
              }
              //console.log(choose_id_arr)
              _this.checkedReconType = choose_id_arr
            })*/
        })

        _this.ajax_api('get',url_api + '/meter-type?size=100',null,true,function (res) {
          //console.log(res.data)
          let inspect = res.data.items
          _this.listMeterType = inspect
          _this.ajax_api('get',url_api + '/inspect-type-choose/default-checks?inspectId='+_this.irBaseInspectTypeId,
            null,true,
            function (res) {
              let result_choose = res.data
              result_choose = result_choose.filter(item =>{
                return item.chooseType == 3
              })
              let choose_id_arr = []
              for(let i=0;i<result_choose.length;i++){
                //choose_id_arr.push(result_choose[i].chooseId)
                choose_id_arr = _this.listMeterType.filter(item =>{
                  return item.id == 2
                })
              }
              //console.log(choose_id_arr)
              _this.checkedMeterType = choose_id_arr
            })
        })

        _this.ajax_api('get',url_api + '/face-type?size=100',null,true,function (res) {
          //console.log(res.data)
          let inspect = res.data.items
          _this.listFaceType = inspect
          _this.ajax_api('get',url_api + '/inspect-type-choose/default-checks?inspectId='+_this.irBaseInspectTypeId,
            null,true,
            function (res) {
              let result_choose = res.data
              result_choose = result_choose.filter(item =>{
                return item.chooseType == 4
              })
              let choose_id_arr = []
              for(let i=0;i<result_choose.length;i++){
                //choose_id_arr.push(result_choose[i].chooseId)
                choose_id_arr = _this.listFaceType.filter(item =>{
                  return item.id == result_choose[i].chooseId
                })
              }
              //console.log(choose_id_arr)
              _this.checkedFaceType = choose_id_arr
            })
        })

      },

      setName(datas){ //遍历树  获取id数组
        let _this = this
        for(var i in datas){
          if(datas[i].treeNode){
            _this.setName(datas[i].treeNode);
          }else {
            _this.toTreeCheckData.push(datas[i].id)
          }
        }
        //console.log(_this.toTreeCheckData)
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
      height calc(100% - 368px)
      .left
        width 300px
        height 100%
        float left
      .right
        float left
        width calc(100% - 300px)
        height 100%

</style>

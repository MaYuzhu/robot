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
          <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
          <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
          <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
          <li @click="alertBox()"><img src="../../static/images/report.png" alt=""><span>自定义报表</span></li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <devTreeNoCheck></devTreeNoCheck>
      </div>
      <div class="right">
        <p class="title">生成报表</p>
        <el-table size="mini"
                  :data="dataTable"
                  border
                  style="width: 100%">
          <el-table-column align="center"
            prop="date"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column type="selection" align="center"
                           prop="address"
                           label=""
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="识别结果"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="识别类型"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="点位名称"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="识别时间"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="设备区域"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="间隔名称"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="设备名称"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="设备类型"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="表计类型"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="设备外观类型"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="发热类型"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="识别状态"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="审核结果"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="环境温度"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="环境湿度"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="环境风速"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="告警等级"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="采集信息"
          >
          </el-table-column>
          <el-table-column align="center"
            prop="address"
            label="是否审核"
          >
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
        <el-button type="primary" @click="jumpPage('merge','','')">确 定</el-button>
      </span>
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
  import devTreeNoCheck from '../components/devTreeNoCheck.vue'

  export default {
    data(){
      return{
        title:'生成报表 > 生成报表',
        dataTable:[],
        value_start:'',
        value_end:'',
        dialogVisible: false,
        chapterNameIdList:[1,2,3],
        chapterNameList:[
        	{
            disabled: false,
            id: 1,
            templateChapterName: "识别结果1"
          },
          {
            disabled: false,
            id: 2,
            templateChapterName: "识别类型2"
          },
          {
            disabled: false,
            id: 3,
            templateChapterName: "点位名称3"
          },
          {
            disabled: false,
            id: 4,
            templateChapterName: "识别类型4"
          },{
            disabled: false,
            id: 5,
            templateChapterName: "识别时间5"
          },
          {
            disabled: false,
            id: 6,
            templateChapterName: "设备区域6"
          },
          {
            disabled: false,
            id: 7,
            templateChapterName: "间隔名称7"
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
      }
    },
    components: {
      HeaderTop,
      XunjianTopBox,
      myTransfer,
      CustomTransfer,
      menuBottom,
      devTreeNoCheck
    },
    mounted(){
    	this.init()
      this.value_start = this.convertToLateDate()
      this.value_end = this.getDateTime()
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
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
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

    }
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
</style>

<template>
  <div class="reports_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <XunjianTopBox></XunjianTopBox>
    <div class="reports_tools">
      <p>开始时间：</p>
      <el-date-picker size="mini" style="width: 160px"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <p>结束时间：</p>
      <el-date-picker size="mini" style="width: 160px"
                      v-model="value2"
                      type="date"
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

  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import XunjianTopBox from '../components/xunjianTopBox.vue'
  import myTransfer from '../components/myTransfer.vue'
  import CustomTransfer from '../components/customTransfer.vue'


  export default {
    data(){
      return{
        title:'生成报表 > 生成报表',
        value1:'',
        value2:'',
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
        alias:[{id:1,templateChapterName:'qqq'},{id:2,templateChapterName:'qrrr'}],
        isLeftActive:-1,
        isRightActive:-1,
      }
    },
    components: {
      HeaderTop,
      XunjianTopBox,
      myTransfer,
      CustomTransfer
    },
    methods:{
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
      },
      allLeft(){
        let that = this
        that.chapterNameList.push.apply(that.chapterNameList,that.checkedNameList)
        that.checkedNameList = []
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

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .reports_wrap
    .reports_tools
      height 30px
      background linear-gradient(#e3f2ee,#cae7ee)
      display flex
      align-items center
      p
        margin-left 10px
        font-weight 600
      div
        margin-right 20px
        ul
          display flex
          padding-left 30px
          li
            margin-right 30px
            display flex
            align-items center
            cursor pointer
            img
              width 16px
              height 16px
              margin-right 4px

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
        ul
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
          display flex
          flex-direction column
          justify-content center
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
          display flex
          flex-direction column
          justify-content center
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

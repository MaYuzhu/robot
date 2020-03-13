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
      <div class="dialog_content">
        <my-transfer v-model="chapterNameIdList" :inputList="chapterNameList"
                     :alias="{key: 'id',label: 'templateChapterName'}"></my-transfer>
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
  import myTransfer from '../components/myTransfer.vue';

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
            templateChapterName: "识别类型"
          },{
            disabled: false,
            id: 5,
            templateChapterName: "识别时间"
          },
          {
            disabled: false,
            id: 6,
            templateChapterName: "设备区域"
          },
          {
            disabled: false,
            id: 7,
            templateChapterName: "间隔名称"
          }


        ],
        alias:[{id:1,templateChapterName:'qqq'},{id:2,templateChapterName:'qrrr'}]
      }
    },
    components: {
      HeaderTop,
      XunjianTopBox,
      myTransfer
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
      }
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
        min-width: 600px;
        padding-bottom: 6px;
    .dialog_content
      background white
      border 1px solid #90e8c6
      padding 20px 50px

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

<template>
  <div class="systems_outlier_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="systems_outlier_top">
      <p>识别状态：</p>
      <el-checkbox v-model="checked1">识别正常</el-checkbox>
      <el-checkbox v-model="checked2">识别异常</el-checkbox>
      <p>开始时间：</p>
      <el-date-picker size="mini" style="width: 160px;float: left"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <p>结束时间：</p>
      <el-date-picker size="mini" style="width: 160px;float: left"
                      v-model="value2"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <ul>
        <li @click="queryList"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
        <li @click="resetList"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
        <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
      </ul>
    </div>
    <div class="content">
      <div class="left">
        <devTreeNoCheck @childKey="childKey"  :toTreeData="toTreeData"></devTreeNoCheck>
      </div>
      <div class="right">
        <p>用户操作</p>
        <el-table highlight-current-row ref="single" class="table_box"
                  :data="tableData" @current-change="clickChange"
                  border
                  style="width: 99.5%;margin:0 auto;box-sizing: border-box">
          <el-table-column align="center"
                           type="index" :index="index"
                           label="序号"
                           width="50">
          </el-table-column>
          <!--<el-table-column align="center" type="selection"
                           prop="alarmName"
                           label="">
          </el-table-column>-->
          <el-table-column align="center"
                           prop="reconType.name"
                           label="识别类型"
                           width="150">
          </el-table-column>
          <el-table-column align="center"
                           prop="point.deviceName"
                           label="点位名称">
          </el-table-column>
          <el-table-column align="center" width="100"
                           prop="pointHistory.value"
                           label="识别结果">
          </el-table-column>
          <el-table-column align="center" width="120"
                           prop="resultStatus"
                           label="审核结果">
            <template slot-scope="scope">
              <span>{{scope.resultStatus==0?'已审核':'未审核'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           prop="account" :formatter="alarmLevelText"
                           label="告警等级"
                           width="150">
          </el-table-column>
          <el-table-column align="center"
                           prop="reconTime"
                           label="识别时间">
          </el-table-column>
          <el-table-column align="center"
                           prop="name"
                           label="采集信息">
            <template slot-scope="scope">
              <span style="color:blue;cursor:pointer" @click="openImg(imgUrlBefore+scope.row.pointHistory.cameraPic)">{{scope.row.saveType.name}}</span>
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
    <menuBottom></menuBottom>
    <el-dialog width="500px" :visible.sync="imgVisible" class="img-dialog">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import menuBottom from '../components/menuBottom.vue'
  import devTreeNoCheck from '../components/devTreeNoCheck.vue'

  export default {
    data(){
      return{
        title:'机器人信息查询 > 识别异常点查询',
        radio_shen: '识别正常',
        radio_items_shen:[
          {
            value:1,
            label:'识别正常'
          },
          {
            value:2,
            label:'识别异常'
          }
        ],
        toTreeData:{
          quyu:[],
          type:[],
          recon:[],
          meter:[],
          face:[]
        },
        checked1: false,
        checked2: true,
        value1: '',
        value2: '',
        irProjPointId:'',
        tableData:[],
        alarmData:{
          page: 1,
          size: 10
        },
        currentPage: 1,
        total:0,
        imgUrlBefore: url_img + '/smcsp/',
        imgVisible:false,
        dialogImgUrl:'',
      }
    },
    mounted(){
      var vm = this;
      vm.value2 = vm.nowTime();// 默认显示为当天时间
      vm.value1 = vm.convertToLateDate();
      //vm.alarmData.startTime = vm.value1
      //vm.alarmData.endTime = vm.value2
      vm.alarmData.resultStatus = 1
      vm.allData()
    },
    methods:{
      childKey(childValue){
        let _this = this
        _this.irProjPointId = childValue.id
        _this.alarmData.pointIds = _this.irProjPointId
        _this.allData()
      },
      allData(){
      	let _this = this
        //_this.alarmData.startTime = _this.value1
        //_this.alarmData.endTime = _this.value2
        if(_this.checked1 && _this.checked2){
            _this.alarmData.resultStatus = null
        }else if(!_this.checked1 && !_this.checked2){
            _this.alarmData.resultStatus = null
        }else if(_this.checked1){
            _this.alarmData.resultStatus = 0
        }else if(_this.checked2){
            _this.alarmData.resultStatus = 1
        }
        _this.ajax_api('post',url_api + '/point-alarm-history',
          _this.alarmData,
          true,function (res) {
          //console.log(res.data)
          _this.tableData = res.data.items
          _this.total = res.data.total
        })
      },
      index(val){
        //(listQuery.page - 1) * listQuery.pageSize + scope.$index + 1
        return (this.alarmData.page - 1)*this.alarmData.size + val + 1
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.alarmData.size  =  val
        this.allData()
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.alarmData.page  =  val
        this.allData()
      },
      clickChange(){

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
        var s = Da.getSeconds();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        H = H < 10 ? "0" + H : H;
        s = s < 10 ? "0" + s : s;
        return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + s;

      },
      nowTime(){
          var Da = new Date();
          // 以上两行代码为关键代码，若想要返回一天后的时间，则可以将第二行代码更换为下面代码
          // var Da = new Date(data.getTime() + 24 * 60 * 60 * 1000);
          // 若是想要返回值为当前时间，则上面两行代码可以直接修改为下面代码即可。
          // var Da = new Date()
          var y = Da.getFullYear();
          var m = Da.getMonth() + 1;
          var d = Da.getDate();
          var H = Da.getHours();
          var mm = Da.getMinutes();
          var s = Da.getSeconds();
          m = m < 10 ? "0" + m : m;
          d = d < 10 ? "0" + d : d;
          H = H < 10 ? "0" + H : H;
          s = s < 10 ? "0" + s : s;
          return y + "-" + m + "-" + d + " " + H + ":" + mm + ":" + s;
      },

      alarmLevelText(row){
            var result
            switch (row.alarmLevel) {
                case 0:
                    result = '正常'
                    break
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
                    result = '危机告警'
                    break
            }
            return result
      },
      openImg(url) {
          let _this = this
          if (url) {
              _this.imgVisible = true
              _this.dialogImgUrl = url
          }
      },
      queryList(){
          let _this = this
          _this.allData()
      },
      resetList(){
          this.alarmData.startTime = this.convertToLateDate();
          this.alarmData.endTime = this.nowTime()
          this.alarmData.resultStatus = 1
          this.pointIds = ''
          this.alarmData.pointIds = this.pointIds
          this.allData()
      },
    },
    components: {
      HeaderTop,
      menuBottom,
      devTreeNoCheck
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .systems_outlier_wrap
    height 100%
    .systems_outlier_top
      display flex
      height 30px
      background #cae7ee\0
      background linear-gradient(#e3f2ee,#cae7ee)
      align-items center
      .el-radio,>p
        margin 0 20px
        float left
      >p
        margin-left  30px
        font-weight 600
      ul
        float left
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
      width 100%
      height calc(100% - 120px)
      border 1px solid #cae7ee
      box-sizing border-box
      .left
        width 300px
        height calc(100% - 1px)
        float left
        box-sizing border-box
        border-right 0px solid #3d8fff
      .right
        width calc(100% - 300px)
        height 100%
        box-sizing border-box
        float left
        overflow-y auto
        position relative
        background white
        .table_box
          height calc(100% - 60px)
          overflow-y auto
        p
          height 30px
          line-height 30px
          background #cae7ee
          box-sizing border-box
          font-weight 600
          padding-left 10px

        .page_box
          position absolute
          bottom 0
    div>>>.el-table th
            padding 4px 0
    div>>>.el-table td
            padding 3px 0
    /deep/.img-dialog
      .el-dialog__header
        padding: 0!important;
        .el-dialog__headerbtn
          right 10px
          top 10px
</style>

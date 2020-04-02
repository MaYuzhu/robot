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
        <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
        <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
        <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
      </ul>
    </div>
    <div class="content">
      <div class="left">
        <devTreeNoCheck @childKey="childKey"></devTreeNoCheck>
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
                           prop="alarmType.name"
                           label="识别类型"
                           width="150">
          </el-table-column>
          <el-table-column align="center"
                           prop="limitValue"
                           label="点位名称">
          </el-table-column>
          <el-table-column align="center"
                           prop="name"
                           label="识别结果">
          </el-table-column>
          <el-table-column align="center"
                           prop="resultStatus"
                           label="审核结果">
          </el-table-column>
          <el-table-column align="center"
                           prop="account"
                           label="告警等级"
                           width="150">
          </el-table-column>
          <el-table-column align="center"
                           prop="createTime"
                           label="识别时间">
          </el-table-column>
          <el-table-column align="center"
                           prop="name"
                           label="采集信息">
          </el-table-column>

        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5, 10, 20]"
            :page-size="1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <menuBottom></menuBottom>

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
        checked1: false,
        checked2: true,
        value1: '',
        value2: '',
        irProjPointId:'',
        tableData:[],
        alarmData:{
          page: 1,
          size: 1
        },
        currentPage: 1,
        total:0,
      }
    },
    mounted(){
      var vm = this;
      vm.value2 = new Date();// 默认显示为当天时间
      vm.value1 = vm.convertToLateDate();
      vm.allData()
    },
    methods:{
      childKey(childValue){
        this.irProjPointId = childValue.id
        //this.irProjPointName = childValue.name
      },
      allData(){
      	let _this = this
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
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        H = H < 10 ? "0" + H : H;
        return y + "-" + m + "-" + d + " " + H + ":" + mm;

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
      .right
        width calc(100% - 300px)
        height 100%
        box-sizing border-box
        float left
        overflow-y auto
        position relative
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
</style>

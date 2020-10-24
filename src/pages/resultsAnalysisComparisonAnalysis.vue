<template>
  <div style="height: 100%">
    <HeaderTop :title="title"></HeaderTop>
    <div class="analysis_wrap">
      <div class="analysis_top" style="display: none">
        <p>点位类型：</p>
        <div class="all_content all_content_leixing">
          <el-checkbox style="float: left" :indeterminate="isIndeterminatePoint" v-model="checkAllPoint" @change="handleCheckAllChangePoint">全部</el-checkbox>
          <el-checkbox-group v-model="checkedPoints" @change="handleCheckedCitiesChangePoint">
            <el-checkbox v-for="pointWeizhi in pointsArr" :label="pointWeizhi" :key="pointWeizhi">{{pointWeizhi}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="analysis_content">
        <div class="left" style="float: left">
          <DevTree @devTreeKey="devTreeKey" :pointIds="pointIds"></DevTree>
        </div>
        <div class="center">
          <div class="center_top">
            <div class="top1">
              <p>开始时间：</p>
              <el-date-picker size="mini" style="width: 160px;float: left"
                              v-model="value_start"
                              type="date" format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期">
              </el-date-picker>
              <p>结束时间：</p>
              <el-date-picker size="mini" style="width: 160px;float: left"
                              v-model="value_end"
                              type="date" format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="top2">
              <p>采集信息：</p>
              <el-radio v-model="radio" v-for="item in radio_items"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">{{item.label}}</el-radio>
            </div>
          </div>
          <div class="top3">
            <ul>
              <li @click="queryList"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
              <li @click="resetList"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
              <li @click="exportExcel"><img src="../../static/images/export.png" alt=""><span>导出</span></li>
            </ul>
          </div>
          <div class="table">
            <el-table size="mini" class="table_box"
                      :data="tableData"
                      border
                      style="width: 100%">
              <el-table-column
                prop="date" type="index" :index="index1"
                label="序号" align="center"
                width="50">
              </el-table-column>
              <!--<el-table-column type="selection"
                prop="address" align="center"
                label=""
              >
              </el-table-column>-->
              <el-table-column
                prop="createTime" align="center"
                label="识别时间"
              >
              </el-table-column>
              <el-table-column
                prop="point.deviceName" align="center"
                label="点位名称"
              >
              </el-table-column>
              <el-table-column
                  prop="point.id" align="center"
                  label="id"
              >
              </el-table-column>
              <el-table-column
                prop="value" align="center"
                label="识别结果"
              >
              </el-table-column>
              <el-table-column
                prop="address" align="center"
                label="采集信息"
              >
                <template slot-scope="scope">
                  <p style="cursor:pointer;text-decoration:underline;color:blue" @click="openImg(imgUrlBefore+scope.row.cameraPic)">图片信息</p>
                </template>
              </el-table-column>
            </el-table>
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="currentPage1"
                :page-sizes="[7, 10, 20, 50]"
                :page-size="7"
                layout="total, sizes, prev, pager, next"
                :total="total1">
              </el-pagination>
            </div>
          </div>
          <div class="charts" id="center_chart">

          </div>
        </div>
        <div class="right">
          <div class="right_top">
            <el-radio v-model="radio_n" v-for="item in radio_items_n"
                      :key="item.value" @change="radioChangeN"
                      :label="item.value"
                      :value="item.value">{{item.label}}</el-radio>
          </div>
          <div class="right_content">
            <ul>
              <li :class="'r'+radio_n" v-for="(item, index) in imgDataResults" :key="index">
                <el-image v-if="item.cameraPic" :src="imgUrlBefore+item.cameraPic"
                          :preview-src-list="srcList" style="width:100%;"></el-image>
                <p v-if="item.point" style="background: #D9ECEA;height: 22px;line-height: 22px">{{item.point.name}}</p>
              </li>
            </ul>
          </div>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes="[6, 9, 20, 50]"
              :page-size="6"
              layout="total, sizes, prev, pager, next"
              :total="total2">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
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
  import DevTree from '../components/devTreeCheck.vue'

  let echarts = require('echarts/lib/echarts')
  // 引入xx图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legend')

  const pointsOptions = ['点', '面' ]
  const arrImg = [
    {name:'aaa',url:'../../static/abc.jpg'},
  ]

  export default {
    data(){
      return{
        title:'对比分析 > 对比分析',
        value_start:'',
        value_end:'',
        checkAllPoint: false,
        checkedPoints: [],
        pointsArr: pointsOptions,
        isIndeterminatePoint: false,
        value1:'',
        value2:'',
        radio: '1',
        radio_items:[
          {
            value:'1',
            label:'可见光'
          },
          {
            value:'2',
            label:'红外'
          },
          {
            value:'3',
            label:'音视频'
          }
        ],
        radio_n: 1,
        radio_items_n:[
          {
            value:1,
            label:' 2 * n '
          },
          /*{
            value:2,
            label:'  2 * 3 '
          },*/
          {
            value:3,
            label:'  3 * n '
          }
        ],
        currentPage1:1,
        total1:1,
        currentPage2:1,
        total2:1,
        right_show_img:[],
        tableData:[],
        imgUrlBefore: url_img + '/smcsp/',
        dialogImgUrl: '',
        imgVisible:false,
        ajaxTableData:{page:1, size:7},
        ajaxTableImgData:{page:1, size:6},
        imgDataResults:null,
        srcList:[],
        pointIds:'',
        chartsDateX:[],
        chartsDataY:[],
        screenWidth: document.body.clientWidth,

        picBase64Info:'',
        myChart:null,
        ajaxExportData:{},
      }
    },
    components: {
      HeaderTop,
      DevTree,
      menuBottom
    },
    mounted(){
      let _this = this
      this.value_start = this.convertToLateDate() + ' 00:00:00'
      this.value_end = this.getDateTime() + ' 23:59:59'
      this.getRightData()
      this.getTableData()
      this.getImgData()
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          _this.screenWidth = window.screenWidth
        })()
      }
    },
    methods: {
      getTableData(){
          let _this = this
          _this.ajaxTableData.startTime = _this.value_start
          _this.ajaxTableData.endTime = _this.value_end
          //console.log(_this.ajaxTableData)
          //_this.ajaxTableData.checkStatus = _this.radio*1
          _this.ajax_api('post',url_api + '/point-history',
              _this.ajaxTableData,
              true,
              function (res) {
                  if(res.code == 200){
                      //console.log(res.data.items)
                      _this.tableData = res.data.items
                      _this.total1 = res.data.total
                  }
              })

      },
      getImgData(){
          let _this = this
          _this.ajaxTableImgData.startTime = _this.value_start
          _this.ajaxTableImgData.endTime = _this.value_end
          //_this.ajaxTableImgData.checkStatus = _this.radio*1

          _this.ajax_api('post',url_api + '/point-history',
              _this.ajaxTableImgData,
              true,
              function (res) {
                  if(res.code == 200){
                      //console.log(res.data.items)
                      _this.total2 = res.data.total
                      _this.imgDataResults = res.data.items
                      _this.srcList = []
                      for(let i=0;i<res.data.items.length;i++){
                          _this.srcList.push(_this.imgUrlBefore + res.data.items[i].cameraPic)
                      }
                      if(_this.radio_n==1){
                          let r_w = $('.right_content').width()/2
                          setTimeout(()=>{$('.right_content li>div').height(r_w*0.7)},10)
                      }else if(_this.radio_n==3){
                          let r_w = $('.right_content').width()/3
                          setTimeout(()=>{$('.right_content li>div').height(r_w*0.7)},10)
                      }

                  }
              })

      },
      handleCheckAllChangePoint(val){
        this.checkedPoints = val ? pointsOptions : [];
        this.isIndeterminatePoint = false;
      },
      handleCheckedCitiesChangePoint(value){
        let checkedCount = value.length;
        this.checkAllPoint = checkedCount === this.pointsArr.length;
        this.isIndeterminatePoint = checkedCount > 0 && checkedCount < this.pointsArr.length;
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
      index1(val){
          return (this.ajaxTableData.page - 1)*this.ajaxTableData.size + val + 1
      },
      handleSizeChange1(val) {
        //console.log(`每页 ${val} 条`);
          this.ajaxTableData.size = val
          this.getTableData()
      },
      handleCurrentChange1(val) {
        //console.log(`当前页: ${val}`);
          this.ajaxTableData.page = val
          this.getTableData()
      },
      handleSizeChange2(val) {
        //console.log(`每页 ${val} 条`);
          this.ajaxTableImgData.size = val
          this.getImgData()
      },
      handleCurrentChange2(val) {
        //console.log(`当前页: ${val}`);
          this.ajaxTableImgData.page = val
          this.getImgData()
      },

      getRightData(){
      	let _this = this
        _this.right_show_img = arrImg.slice(0,4)
      },
      drawLine(dateX,dataY){
        let _this = this
        //console.log(dateX,dataY)
        let legend = []
        for(let i=0;i<dataY.length;i++){
          legend.push(dataY[i].name)
          //console.log(dataY[i].name)
        }
        //console.log(legend)
        // 基于准备好的dom，初始化echarts实例
        _this.myChart = this.$echarts.init(document.getElementById('center_chart'))
        _this.myChart.clear()
        // 绘制图表
        _this.myChart.setOption({
          backgroundColor: '#fff', // saveAsImage背景透明
          title: { text: ''},
          legend: {
            //data: ['开关压力表112','开关压力表114','开关压力表117'],
            data: legend,
            padding:[15,0,15,0],
            orient: 'horizontal',//vertical
            type: 'scroll',
            bottom:10,
            //x:'center',      //可设定图例在左、右、居中
            y:'bottom',     //可设定图例在上、下、居中
          },
          grid: {
            top: '5%',
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: dateX,
            type: 'category',
            //data: ["2020-06-04 16:19:56", "2020-06-04 15:55:48", "2020-06-03 07:13:35"]
          },
          yAxis: {
            type: 'value'
          },
          series: dataY
          /*series: [{
            name: '1',
            stack: '总量',
            type: 'line',
            //data: [5, 16, 36, 10, 14, 25]
            data: _this.chartsDataY
          },{
            name: '2',
            stack: '总量',
            type: 'line',
            data: [5, 16, 36, 10, 14, 25]
            //data: _this.chartsDataY
          }]*/
        });
      },
      openImg(url) {
          let _this = this
          if (url) {
              _this.imgVisible = true
              _this.dialogImgUrl = url
              _this.$emit('isVideo', false)
          }
      },
      queryList(){
        let _this = this
        _this.getTableData()
        _this.getImgData()
      },
      resetList(){
        let _this = this
        _this.value_start = _this.convertToLateDate()
        _this.value_end = _this.getDateTime()
        //_this.ajaxTableData.checkStatus = _this.radio*1
        _this.pointIds = '0'
        _this.ajaxTableData.pointIds = ''
        _this.ajaxTableImgData.pointIds = ''
        _this.getTableData()
        _this.getImgData()
      },
      //导出
      exportExcel(){
        let _this = this
        _this.picBase64Info = _this.myChart.getDataURL(); //获取base64编码
        //  var picBase64Info = myChart.getImage(); //
        //console.log(_this.picBase64Info)
        _this.ajaxExportData.stDate = _this.value_start
        _this.ajaxExportData.edDate = _this.value_end
        _this.ajaxExportData.pointIds = _this.pointIds
        _this.ajaxExportData.imageBase64 = _this.picBase64Info.split("data:image/png;base64,")[1]
        _this.ajaxExportData.sheetName = "string"
        //console.log(_this.ajaxExportData)
        /*_this.ajaxExportData.stDate = "2020-07-07 09:00:00"
        _this.ajaxExportData.edDate = "2020-07-10 18:00:00"
        _this.ajaxExportData.pointIds = '21,24'
        _this.ajaxExportData.imageBase64 = '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'
        _this.ajaxExportData.sheetName = "string",
        console.log(_this.ajaxExportData)*/

        /*_this.ajax_api('post',url_api + '/file/downloadFile4',  //POST /ui/file/downloadFile4
          _this.ajaxExportData,
          true,
          function(response, status, request) {

          })*/
        var nameExcel = _this.getDateTimeHhMmSs()+'.xlsx'
        var url = url_api + '/file/downloadFile4';
        var xhr = new XMLHttpRequest();
        xhr.open('post', url, true);    // 也可以使用POST方式，根据接口
        xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
        xhr.setRequestHeader("token",localStorage.getItem('token'));
        xhr.send(JSON.stringify(_this.ajaxExportData))
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
              a.download = nameExcel;
              a.href = e.target.result;
              $("body").append(a);  // 修复firefox中无法触发click
              a.click();
              $(a).remove();
            }
          }
        };
      },
      radioChangeN(val){
        //console.log(val)
        if(val == 1){
            let r_w = $('.right_content').width()/2
            //console.log(r_w)
            setTimeout(()=>{$('.right_content li>div').height(r_w*0.7)},10)
        }else if(val == 3){
            let r_w = $('.right_content').width()/3
            //console.log(r_w)
            setTimeout(()=>{$('.right_content li>div').height(r_w*0.7)},10)
        }
      },
      devTreeKey(val){
        let _this = this
        //let testPoint = [2,4,7,37,36,28,26,19]
        let testPoint = val
        //console.log(val)
        //console.log(val.toString())
        _this.pointIds = testPoint.toString()
        _this.ajaxTableData.pointIds = _this.pointIds
        _this.ajaxTableImgData.pointIds = _this.pointIds
        _this.getTableData()
        _this.getImgData()
        _this.chartsData(testPoint)

      },
      chartsData(pointIdsArr){
        let _this = this
        let dateX = []
        let dataY = []
        let dataYArr = []
        let dataYData = []
        for(let i=0;i<pointIdsArr.length;i++) {
          _this.ajax_api('post',url_api + '/point-history',
            {pointIds:pointIdsArr[i],
              startTime:_this.value_start,
              endTime:_this.value_end,
              size:100},
            true,
            function (res) {
              if(res.code == 200){
                if(res.data.items.length<1){
                  //console.log(res.data.items)
                  return
                }
                //console.log(res.data.items)
                let dataList = res.data.items.reverse()
                dateX = []
                dataY = {}
                dataYData = []
                  for(let j=0;j<dataList.length;j++){
                    dateX.push(dataList[j].createTime)
                    dataYData.push(dataList[j].value)
                    dataY = {
                      time: dataList[j].createTime,
                      name: dataList[j].point.deviceName,
                      //stack: '总量',
                      type: 'line',
                      data: dataYData
                    }
                  }
              }
              dataYArr.push(dataY)
              //console.log(dateX)
              _this.drawLine(dateX,dataYArr)
          })

        }

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
    },
    watch:{
      screenWidth(val){
        let _this = this
        if(!_this.myChart){
          return
        }
        //console.log(_this.myChart)
        _this.myChart.resize()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .analysis_wrap
    height calc(100% - 90px)
    min-height 700px
    overflow hidden
    .analysis_top
      margin 10px 0
      display flex
      align-items center
      overflow hidden
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
        .el-checkbox
          width 80px
          margin 0 30px 0 10px
    .analysis_content
      display flex
      height 100%
      background #fff
      .left
        width 300px
        height 100%
        border 1px solid #cae7ee
        box-sizing border-box
      .center
        width 45%
        height 100%
        border 1px solid #cae7ee
        float left
        box-sizing border-box
        .center_top
          background #cae7ee\0
          background linear-gradient(#e3f2ee,#cae7ee);
          .top1, .top2
            display flex
            align-items center
            height 30px
            line-height 30px
            p
              float left
              margin-left 10px
              font-weight 600
        .top3
          height 24px
          padding-top 7px
          ul
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


        .table
          height 340px
          border 1px solid #a9afee
          position relative
          /deep/ ::before
            height 0
          .table_box
            height calc(100% - 30px)
            overflow-y auto
          .page
            position absolute
            bottom 0
            width 100%
            min-width 300px
            overflow-x auto
        .charts
          border 1px solid #a9afee
          height calc(100% - 436px)

      .right
        width calc(100% - 300px - 45%)
        height 100%
        border 1px solid #cae7ee
        float left
        box-sizing border-box
        position relative
        .right_top
          height 30px
          padding 7px 0 0 10px
          background #cae7ee\0
          background linear-gradient(#e3f2ee,#cae7ee);
          box-sizing border-box
        .right_content
          height calc(100% - 64px)
          overflow-y auto
          li
            float left
            border 1px solid #d9d9d9
            box-sizing border-box
          .r1
            width 50%
          .r2
            width 50%
          .r3
            width 33.3333%
        .page
          position absolute
          bottom 0
          width 100%
          min-width 300px
          overflow-x auto
    /deep/ .el-image-viewer__close
      color white
</style>

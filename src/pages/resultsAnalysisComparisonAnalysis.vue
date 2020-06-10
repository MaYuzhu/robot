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
              <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
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
              <el-table-column type="selection"
                prop="address" align="center"
                label=""
              >
              </el-table-column>
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
        myChart:null,
      }
    },
    components: {
      HeaderTop,
      DevTree,
      menuBottom
    },
    mounted(){
      let _this = this
      this.value_start = this.convertToLateDate()
      this.value_end = this.getDateTime()
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
          _this.ajaxTableData.endTime = _this.value_end //+ ' 23:59:59'
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
        //console.log(dataY)
        let legend = []
        for(let i=0;i<dataY.length;i++){
          legend.push(dataY[i].name)
          //console.log(dataY[i].name)
        }
        //console.log(legend)
        // 基于准备好的dom，初始化echarts实例
        _this.myChart = this.$echarts.init(document.getElementById('center_chart'))
        // 绘制图表
        _this.myChart.setOption({
          title: { text: '' },
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
        let testPoint = [2,4,7,37,36,28,26,19]
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
            {pointIds:pointIdsArr[i]},
            true,
            function (res) {
              if(res.code == 200){
                //console.log(res.data.items)
                dateX = []
                dataY = {}
                dataYData = []
                  for(let j=0;j<res.data.items.length;j++){
                    dateX.push(res.data.items[j].createTime)
                    dataYData.push(res.data.items[j].value)
                    dataY = {
                      time: res.data.items[j].createTime,
                      name: res.data.items[j].point.deviceName,
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
    },
    watch:{
      screenWidth(val){
        let _this = this
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

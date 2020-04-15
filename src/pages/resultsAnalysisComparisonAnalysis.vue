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
          <DevTree></DevTree>
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
              <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
              <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
              <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
            </ul>
          </div>
          <div class="table">
            <el-table size="mini"

                      border
                      style="width: 100%">
              <el-table-column
                prop="date"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column type="selection"
                prop="address"
                label=""
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="识别时间"
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="点位名称"
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="识别结果"
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="采集信息"
              >
              </el-table-column>
            </el-table>
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="currentPage1"
                :page-sizes="[1, 10, 20, 50]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
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
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">{{item.label}}</el-radio>
          </div>
          <div class="right_content">
            <ul>
              <li :class="'r'+radio_n" v-for="(item, index) in right_show_img" :key="index">
                <el-image :src="item.url" style="width:100%;"></el-image>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes="[4, 6, 9]"
              :page-size="4"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total2">
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
  import HeaderTop from '../components/headerTop.vue'
  import DevTree from '../components/devTreeCheck.vue'

  let echarts = require('echarts/lib/echarts')
  // 引入xx图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')

  const pointsOptions = ['点', '面' ]
  const arrImg = [
    {name:'aaa',url:'../../static/abc.jpg'},
    {name:'aaa',url:'../../static/abc.jpg'},
    {name:'aaa',url:'../../static/abc.jpg'},
    {name:'aaa',url:'../../static/abc.jpg'},
    {name:'aaa',url:'../../static/abc.jpg'},
    {name:'aaa',url:'../../static/abc.jpg'},
    {name:'aaa',url:'../../static/abc.jpg'},
    {name:'aaa',url:'../../static/abc.jpg'},
    {name:'aaa',url:'../../static/abc.jpg'},
    {name:'aaa',url:'../../static/abc.jpg'},
    {name:'aaa',url:'../../static/abc.jpg'},
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
            label:' 2 * 2 '
          },
          {
            value:2,
            label:'  2 * 3 '
          },
          {
            value:3,
            label:'  3 * 3 '
          }
        ],
        currentPage1:1,
        total1:1,
        currentPage2:1,
        total2:1,
        right_show_img:[],
      }
    },
    components: {
      HeaderTop,
      DevTree,
      menuBottom
    },
    mounted(){
      this.value_start = this.convertToLateDate()
      this.value_end = this.getDateTime()
      this.getRightData()
      this.drawLine()
    },
    methods: {
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
      handleSizeChange1(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange1(val) {
        //console.log(`当前页: ${val}`);
      },
      handleSizeChange2(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange2(val) {
        //console.log(`当前页: ${val}`);
      },

      getRightData(){
      	let _this = this
        _this.right_show_img = arrImg.slice(0,4)
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('center_chart'))
        // 绘制图表
        myChart.setOption({
          title: { text: 'echarts' },
          tooltip: {},
          xAxis: {
            data: ["11-01","11-02","11-03","11-04","11-05","11-06"]
          },
          yAxis: {},
          series: [{
            name: ' ',
            type: 'line',
            data: [5, 16, 36, 10, 14, 25]
          }]
        });
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .analysis_wrap
    height calc(100% - 90px)
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
        width calc(100% - 900px)
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
          .page
            position absolute
            bottom 0
        .charts
          border 1px solid #a9afee
          height calc(100% - 436px)

      .right
        width 600px
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
          li
            float left
          .r1
            width 50%
          .r2
            width 50%
          .r3
            width 33.3333%
        .page
          position absolute
          bottom 0
</style>

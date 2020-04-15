<template>
  <div class="generate_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="generate_top_checked">
      <!--<AlarmQueryTop></AlarmQueryTop>-->
      <p style="display: inline-block">巡检类型：</p>
      <div class="all_content" style="display:inline-block;width:900px">
        <el-checkbox style="float:left;margin-right:20px" :indeterminate="isIndeterminate" v-model="checkAll"
                     @change="handleCheckAllChange">全部</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(task_type,index) in taskTypeData" :label="task_type" :key="index">{{task_type.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="right_title_tool">
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
          <li @click="aaa">test</li>
          <li @click="queryInit"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
          <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
          <li @click="exportExcel"><img src="../../static/images/export.png" alt=""><span>导出报告</span></li>
        </ul>
      </div>
    </div>
    <div class="right_title">巡检报告生成</div>
    <div class="table_wrap">
      <el-table size="mini" id="outInspectionReport"
                :data="tableData"
                border
                style="width: 100%;">
        <el-table-column
          type="index" :index="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column type="selection"
          prop="name"
          label="123"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="任务名称"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="任务状态"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="审核状态"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="开始时间"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="结束时间"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="巡检点位总数"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="正常点位数"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="告警点位数"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="识别异常点位数"
        >
        </el-table-column>

        <el-table-column
          prop="src"
          label="图片"
        >
          <template slot-scope="scope">
            <img :src="scope.row.src" alt="" width="150px">
          </template>
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
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import FileSaver from "file-saver";
  import XLSX from "xlsx";

  import table2excel from 'js-table2excel' //图片

  import HeaderTop from '../components/headerTop.vue'
  import AlarmQueryTop from '../components/alarmQueryTop.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'巡检报告生成 > 巡检报告生成',
        tableData: [
        	{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          src:'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=b30eadd0267f9e2f6438155a7e598241/21a4462309f790528aa758080df3d7ca7bcbd54f.jpg'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        value_start:'',
        value_end:'',
        checkAll: false,
        taskTypeData:[
          {name:'全面巡视',id:0},{name:'例行巡视',id:1},{name:'专项巡视',id:2},{name:'特殊巡视',id:3},
          /*{name:'紧急任务',id:4},{name:'多光谱任务',id:5},*/
        ],
        isIndeterminate: false,
        checkedCities:[],
        currentPage:1,
        total:1,
      }
    },
    components: {
      HeaderTop,
      AlarmQueryTop,
      menuBottom
    },
    mounted(){
      this.value_end = this.getDateTime()
      this.value_start = this.convertToLateDate()
    },
    methods:{
      index(val){
        return val
      },
      //定义导出Excel表格事件
      exportExcel() {
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(document.querySelector("#outInspectionReport"));
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            "sheetjs.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      },

      aaa(){
        const column = [
          {
            title: 'Name',
            key: 'name',
            type: 'text'
          },
          {
            title: 'Pic',
            key: 'pic',
            type: 'image',
            width: 80,
            height: 50
          }
        ]
        const data = [
          {
            name: 'xiao',
            age: '18',
            pic: 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=b30eadd0267f9e2f6438155a7e598241/21a4462309f790528aa758080df3d7ca7bcbd54f.jpg'
          },
          {
            name: 'jie',
            age: '18',
            pic: ''
          }
        ]
        const excelName = 'boy'

        table2excel(column, data, excelName)
      },

      queryInit(){
        let _this = this
        let queryData = {
          startTime: _this.value_start,
          endTime: _this.value_end,
        }
        console.log(queryData)
      },

      handleCheckAllChange(val) {
      	//console.log(val)
        this.checkedCities = val ? this.taskTypeData : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.taskTypeData.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.taskTypeData.length;
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
  .generate_wrap
    height 100%
    .generate_top_checked
      background #efefef
      padding 20px 16px 18px
    .right_title_tool
      width 100%
      height 30px
      background #cae7ee\0
      background linear-gradient(#e3f2ee,#cae7ee)
      display flex
      align-items center
      line-height 28px
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


    .right_title
      width 100%
      height 30px
      line-height 30px
      background #d7f4fb \0
      background linear-gradient(#e3f2ee,#cae7ee)
      padding-left 12px
      box-sizing border-box
    .table_wrap
      height calc(100% - 208px)
      position relative
      background white
      .page
        position absolute
        bottom 0
</style>

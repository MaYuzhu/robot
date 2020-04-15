<template>
  <div class="results_browse_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <!--<div class="results_browse_top">
      <p>点位类型：</p>
      <div class="all_content">
        <el-checkbox style="float: left" :indeterminate="isIndeterminatePoint" v-model="checkAllPoint" @change="handleCheckAllChangePoint">全部</el-checkbox>
        <el-checkbox-group style="float: left" v-model="checkedPoints" @change="handleCheckedCitiesChangePoint">
          <el-checkbox v-for="pointWeizhi in pointsArr" :label="pointWeizhi" :key="pointWeizhi">{{pointWeizhi}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>-->
    <div class="results_browse_content">
      <div class="results_browse_left">
        <devTreeNoCheck></devTreeNoCheck>
      </div>
      <div class="results_browse_right">
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
          <el-radio style="line-height: 27px" v-model="radio" label="1">已审核</el-radio>
          <el-radio v-model="radio" label="2">未审核</el-radio>
          <div>
            <ul>
              <li @click="queryList"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
              <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
              <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
            </ul>
          </div>
        </div>
        <div class="right_title">巡检结果</div>
        <div style="height: 284px;border: 1px solid">
          <el-table size="mini" @row-dblclick="dblBoxShow"
                    border :data="tableDataResults"
                    style="width: 100%;">
            <el-table-column
              prop="date"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="address"
              label="任务名称"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="点位名称"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="识别时间"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="识别结果"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核结果"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="识别类型"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="采集时间"
            >
            </el-table-column>

          </el-table>
          <div class="page_box">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              :page-sizes="[1, 5, 10, 20]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total1">
            </el-pagination>
          </div>
        </div>
        <div class="right_bottom" style="border: 1px solid">
          <ul class="ul_img_wrap">
            <li v-for="(item, index) in imageArr" style="width:33.3333%;height:50%;float:left;
                  box-sizing:border-box;border:1px solid #90e8c6">
              <el-image class="li_img"
                   :preview-src-list="srcList" style="width:100%;" :src="item.url" alt="">
              </el-image>
              <p style="background: #D9ECEA;height: 22px;line-height: 22px">{{item.title}}</p>
            </li>
          </ul>
          <div class="page_box">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              :page-sizes="[1, 5, 10, 20]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total1">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <menuBottom></menuBottom>
    <div class="alarm_dialog">
      <el-dialog title="告警确认" :visible.sync="dialogVisibleAlarm" class="" style="margin-top: -8vh;">
        <div class="dialog_content">
          <div class="dialog_left">
            <div style="background: #D9ECEA;height: 26px;line-height: 26px">
              <p style="margin-left: 10px;cursor: pointer">上一页</p>
            </div>
            <div style="height: 26px;line-height: 26px;padding-left: 8px">
              <span>点位信息：</span>
              <span style="border: 1px solid #90e8c6;border-radius:3px;
                padding: 2px 8px">{{point_info}}</span>
            </div>
            <div style="height: 400px;overflow-y: auto">
              <ul style="height: 400px;overflow: auto">
                <li v-for="(item, index) in imgArr" style="width:33.3333%;height:200px;float:left;
                  box-sizing:border-box;border:1px solid #90e8c6">
                  <p style="background: #D9ECEA;height: 22px;line-height: 22px">{{item.title}}</p>
                  <el-image :preview-src-list="srcList" style="width:100%;height:178px;" :src="item.url" alt="">
                  </el-image>
                </li>
              </ul>
            </div>
            <div>
              <p style="background: #D9ECEA;height: 26px;line-height: 26px;padding-left: 10px">音频文件</p>
              <div>123</div>
            </div>
            <div>
              <p style="background: #D9ECEA;height: 26px;line-height: 26px;padding-left: 10px">阈值信息</p>
              <p>
                <span>环境信息</span>
                <span>环境温度0摄氏度</span>
              </p>
              <p>
                <span>环境信息</span>
                <span>环境温度0摄氏度</span>
              </p>
              <p>
                <span>环境信息</span>
                <span>环境温度0摄氏度</span>
              </p>
              <p>
                <span>环境信息</span>
                <span>环境温度0摄氏度</span>
              </p>
              <p>
                <span>环境信息</span>
                <span>环境温度0摄氏度</span>
              </p>
            </div>
          </div>
          <div class="dialog_right">
            <div style="background: #D9ECEA;height: 26px;line-height: 26px;padding: 0 10px;">
              <p style="float: left">识别结果</p>
              <p style="float: right;cursor: pointer">下一页</p>
            </div>
            <div style="padding:10px">
              <p style="margin-bottom:10px">结果：</p>
              <p><el-radio @change="radioResultChange" v-model="radio_result" label="1">正常</el-radio></p>
              <div style="height: 120px;">
                <el-radio @change="radioResultChange" v-model="radio_result" label="2" style="margin: 0">异常：</el-radio>
                <el-select size="mini" v-model="value_type" multiple :disabled="disabled_option"
                           placeholder="请选择" style="width: 220px">
                  <el-option
                    v-for="item in alarm_type_option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div style="height: 80px">
                <span>告警等级：</span>
                <el-select size="mini" v-model="value_level"
                           placeholder="请选择" style="width: 220px;margin-left:-4px">
                  <el-option
                    v-for="item in alarm_level_option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div style="height: 100px">
                <p style="margin-bottom:10px">实际值：</p>
                <p><el-radio @change="" v-model="radio_value" label="1">识别正确</el-radio></p>
                <p>
                  <el-radio @change="" v-model="radio_value" label="2">识别错误</el-radio>
                  <el-input v-model="input_value_wrong" size="mini" style="width: 150px"></el-input>
                </p>
              </div>
              <div>
                <p style="margin-bottom:10px">意见：</p>
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>

              </div>

            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAlarm = false">取 消</el-button>
        <el-button type="primary" @click=" ">确 认</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import menuBottom from '../components/menuBottom.vue'
  import HeaderTop from '../components/headerTop.vue'
  import devTreeNoCheck from '../components/devTreeNoCheck.vue'
  import ElImage from "../../node_modules/element-ui/packages/image/src/main";

  const pointsOptions = ['点', '面' ]
  export default {
    data(){
      return{
        title:'巡检结果浏览 > 巡检结果浏览',
        tableDataResults:[
        	{address:'123',id:0},
          {address:'123',id:1},
          {address:'123',id:2},
          {address:'123',id:3},
          {address:'123',id:4},
          {address:'123',id:5},
        ],
        checkAllPoint: false,
        checkedPoints: [],
        pointsArr: pointsOptions,
        isIndeterminatePoint: false,
        value_start:'',
        value_end:'',
        radio:'2',
        currentPage1:1,
        total1:1,
        imageArr:[
          {
            title:'A相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'B相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'C相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'A相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'B相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'C相可见光',
            url:'../../static/abc.jpg'
          },
        ],
        srcList: [
          '../../static/abc.jpg',
        ],
        dialogVisibleAlarm:false,
        point_info:'这是一段点位信息',
        imgArr:[
          {
            title:'A相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'B相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'C相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'A相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'B相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'C相可见光',
            url:'../../static/abc.jpg'
          },
          {
            title:'C相可见光',
            url:'../../static/abc.jpg'
          },
        ],
        radio_result:'1',
        value_type:'',
        alarm_type_option:[
          {value:1,label:'超温报警'},
          {value:2,label:'温升报警'},
          {value:3,label:'三相对比报警'},
          {value:4,label:'三相温差报警'},
          {value:5,label:'越限报警'},
        ],
        disabled_option:true,
        value_level:'',
        alarm_level_option:[
          {value:1,label:'正常'},
          {value:2,label:'预警'},
          {value:3,label:'一般缺陷'},
          {value:4,label:'严重缺陷'},
          {value:5,label:'危险缺陷'},
        ],
        radio_value:'1',
        input_value_wrong:'',
        textarea:'',
      }
    },
    components: {
      ElImage,
      HeaderTop,
      devTreeNoCheck,
      menuBottom
    },
    mounted(){
    	this.value_end = this.getDateTime()
      this.value_start = this.convertToLateDate()
    },
    methods:{
      handleCheckAllChangePoint(val){
        this.checkedPoints = val ? pointsOptions : [];
        this.isIndeterminatePoint = false;
      },
      handleCheckedCitiesChangePoint(value){
        let checkedCount = value.length;
        this.checkAllPoint = checkedCount === this.pointsArr.length;
        this.isIndeterminatePoint = checkedCount > 0 && checkedCount < this.pointsArr.length;
      },

      queryList(){
      	let _this = this
      	let queryData = {
          startTime: _this.value_start,
          endTime: _this.value_end,
          s: _this.radio
        }
      	console.log(queryData)
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
      dblBoxShow(row){
      	let _this = this
      	console.log(row.id)
        _this.dialogVisibleAlarm= true
      },
      radioResultChange(val){
        if(val==2){
          this.disabled_option = false
        }else {
          this.disabled_option = true
        }
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .results_browse_wrap
    height 100%
    .results_browse_top
      height 30px
      display flex
      align-items center
      p
        float left
        font-weight 600
        margin 0 50px 0 40px
        line-height 28px
      .all_content
        float left
        display flex
        height 28px
        line-height 28px
        div
          margin 0 30px
    .results_browse_content
      height calc(100% - 90px)
      display flex
      .results_browse_left
        width 300px
        background white
        border 1px solid #cae7ee
        float left
        box-sizing border-box
      .results_browse_right
        border 1px solid #cae7ee
        width calc(100% - 300px)
        background white
        float left
        box-sizing border-box
        .right_title_tool
          width 100%
          height 30px
          background #cae7ee\0
          background linear-gradient(#e3f2ee,#cae7ee)
          display flex
          align-items center
          p
            float left
            margin-left 10px
            font-weight 600
            line-height 28px
          div
            float left
            margin-right 20px
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
                line-height 30px
                img
                  width 16px
                  height 16px
                  margin-right 4px


        .right_title
          width 100%
          height 30px
          line-height 30px
          background linear-gradient(#e3f2ee,#cae7ee)
          padding-left 12px
          box-sizing border-box

        .right_bottom
          height calc(100% - 350px)
          .ul_img_wrap
            height calc(100% - 30px)
            .li_img
              height calc(100% - 22px)
    .alarm_dialog /deep/
      .el-dialog
        background #d7efec
        width: 90%;
        min-width: 1000px;
        padding-bottom: 6px;
        .el-dialog__header
          padding 10px 10px 5px
          position relative
          height 16px
          .el-dialog__title
            display inline-block
            position absolute
            font-size 14px
            top 4px
            left 10px
          .el-dialog__headerbtn
            top 8px
            right 8px
        .el-dialog__body
          padding 0px 8px
          .dialog_content
            background white
            /*padding 10px 10px*/
            overflow hidden
            border 1px solid #90e8c6
            .dialog_left
              width 75%
              border-right 1px solid #90e8c6
              float left
              box-sizing border-box
            .dialog_right
              width 25%
              float left

        .el-dialog__footer
          background #fff
          border 1px solid #90e8c6
          border-top none
          margin 1px 8px 5px
          padding 5px 10px
          .el-button
            padding 8px 22px


</style>

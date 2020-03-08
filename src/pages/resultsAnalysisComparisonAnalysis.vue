<template>
  <div>
    <HeaderTop :title="title"></HeaderTop>
    <div class="analysis_wrap">
      <div class="analysis_top">
        <p>点位类型：</p>
        <div class="all_content all_content_leixing">
          <el-checkbox style="float: left" :indeterminate="isIndeterminatePoint" v-model="checkAllPoint" @change="handleCheckAllChangePoint">全部</el-checkbox>
          <el-checkbox-group v-model="checkedPoints" @change="handleCheckedCitiesChangePoint">
            <el-checkbox v-for="pointWeizhi in pointsArr" :label="pointWeizhi" :key="pointWeizhi">{{pointWeizhi}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="analysis_content">
        <div>
          <DevTree></DevTree>
        </div>
        <div class="center">
          <div class="center_top">
            <div class="top1">
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
            </div>
            <div class="top2">
              <p>采集信息：</p>
              <el-radio v-model="radio" v-for="item in radio_items"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-radio>
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
          </div>
        </div>
        <div class="right">
          <div class="right_top">
            <el-radio v-model="radio_n" v-for="item in radio_items_n"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"></el-radio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import DevTree from '../components/devTree.vue'

  const pointsOptions = ['点', '面' ]
  export default {
    data(){
      return{
        title:'对比分析 > 对比分析',

        checkAllPoint: false,
        checkedPoints: [],
        pointsArr: pointsOptions,
        isIndeterminatePoint: false,
        value1:'',
        value2:'',
        radio: '1',
        radio_items:[
          {
            value:1,
            label:'可见光'
          },
          {
            value:2,
            label:'红外'
          },
          {
            value:3,
            label:'音视频'
          }
        ],
        radio_n: '1',
        radio_items_n:[
          {
            value:1,
            label:' 2 * n '
          },
          {
            value:2,
            label:'  3* n '
          }
        ]

      }
    },
    components: {
      HeaderTop,
      DevTree

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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .analysis_wrap
    .analysis_top
      margin 10px 0
      display flex
      align-items center
      p
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
      .center
        width 760px
        border 1px solid #cae7ee
        .center_top
          background linear-gradient(#e3f2ee,#cae7ee);
          .top1, .top2
            display flex
            align-items center
            height 30px
            p
              margin-left 10px
              font-weight 600
        .top3
          height 30px
          padding-top 7px
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


      .right
        width 100%
        border 1px solid #cae7ee
        .right_top
          height 30px
          padding 7px 0 0 10px
          background linear-gradient(#e3f2ee,#cae7ee);
          box-sizing border-box
</style>

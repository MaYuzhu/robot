<template>
  <div class="results_browse_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="results_browse_top">
      <p>点位类型：</p>
      <div class="all_content">
        <el-checkbox style="float: left" :indeterminate="isIndeterminatePoint" v-model="checkAllPoint" @change="handleCheckAllChangePoint">全部</el-checkbox>
        <el-checkbox-group v-model="checkedPoints" @change="handleCheckedCitiesChangePoint">
          <el-checkbox v-for="pointWeizhi in pointsArr" :label="pointWeizhi" :key="pointWeizhi">{{pointWeizhi}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="results_browse_content">
      <DevTree class="results_browse_left"></DevTree>
      <div class="results_browse_right">
        <div class="right_title_tool">
          <p>开始时间：</p>
          <el-date-picker size="mini" style="width: 160px"
                          v-model="value1"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
          <p>结束时间：</p>
          <el-date-picker size="mini" style="width: 160px"
                          v-model="value1"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
          <el-radio v-model="radio" label="1">已审核</el-radio>
          <el-radio v-model="radio" label="2">未审核</el-radio>
          <div>
            <ul>
              <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
              <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
              <li><img src="../../static/images/export.png" alt=""><span>导出</span></li>
            </ul>
          </div>
        </div>
        <div class="right_title">巡检结果</div>
        <div>
          <el-table size="mini"

                    border
                    style="width: 100%;height: 200px">
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
        title:'巡检结果浏览 > 巡检结果浏览',
        checkAllPoint: false,
        checkedPoints: [],
        pointsArr: pointsOptions,
        isIndeterminatePoint: false,
        value1:'',
        radio:'1'
      }
    },
    components: {
      HeaderTop,
      DevTree

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
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .results_browse_wrap
    .results_browse_top
      height 30px
      display flex
      align-items center
      p
        font-weight 600
        margin 0 50px 0 40px
      .all_content
        display flex
        div
          margin 0 30px
    .results_browse_content
      display flex
      .results_browse_left
        background white
      .results_browse_right
        border 1px solid #cae7ee
        width 100%
        background white
        .right_title_tool
          width 100%
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


        .right_title
          width 100%
          height 30px
          line-height 30px
          background linear-gradient(#e3f2ee,#cae7ee)
          padding-left 12px

</style>

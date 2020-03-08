<template>
	<div id="tabs">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="实时信息" name="first">
        <div style="padding:0 8px">
          <el-table size="mini"

            border
            style="width: 100%">
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
              label="识别类型"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="采集信息"
              >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备警告信息" name="second">
        <div style="padding:0 8px">
          <el-table size="mini"

                    border
                    style="width: 100%">
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
              label="识别类型"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="采集信息"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="告警类型"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="告警等级"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统警告信息" name="third">
        <div style="padding:0 8px">
          <el-table size="mini"

                    border
                    style="width: 100%">
            <el-table-column
              prop="date"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="address"
              label="报警类型"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="报警级别"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="报警内容"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="报警时间"
            >
            </el-table-column>

          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="自由模式巡检结果" name="fourth">
        <div style="height: 100px"></div>
      </el-tab-pane>
    </el-tabs>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  #tabs
    background transparent
    .el-tabs--card
      .el-tabs__header
        background: linear-gradient(#e3f2ee,#cae7ee)
        .el-tabs__item
          height: 30px;
          margin: 0 3px;
          line-height: 30px;
          border: 1px solid #ccc;
          border-bottom: none;
          border-radius: 4px 4px 0 0;
          color #000000
        .is-active
          color: #109cb4;
          border: 1px solid #109cb4;
          border-bottom: none;
          background white

</style>

<template>
	<div id="tabs">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="实时信息" name="first">
        <div style="padding:0 0px;height:146px;overflow: auto"><!--height:144px;overflow: auto-->
          <el-table size="mini"
            :data="tableDataPointNow"
            border
            style="width: 100%">
            <el-table-column
              prop="date" align="center"
              label="序号" type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="task.name" align="center"
              label="任务名称" width="300"
            >
            </el-table-column>
            <el-table-column
              prop="point.name" align="center"
              label="点位名称"
            >
            </el-table-column>
            <el-table-column
              prop="createTime" align="center"
              label="识别时间"  width="330"
            >
            </el-table-column>
            <el-table-column
              prop="value" align="center"
              label="识别结果"
            >
            </el-table-column>
            <el-table-column
              prop="pointType" align="center"
              label="识别类型" :formatter="pointTypeText"
            >
            </el-table-column>
            <!--<el-table-column
              prop="address"
              label="采集信息"
              >
            </el-table-column>-->
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备警告信息" name="second">
        <div style="padding:0 4px;height:146px;overflow: auto">
          <el-table size="mini" align="right"
                    :data="tableDataPointAlarmNow"
                    border
                    style="width: 100%">
            <el-table-column
              prop="date" type="index"
              label="序号" align="center"
              width="50">
            </el-table-column>
            <el-table-column align="center"
              prop="task.name"
              label="任务名称"
            >
            </el-table-column>
            <el-table-column align="center"
              prop="point.name"
              label="点位名称"
            >
            </el-table-column>
            <el-table-column align="center"
              prop="checkTime" width="260"
              label="识别时间"
            >
            </el-table-column>
            <el-table-column align="center"
              prop="pointHistory.value"
              label="识别结果"
            >
            </el-table-column>
            <el-table-column align="center"
              prop="reconType.name"
              label="识别类型"
            >
            </el-table-column>
            <!--<el-table-column
              prop="address"
              label="采集信息"
            >
            </el-table-column>-->
            <el-table-column align="center"
              prop="address"
              label="告警类型"
            >
            </el-table-column>
            <el-table-column align="center"
              prop="alarmLevel" :formatter="alarmLevelText"
              label="告警等级"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统警告信息" name="third">
        <div style="padding:0 4px">
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
      <!--<el-tab-pane label="自由模式巡检结果" name="fourth">
        <div style="height: 100px"></div>
      </el-tab-pane>-->
    </el-tabs>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
          ajaxTablePointNowData:{page:1, size:3},
          tableDataPointNow:[],
          pointNowTimeId:null,
          tableDataPointAlarmNow:[],
          pointAlarmNowTimeId:null,

      };
    },
    mounted(){
        this.pointNow()
        this.pointAlarmNow()
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      pointNow(){
          let _this = this
          _this.ajax_api('post',url_api + '/point-history',
              _this.ajaxTablePointNowData,
              true,
              function (res) {
                  if(res.code == 200){
                      //console.log(res.data.items)
                      _this.tableDataPointNow = res.data.items
                      //pointNowTime()
                  }
              })

          function pointNowTime(){
              _this.ajax_api('post',url_api + '/point-history',
                  {page:1, size:1},
                  true,
                  function (res) {
                      if(res.code == 200){
                          //console.log(res.data.items)
                          if(_this.tableDataPointNow[0].createTime!=res.data.items[0].createTime){
                              _this.tableDataPointNow.unshift(res.data.items[0])
                          }
                      }
                  })
              _this.pointNowTimeId = setTimeout(pointNowTime,2000)
          }
      },
      pointTypeText(row){
          return row.pointType==0 ? '点位' : '类型'
      },

      pointAlarmNow(){
            let _this = this
            _this.ajax_api('post',url_api + '/point-alarm-history',
                {page:1, size:3},
                true,
                function (res) {
                    if(res.code == 200){
                        console.log(res.data.items)
                        _this.tableDataPointAlarmNow = res.data.items
                        //pointAlarmNowTime()
                    }
                })

            function pointAlarmNowTime(){
                _this.ajax_api('post',url_api + '/point-alarm-history',
                    {page:1, size:1},
                    true,
                    function (res) {
                        if(res.code == 200){
                            console.log(res.data.items)
                            if(_this.tableDataPointAlarmNow[0].createTime!=res.data.items[0].createTime){
                                _this.tableDataPointAlarmNow.unshift(res.data.items[0])
                            }
                        }
                    })
                _this.pointAlarmNowTimeId = setTimeout(pointAlarmNowTime,2000)
            }
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

    },
    destroyed(){
        let _this = this
        //console.log(159)
        clearTimeout(_this.pointNowTimeId)
    },

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  #tabs
    /*background transparent*/
    .el-tabs--card
      .el-tabs__header
        background: linear-gradient(#e3f2ee,#cae7ee)
        margin 0
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

<template>
	<div id="tabs">
    <!--<div class="linshi" @click="exportExcel">临时导出</div>-->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="实时信息" name="first">
        <div style="padding:0 0px;" class="box_height"><!--height:144px;overflow: auto-->
          <el-table size="mini" id="rebateSetTable"
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
              prop="point.id" align="center"
              label="点位ID" width="60"
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
              <template slot-scope="scope">
                <span v-if="scope.row">{{scope.row.valueDesc}}</span>
                <span v-if="Math.abs(scope.row.value)<10000">{{scope.row.point.unit}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="reconType.name" align="center"
              label="识别类型"
            >
            </el-table-column>

            <el-table-column
              prop="address" align="center"
              label="采集信息"
              >
              <template slot-scope="scope" height="10px" v-if="scope.row">
                <img :src="scope.row.cameraPic?imgUrlBefore+scope.row.cameraPic:
                           scope.row.flirPic?imgUrlBefore+scope.row.flirPic:
                           '../../static/img/no404.jpg'"
                     style="display:block;width:80px;height:32px;margin:0 auto;"
                     @click="openImg(scope.row.cameraPic?imgUrlBefore+scope.row.cameraPic:
                           scope.row.flirPic?imgUrlBefore+scope.row.flirPic:
                           '../../static/img/no404.jpg')">
              </template>
              <!--<template slot-scope="scope" height="10px" v-if="scope.row">
                <img :src="scope.row.cameraPic?imgUrlBefore+scope.row.cameraPic:
                      imgUrlBefore+scope.row.flirPic?'../../static/img/no404.jpg':imgUrlBefore+scope.row.flirPic
                      "
                     style="display:block;width:80px;height:32px;margin:0 auto;"
                     @click="openImg(scope.row.cameraPic?imgUrlBefore+scope.row.cameraPic:
                      imgUrlBefore+scope.row.flirPic!='undefined'?imgUrlBefore+scope.row.flirPic:
                      '../../static/img/no404.jpg')">
              </template>-->
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备警告信息" name="second">
        <div class="box_height" style="padding:0 4px;overflow: auto">
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
                             prop="point.id"
                             label="ID"
            >
            </el-table-column>
            <el-table-column align="center"
              prop="createTime" width="260"
              label="识别时间"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="valueDesc"
                             label="识别结果"
            >
            </el-table-column>
            <!--<el-table-column align="center"
              prop="pointHistory.value"
              label="识别结果"
            >
              <template slot-scope="scope">
                <span v-if="scope.row">{{scope.row.valueDesc}}{{scope.row.point.unit}}</span>
              </template>
            </el-table-column>-->
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
              prop="alarmType.name"
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
        <div class="box_height" style="padding:0 4px">
          <el-table size="mini"
                    :data="tableDataSysAlarmNow"
                    border
                    style="width: 100%">
            <el-table-column
              prop="date" type="index"
              label="序号" align="center"
              width="50">
            </el-table-column>
            <el-table-column
              prop="address" align="center"
              label="报警类型"
            >
            </el-table-column>
            <el-table-column
              prop="address" align="center"
              label="报警级别"
            >
            </el-table-column>
            <el-table-column
              prop="address" align="center"
              label="报警内容"
            >
            </el-table-column>
            <el-table-column
              prop="address" align="center"
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
    <el-dialog width="500px" :visible.sync="imgVisible" class="img-dialog" @close="closeImg">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>
    <div class="baojing"><audio id="audio" controls="controls" loop="loop"
                                src="../../static/img/baojing.mp3"></audio></div>
	</div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    data() {
      return {
        activeName: 'first',
          ajaxTablePointNowData:{page:1, size:1},
          tableDataPointNow:[],
          pointNowTimeId:null,
          tableDataPointAlarmNow:[],
          pointAlarmNowTimeId:null,
          tableDataSysAlarmNow:[],
          SysAlarmNowTimeId:null,
          time:3000,
          defaultImg:'../../static/img/play.png',
          src: 'http://element.eleme.io/static/hamburger.50e4091.png',
          tableData: [],
          imgVisible: false,
          dialogImgUrl:'',
          imgUrlBefore: url_img + '/smcsp/',
          ros:null,
          url:robotUrl,
          sanxiang:false,
          requexian:false,
          yuexian:false,
          youwei:false,
      };
    },
    props: ['irDataTaskHistoryId'],
    created(){
      let _this = this
      _this.$root.eventHub.$on('taskSuccess',(target) => {
        //console.log(target)
        _this.tableDataPointNow = []
      });

      _this.$root.eventHub.$on('taskEnd',(target) => {
        console.log(target)
        clearTimeout(_this.pointNowTimeId)
        clearTimeout(_this.pointAlarmNowTimeId)
        clearTimeout(_this.SysAlarmNowTimeId)
        if(target){
          _this.tableDataPointNow = []
        }
      });
    },
    mounted(){
        let _this = this
        _this.ros = new ROSLIB.Ros({
          url : _this.url
        });
        _this.ros.on('connection', function() {

        });
        _this.listener = new ROSLIB.Topic({
          ros : _this.ros,
          name : '/task_execute_status',
          messageType : 'robotmsg/TaskExecuteStatus'
        });
        _this.listener.subscribe(function(message) {
          //console.log(message.task_status)
          if(message.task_status==0){
            clearTimeout(_this.pointNowTimeId)
            clearTimeout(_this.pointAlarmNowTimeId)
            clearTimeout(_this.SysAlarmNowTimeId)
          }else if(message.task_status==1){
            _this.pointNow()
            _this.pointAlarmNow()
            _this.pointSysAlarmNow()
          }
        });
        _this.ajax_api('get',url_api + '/robot-param' + '?&_t=' + new Date().getTime(),
          {irBaseRobotId:1,size:200,page:1,},
          true, function (res) {
            let alarm_message = res.data.items.filter(item => {
              return item.name == 'alarm-message-setting'
            })
            let alarm_arr = alarm_message[0].value.split(',')
            //console.log(alarm_message[0].value)
            for(let i=0;i<alarm_arr.length;i++){
              if(alarm_arr[i]==6){
                _this.sanxiang = true
              }
              if(alarm_arr[i]==7){
                _this.requexian = true
              }
              if(alarm_arr[i]==8){
                _this.yuexian = true
              }
              if(alarm_arr[i]==9){
                _this.youwei = true
              }
            }
          })
        _this.pointNow()
        _this.pointAlarmNow()
        _this.pointSysAlarmNow()
        let box_height = $('#tabs').height() - 31
        $('.box_height').height(box_height+'px')
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
        this.pointAlarmNow()
        this.pointSysAlarmNow()
      },
      pointNow(){
          let _this = this
          console.log(_this.irDataTaskHistoryId)
          if(!_this.irDataTaskHistoryId){
            _this.tableDataPointNow = []
            return
          }
          _this.ajaxTablePointNowData.irDataTaskHistoryId = _this.irDataTaskHistoryId
          _this.ajax_api('post',url_api + '/point-history',
              {page:1, size:10000,
                irDataTaskHistoryId:_this.irDataTaskHistoryId
              },
              true,
              function (res) {
                //console.log(res)
                  if(res.code == 200){
                      //console.log(res.data.items)
                      if(_this.irDataTaskHistoryId){
                        _this.tableDataPointNow = res.data.items
                      }
                      pointNowTime()
                  }
              })

          function pointNowTime(){
              //console.log(_this.irDataTaskHistoryId)
              _this.ajax_api('post',url_api + '/point-history',
                  {page:1, size:10000,
                    irDataTaskHistoryId:_this.irDataTaskHistoryId
                  },
                  true,
                  function (res) {
                      //console.log(res.data.items)
                      if(! _this.irDataTaskHistoryId){
                        //console.log('id为空')
                        return
                      }
                      //找到 new 值，判断报警
                      if(_this.tableDataPointNow.length==res.data.items.length){
                        return
                      }else {
                        /*if(Math.abs(res.data.items[0].value)>=10000){
                          //alert('设备'+res.data.items[0].point.id+res.data.items[0].valueDesc)
                          let message = '设备'+res.data.items[0].point.id+res.data.items[0].valueDesc
                          _this.playOrPaused()
                          _this.$alert(message, '系统警报', {
                            confirmButtonText: '确定',
                            callback: action => {
                              _this.playClose()
                            }
                          })
                        }*/
                        _this.tableDataPointNow = res.data.items
                      }
                      //_this.tableDataPointNow = res.data.items

                      //原来一条一条加-start
                      /*if(_this.tableDataPointNow.length==0 && res.data.items.length>0){
                        console.log('+1')
                        console.log(_this.irDataTaskHistoryId+'id')
                        _this.tableDataPointNow.unshift(res.data.items[0])
                      }
                      if(res.code == 200 && res.data.items.length>0){
                          //console.log(_this.tableDataPointNow[0].createTime)
                          if(_this.tableDataPointNow[0].createTime!=res.data.items[0].createTime){
                              _this.tableDataPointNow.unshift(res.data.items[0])
                          }
                      }*/
                      //原来一条一条加-end
                  })
              _this.pointNowTimeId = setTimeout(pointNowTime,_this.time)
          }
      },
      pointTypeText(row){
          return row.pointType==0 ? '点位' : '类型'
      },

      pointAlarmNow(){
        let _this = this
        _this.ajax_api('post',url_api + '/point-alarm-history',
          {page:1, size:10000,
            irDataTaskHistoryId:_this.irDataTaskHistoryId
          },
          true,
          function (res) {
            //console.log(res)
            if(! _this.irDataTaskHistoryId){
              //console.log('id为空')
              return
            }
            if(res.code == 200){
                console.log(res.data.items)
                _this.tableDataPointAlarmNow = res.data.items
                pointAlarmNowTime()
            }
          })

          function pointAlarmNowTime(){
                _this.ajax_api('post',url_api + '/point-alarm-history',
                  {page:1, size:10000,
                    irDataTaskHistoryId:_this.irDataTaskHistoryId
                  },
                  true,
                  function (res) {
                      if(res.code == 200){
                        //console.log(res.data.items)
                        //找到 new 值，判断报警
                        if(_this.tableDataPointAlarmNow.length==res.data.items.length){
                          return
                        }else {
                          if(!res.data.items[0].alarmType){
                            return
                          }
                          if(res.data.items[0].alarmType.id == 1 && _this.sanxiang){
                            //alert('设备'+res.data.items[0].point.id+res.data.items[0].valueDesc)
                            let message = res.data.items[0].point.name+'-'+res.data.items[0].alarmType.name
                            _this.playOrPaused()
                            _this.$alert(message, '系统警报', {
                              confirmButtonText: '确定',
                              callback: action => {
                                _this.playClose()
                              }
                            })
                          }
                          if(res.data.items[0].alarmType.id == 4 && _this.requexian){
                            //alert('设备'+res.data.items[0].point.id+res.data.items[0].valueDesc)
                            let message = res.data.items[0].point.name+'-'+res.data.items[0].alarmType.name
                            _this.playOrPaused()
                            _this.$alert(message, '系统警报', {
                              confirmButtonText: '确定',
                              callback: action => {
                                _this.playClose()
                              }
                            })
                          }
                          if(res.data.items[0].alarmType.id == 5 && _this.yuexian){
                            //alert('设备'+res.data.items[0].point.id+res.data.items[0].valueDesc)
                            let message = res.data.items[0].point.name+'-'+res.data.items[0].alarmType.name
                            _this.playOrPaused()
                            _this.$alert(message, '系统警报', {
                              confirmButtonText: '确定',
                              callback: action => {
                                _this.playClose()
                              }
                            })
                          }
                          if(res.data.items[0].alarmType.id == 6 && _this.youwei){
                            //alert('设备'+res.data.items[0].point.id+res.data.items[0].valueDesc)
                            let message = res.data.items[0].point.name+'-'+res.data.items[0].alarmType.name
                            _this.playOrPaused()
                            _this.$alert(message, '系统警报', {
                              confirmButtonText: '确定',
                              callback: action => {
                                _this.playClose()
                              }
                            })
                          }
                          _this.tableDataPointAlarmNow = res.data.items
                        }
                        //_this.tableDataPointAlarmNow = res.data.items
                      }
                  })
              _this.pointAlarmNowTimeId = setTimeout(pointAlarmNowTime,_this.time)
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

      pointSysAlarmNow(){
          let _this = this
          _this.ajax_api('get',url_api + '/sys-point-alarm-history',
            {page:1, size:10000,
              irDataTaskHistoryId:_this.irDataTaskHistoryId
            },
            true,
            function (res) {
                if(res.code == 200){
                    //console.log(res.data.items)
                    _this.tableDataSysAlarmNow = res.data.items
                    pointSysAlarmNowTime()
                }
            })

          function pointSysAlarmNowTime(){
              _this.ajax_api('get',url_api + '/sys-point-alarm-history',
                {page:1, size:10000,
                  irDataTaskHistoryId:_this.irDataTaskHistoryId
                },
                true,
                function (res) {
                  if(res.code == 200){
                    _this.tableDataSysAlarmNow = res.data.items
                  }
                })
              _this.SysAlarmNowTimeId = setTimeout(pointSysAlarmNowTime,_this.time)
          }
      },
      alarmSysLevelText(row){
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

      openImg(url) {
          let _this = this
          if (url) {
              _this.imgVisible = true
              _this.dialogImgUrl = url
              _this.$emit('isVideo', false)
          }
      },
      closeImg(){
          let _this = this
          _this.$emit('isVideo', true)
      },

      //导出表格
      exportExcel () {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
        /* get binary string as output */
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '结果数据.xlsx');
        } catch (e)
        {
          if (typeof console !== 'undefined')
            console.log(e, wbout)
        }
        return wbout
      },

      //报警声音
      playOrPaused(id,obj){
        var audio = document.getElementById('audio');
        if(audio.paused){
          audio.play();
          //obj.innerHTML='暂停';
          return;
        }
        audio.pause();
        //obj.innerHTML='播放';
      },
      playClose(id,obj){
        var audio = document.getElementById('audio');
        audio.pause();
      },
    },
    destroyed(){
        let _this = this
        //console.log(159)
        clearTimeout(_this.pointNowTimeId)
        clearTimeout(_this.pointAlarmNowTimeId)
        clearTimeout(_this.SysAlarmNowTimeId)
    },


  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  #tabs
    /*background transparent*/
    position relative
    height 100%
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

    /deep/.el-tabs
      height 100%
    /deep/.el-tabs__content
      height calc(100% - 31px)
    /deep/.el-table__body td
      padding 0px
    .box_height
      height 260px
      overflow auto
    /deep/.img-dialog
      .el-dialog__header
        padding: 0!important;
        .el-dialog__headerbtn
          right 10px
          top 10px

    .linshi
      position absolute
      padding 5px 8px
      border-radius 3px
      top 5px
      right 20px
      background #146363
      color white
      z-index 999
    .baojing
      position absolute
      z-index 20000
      background #3d8fff
      top 50px
      left -3000px
      margin-left -1000px
</style>

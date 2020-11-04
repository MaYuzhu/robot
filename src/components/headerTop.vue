<template>
  <div class="head_wrap">
    <div class="head_left">
      <div class="left_top">
        <div @click="goHome">
          <i class="head_i shouye"></i>
          <span>首页</span>
        </div>
        <div>
          <a href="/static/test.docx" target="_blank">
            <i class="head_i bangzhu"></i>
            <span style="color:#000">帮助</span>
          </a>
        </div>
        <div @click="logout">
          <i class="head_i tuichu"></i>
          <span>退出</span>
        </div>
        <div class="welcome">
          <span>欢迎您，机器人管理系统，</span><span>{{username}}</span>
        </div>
      </div>
      <div class="left_bottom">
        <div class="menu" @mouseover="mouseOver"
             @mouseleave="mouseLeave">
          <div class="menu_title">系统导航</div>
          <ul class="menu_ul" v-show="menu_show">
            <li @mouseover="mouseOverLi(1)"
                @mouseleave="mouseLeaveLi(1)">
              <div class="but_item">
                <img src="../../static/images/robotManagement.png" alt="">
                <span>机器人管理</span>
                <span>&gt;</span>
              </div>
              <div class="pop_up">
                <dl>
                  <dt>机器人管理</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/robots/robot-management">机器人管理</router-link>
                      <span>|</span>
                    </div>
                    <div v-if="false">
                      <router-link to="/robots/add-task">创建任务</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
            <li @mouseover="mouseOverLi(2)"
                @mouseleave="mouseLeaveLi(2)">
              <div class="but_item">
                <img src="../../static/images/taskManagement.png" alt="">
                <span>任务管理</span>
                <span>&gt;</span>
              </div>
              <div class="pop_up">
                <dl>
                  <dt>全面巡检</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/tasks/comprehensive-inspection">全面巡检</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>例行巡检</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/tasks/routine-inspection">例行巡检</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>专项巡检</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/tasks/infrared-temperature">红外测温</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/tasks/oil-transcribe">油位油温表抄录</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/tasks/arrester-transcribe">避雷器表抄录</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/tasks/pressure-transcribe">SF6压力表抄录</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/tasks/hydraulic-transcribe">液压表抄录</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/tasks/position-status">位置状态识别</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/tasks/tasks-picture-upload">异物缺陷识别</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>特殊巡检</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/tasks/bad-weather">恶劣天气</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/tasks/defect-tracking">缺陷跟踪</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/tasks/defect-tracking1">远方状态确认</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/tasks/defect-tracking2">远方异常告警确认</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/tasks/defect-tracking3">安防联动</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/tasks/defect-tracking4">协助应急事故处理</router-link>
                      <span>|</span>
                    </div>
                    <div @click="rengong">
                      <router-link to="/monitors/robot-control">人工遥控巡检</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <!--<dl>
                  <dt>多光谱巡检</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/tasks/multispectral-inspection">多光谱巡检</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>-->
                <dl>
                  <dt>自定义任务</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/tasks/custom-task">自定义任务</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>地图选点</dt>
                  <span>|</span>
                  <dd>
                    <div @click="xuandian()">
                      <router-link to="/robots/robot-management">地图选点</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>任务展示</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/tasks/task-show">任务展示</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
            <li @mouseover="mouseOverLi(3)"
                @mouseleave="mouseLeaveLi(3)">
              <div class="but_item">
                <img src="../../static/images/monitoring.png" alt="">
                <span>实时监控</span>
                <span>&gt;</span>
              </div>
              <div class="pop_up">
                <dl>
                  <dt>巡检监控</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/monitors/inspection-monitoring">巡检监控</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>机器人遥控</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/monitors/robot-control">机器人遥控</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
            <li @mouseover="mouseOverLi(4)"
                @mouseleave="mouseLeaveLi(4)">
              <div class="but_item">
                <img src="../../static/images/resultsConfirm.png" alt="">
                <span>巡检结果确认</span>
                <span>&gt;</span>
              </div>
              <div class="pop_up">
                <dl>
                  <dt>设备告警信息确认</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/resultsConfirm/alarm-query">设备告警信息确认</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/resultsConfirm/lineShow">主接线展示</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/resultsConfirm/interval-show">间隔展示</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>巡检结果浏览</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/resultsConfirm/inspection-results-browse">巡检结果浏览</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/resultsConfirm/inspection-task-audit">巡检任务审核</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>巡检报告生成</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/resultsConfirm/inspection-report-generate">巡检报告生成</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
            <li @mouseover="mouseOverLi(5)"
                @mouseleave="mouseLeaveLi(5)">
              <div class="but_item">
                <img src="../../static/images/resultsAnalysis.png" alt="">
                <span>巡检结果分析</span>
                <span>&gt;</span>
              </div>
              <div class="pop_up">
                <dl>
                  <dt>对比分析</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/resultsAnalysis/comparison-analysis">对比分析</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>生成报表</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/resultsAnalysis/generate-reports">生成报表</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
            <li @mouseover="mouseOverLi(6)"
                @mouseleave="mouseLeaveLi(6)">
              <div class="but_item">
                <img src="../../static/images/userSet.png" alt="">
                <span>用户设置</span>
                <span>&gt;</span>
              </div>
              <div class="pop_up">
                <dl>
                  <dt>告警设置</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/users/threshold-setting">告警阈值设置</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/users/alarm-message-setting">告警消息订阅设置</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>组织权限设置</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/users/rights-management">权限设置</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>点位设置</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/users/inspection-points-setting">巡检点位设置</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/users/inspection-points-setting-wh">典型巡检点位库维护</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>检修区域设置</dt>
                  <span>|</span>
                  <dd>
                    <div @click="guapai()">
                      <router-link to="/robots/robot-management">检修区域设置</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>系统设置</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/users/user-management">用户管理</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/users/organizational-structure">组织结构</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/users/log-management">日志管理</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
              </div>

            </li>
            <li @mouseover="mouseOverLi(7)"
                @mouseleave="mouseLeaveLi(7)">
              <div class="but_item">
                <img src="../../static/images/systemSet.png" alt="">
                <span>机器人系统调试维护</span>
                <span>&gt;</span>
              </div>
              <div class="pop_up">
                <dl>
                  <dt>巡检地图设置</dt>
                  <span>|</span>
                  <dd>
                    <div @click="map_edit">
                      <router-link to="/robots/robot-management">巡检地图维护</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>软件设置</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/systems/software-settings">软件设置</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>机器人设置</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/systems/robot-setup">机器人设置</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>机器人信息查询</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/systems/robot-alarm-query">机器人告警查询</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/systems/outlier-query">设备异常点查询</router-link>
                      <span>|</span>
                    </div>
                    <div>
                      <router-link to="/systems/status-display">机器人状态显示</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
        <div class="head_center">{{title}}</div>
        <router-link to="/resultsConfirm/alarm-query" class="top_count"><span>{{countAlarm}}</span></router-link>
      </div>
    </div>
    <div class="head_right">

      <div class="top_logo"><img :src="logoUrl" alt=""></div>
      <span class="divide-line"></span>
      <div class="top_text">
        <span>{{companyName}}</span>
        <span>{{companyArea}}</span>
      </div>
    </div>
    <div class="baojing"><audio id="audio" controls="controls" loop="loop"
                                src="../../static/img/baojing.mp3"></audio></div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {mapMutations} from 'vuex'
  export default {
    name: 'HeaderTop',
    data () {
      return {
        menu_show:false,
        username: localStorage.getItem("username"),
        companyName:'',
        companyArea:'',
        countAlarm:0,
        //../../static/images/logo.jpg
        logoUrl:'../../static/images/logo.jpg',
        url:robotUrl,
        ros:null,
        rosWebsocket:null,
        listener:null,

        listenerPower: null,
        listenerJoy: null,
        listenerController:null,
        listenerLocationStatus: null,
        listenerWebsocket: null,
        
        battery_capacity:'',
        
        timesWebsocketAlarm: null,
        timesWebsocketAlarm10s: null,
        
        times_s:1000*10,
        timesPowerAlarm: null,
        timesJoyAlarm: null,
        timesListenerController:null,
        timesListenerLocationStatus:null,
        isWebsocket: true,
      }

    },
    mounted(){
      let _this = this
      _this.ros = new ROSLIB.Ros({
        url: _this.url
      });
      _this.ros.on('connection', function() {
        //console.log('all_alarm');
      });
      _this.rosWebsocket = new ROSLIB.Ros({
        url: _this.url
      });
      _this.getCompanyName()
      _this.countAlarmShow()
      _this.init()
      //_this.allAlarm()      //红外  遥控0  计算单元  云台(检测设备)3 工控机
      //_this.power_now()     //电量 1
      //_this.controllerAlarm()      //驱动（按下急停触发） 2
      //_this.websocketAlarm()
      //_this.locationStatusAlarm()   //偏航4

    },
    props:['title'],
    methods: {
      init(){
        let _this = this

        _this.ajax_api('get',url_api + '/robot-param' + '?&_t=' + new Date().getTime(),
          {irBaseRobotId:1,size:200,page:1,},
          true, function (res) {
            let alarm_message = res.data.items.filter(item => {
              return item.name == 'alarm-message-setting'
            })
            let alarm_arr = alarm_message[0].value.split(',')
            //console.log(alarm_message[0].value)
            for(let i=0;i<alarm_arr.length;i++){
              if(alarm_arr[i]==0){
                _this.allAlarm(0)
              }
              if(alarm_arr[i]==3){
                _this.allAlarm(3)
              }
              if(alarm_arr[i]==1){
                _this.power_now()
              }
              if(alarm_arr[i]==2){
                _this.controllerAlarm()
              }
              if(alarm_arr[i]==4){
                _this.locationStatusAlarm()
              }

            }

          })
      },
      //...mapMutations(['changeLogin']),
      // 移入
      mouseOver() {
        this.menu_show = true
      },
      // 移出
      mouseLeave() {
        this.menu_show = false
      },
      // 移入
      mouseOverLi(index) {
        $(`.menu_ul>:nth-child(${index}) .pop_up`).show()
      },
      // 移出
      mouseLeaveLi(index) {
        $(`.menu_ul>:nth-child(${index}) .pop_up`).hide()
      },
      //退出
      logout(){
        /*this.$axios({
          method: 'delete',
          url: url_api + '/user/logout',
        }).then(res =>{
        	//console.log(res.data)
          this.changeLogin({ token: null})
          //localStorage.setItem("token",null);
          this.$message({
            message: '您已退出',
            type: 'success'
          });
          this.$router.push('/login');
        })*/
        let _this = this
        _this.ajax_api('delete',url_api + '/user/logout', null, true, function (res) {
          localStorage.setItem("token",null);
          _this.$message({
            message: '您已退出',
            type: 'success',
          });
          _this.$router.push('/login');
        })
      },
      //首页
      goHome(){
        this.$router.push('/monitors/inspection-monitoring');
      },
      //系统名称
      getCompanyName(){
        let _this = this
        _this.ajax_api('get',url_api + '/system-setting',
          null,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data.items)
              let items = res.data.items
              let company_name = items.filter(item =>{
                return item.name == "company_name"
              })
              let company_area = items.filter(item=>{
                return item.name == "company_area"
              })
              let logo = items.filter(item=>{
                return item.name == "logo"
              })
              _this.companyName = company_name[0].value
              _this.companyArea = company_area[0].value
              _this.imageUrl = logo[0].value
              _this.logoUrl = logo[0].value
            }
          })
      },
      //报警数显示
      countAlarmShow(){
        let _this = this
        _this.countAlarm = 0
      },
      wordDetail(){

      },

      //报警 遥控等
      allAlarm(val){
        let _this = this
        clearTimeout(_this.timesJoyAlarm)
        //接收任务是否完成-消息
        _this.listenerJoy = new ROSLIB.Topic({
          ros : _this.ros,
          name : '/self_check',
          messageType : 'robotmsg/connection_status'
        });
        _this.listenerJoy.subscribe(function(message) {
          //console.log(message)
          /*
            camera: true
            infrared_camera: true
            ipc: true
            joy: true
            xavier: true
          */
          if(!message.joy&&val==0){
            _this.openJoy('遥控信号故障（错误代码4001）')
            _this.playOrPaused()

          }
          if(!message.ipc&&val==3){
            _this.openAllJoy('工控机信号故障（错误代码4004）')
            _this.playOrPaused()

          }
          if(!message.xavierval==3){
            _this.openAllJoy('计算单元信号故障（错误代码4004）')
            _this.playOrPaused()

          }
          if(!message.infrared_camera&&val==3){
            _this.openAllJoy('红外信号故障（错误代码4004）')
            _this.playOrPaused()

          }
          if(!message.camera&&val==3){
            _this.openAllJoy('云台信号故障（错误代码4004）')
            _this.playOrPaused()

          }
        });
      },
      //驱动报警
      controllerAlarm(){
        //console.log('驱动')
        let _this = this
        _this.listenerController = new ROSLIB.Topic({
          ros : _this.ros,
          name : '/controller_status',
          messageType : 'std_msgs/Bool'
        });
        _this.listenerController.subscribe(function(message) {
          //console.log(message)
          if(!message.data) {
            _this.openController('驱动系统故障（错误代码4003）')
            _this.playOrPaused()
            _this.listenerController.unsubscribe();
          }
        })
      },
      //电池电量报警
      power_now(){
        let _this = this
        clearTimeout(_this.timesPowerAlarm)
        _this.ajax_api('get',url_api + '/robot-param' + '?&_t=' + new Date().getTime(),
          {irBaseRobotId:1,size:200,page:1,},
          true, function (res) {
            let battery_capacity = res.data.items.filter(item => {
              return item.name == 'battery_capacity'
            })
            _this.battery_capacity = battery_capacity[0].value*1
          })
        _this.listenerPower = new ROSLIB.Topic({
          ros : _this.ros,
          name : '/car_status_now',
          messageType : 'robotmsg/nrcar_status'
        });
        _this.listenerPower.subscribe(function(message) {
          //console.log(message.battery_info);
          if(message.battery_info<_this.battery_capacity){
            _this.openPower(`电池电量低于${_this.battery_capacity}%，请及时充电（错误代码4002）`)
            _this.playOrPaused()
          }
          _this.listenerPower.unsubscribe();
        });
      },
      //网络中断
      websocketAlarm(){
        //console.log('websocket~~~')
        let _this = this
        let flag = true
        let reconnect = false;
        /*_this.rosWebsocket.on('connection', function() {
          console.log('websocket===');
        });*/
        //console.log(_this.rosWebsocket)
        _this.rosWebsocket.on('error', function(error) {
          console.log('Error');
          flag = false
          _this.openWebsocket('网络信号故障')
          _this.playOrPaused()
          clearTimeout(_this.timesWebsocketAlarm)
        });
        _this.rosWebsocket.on('close', function(error) {
          console.log('断开');
        });

      },
      websocketAlarm__(){
        let _this = this
        clearTimeout(_this.timesWebsocketAlarm)
        //接收任务是否完成-消息
        _this.listenerWebsocket = new ROSLIB.Topic({
          ros : _this.ros,
          name : '/computer_pose',
          messageType : 'robotmsg/robot_pose'
        });
        _this.listenerWebsocket.subscribe(function(message) {
          //console.log(message)
          if(message){
            _this.isWebsocket = true
            //_this.openWebsocket('网络信号故障')
            //_this.playOrPaused()
          }else {
            _this.isWebsocket = false
          }
        });
        console.log(_this.isWebsocket)
      },
      websocketAlarm_(){
        console.log('websocket~~~')
        let _this = this
        let flag = true
        let rosWebsocket = new ROSLIB.Ros({
          url: _this.url
        });
        rosWebsocket.on('connection', function() {
          //console.log('all_alarm');
        });
        rosWebsocket.on('error', function(error) {
          console.log('Error');
          flag = false
          _this.openWebsocket('网络信号故障')
          _this.playOrPaused()
          clearTimeout(_this.timesWebsocketAlarm)
          //clearTimeout(_this.timesWebsocketAlarm10s)
          rosWebsocket.close()
          rosWebsocket = null
        });

        if ( flag ) {
          _this.timesWebsocketAlarm = setTimeout(() =>{
            _this.websocketAlarm()
            rosWebsocket.close()
            rosWebsocket = null
          },2000)
        }else {
          clearTimeout(_this.timesWebsocketAlarm)
        }
      },
      //偏航报警
      locationStatusAlarm(){
        let _this = this
        //console.log('偏航')
        _this.listenerLocationStatus = new ROSLIB.Topic({
          ros : _this.ros,
          name : '/location_status',
          messageType : 'std_msgs/Int16'
        });
        _this.listenerLocationStatus.subscribe(function(message) {
          //console.log(message)  // 0 -正常   1-偏航
          if(message.data==1) {
            _this.openLocation('定位失败或偏离行驶线路（错误代码4005）')
            _this.playOrPaused()
            _this.listenerLocationStatus.unsubscribe();
          }
        })
      },

      /*websocketAlarm() {
        let _this = this
        let ip = '192.168.1.10'
        //let ip = robotUrl.substr(5,12)
        var img = new Image();
        var start = new Date().getTime();
        var flag = false;
        var isCloseWifi = true;
        var hasFinish = false;
        img.onload = function() {
          if ( !hasFinish ) {
            flag = true;
            hasFinish = true;
            img.src = 'X:\\';
            console.log('Ping ' + ip + ' success1. ');
          }
        };
        img.onerror = function() {
          if ( !hasFinish ) {
            if ( !isCloseWifi ) {
              flag = true;
              img.src = 'X:\\';
              console.log('Ping ' + ip + ' success2. ');
            } else {
              console.log('network is not working!');
            }
            hasFinish = true;
          }
        };
        setTimeout(function(){
          isCloseWifi = false;
          console.log('network is working, start ping...');
        },2);
        img.src = 'http://' + ip + '/' + start;
        _this.timesWebsocketAlarm = setTimeout(function() {
          if ( !flag ) {
            hasFinish = true;
            img.src = 'X://';
            flag = false ;
            console.log('Ping ' + ip + ' fail. ');
            _this.openWebsocket('网络信号故障')
            _this.playOrPaused()
            clearTimeout(_this.timesWebsocketAlarm)
          }
        }, 3000);
      },*/
      /*ping(ip){
        var img = new Image();
        var start = new Date().getTime();
        var flag = false;
        var isCloseWifi = true;
        var hasFinish = false;
        img.onload = function() {
          if ( !hasFinish ) {
            flag = true;
            hasFinish = true;
            console.log('Ping ' + ip + ' success. ');
            alert("成功"+ip);
          }
        };
        img.onerror = function() {
          if ( !hasFinish ) {
            if ( !isCloseWifi ) {
              flag = true;
              console.log('Ping ' + ip + ' success. ');
              alert("成功"+ip);
            } else {
              console.log('network is not working!');
            }
            hasFinish = true;
          }
        };
        setTimeout(function(){
          isCloseWifi = false;
          console.log('network is working, start ping...');
          alert("开始测试"+ip);
        },2);
        img.src = 'http://' + ip + '/' + start;
        var timer = setTimeout(function() {
          if ( !flag ) {
            hasFinish = true;
            flag = false ;
            console.log('Ping ' + ip + ' fail. ');
            alert("失败"+ip);
          }
        }, 3000);
      },*/

      /*open(message) {
        let _this = this
        clearTimeout(_this.timesListenerController)
        _this.$alert(`${message}`, '系统警报', {
          confirmButtonText: '确定',
          callback: action => {
            //console.log(_this.ros)
            _this.playClose()
            _this.timesListenerController = setTimeout(() => {
              _this.allAlarm()
              _this.power_now()
              _this.controllerAlarm()
            },_this.times_s)  //1000*60*5
            /!*this.$message({
              type: 'info',
              message: `action: ${ action }`
            });*!/
          }
        })
      },*/
      openWebsocket(message) {
        let _this = this
        //clearTimeout(_this.timesWebsocketAlarm)
        clearTimeout(_this.timesWebsocketAlarm10s)
        _this.$alert(`${message}`, '系统警报', {
          confirmButtonText: '确定',
          callback: action => {
            _this.playClose()
            _this.timesWebsocketAlarm10s = setTimeout(() => {
              _this.websocketAlarm()
            },_this.times_s)  //1000*60*5
            clearTimeout(_this.timesWebsocketAlarm)
          }
        })
      },
      openPower(message) {
        let _this = this
        clearTimeout(_this.timesPowerAlarm)
        _this.$alert(`${message}`, '系统警报', {
          confirmButtonText: '确定',
          callback: action => {
            _this.playClose()
            _this.timesPowerAlarm = setTimeout(() => {
              _this.power_now()
            },_this.times_s)
          }
        })
      },
      openJoy(message) {
        let _this = this
        clearTimeout(_this.timesJoyAlarm)
        _this.listenerJoy.unsubscribe()
        _this.$alert(`${message}`, '系统警报', {
          confirmButtonText: '确定',
          callback: action => {
            _this.playClose()
            _this.timesJoyAlarm = setTimeout(() => {
              _this.allAlarm(0)
            },_this.times_s)
          }
        })
      },
      openAllJoy(message) {
        let _this = this
        clearTimeout(_this.timesJoyAlarm)
        _this.listenerJoy.unsubscribe()
        _this.$alert(`${message}`, '系统警报', {
          confirmButtonText: '确定',
          callback: action => {
            _this.playClose()
            _this.timesJoyAlarm = setTimeout(() => {
              _this.allAlarm(3)
            },_this.times_s)
          }
        })
      },
      openController(message) {
        let _this = this
        clearTimeout(_this.timesListenerController)
        _this.$alert(`${message}`, '系统警报', {
          confirmButtonText: '确定',
          callback: action => {
            _this.playClose()
            _this.timesListenerController = setTimeout(() => {
              _this.controllerAlarm()
            },_this.times_s)
          }
        })
      },
      openLocation(message) {
        let _this = this
        clearTimeout(_this.timesListenerLocationStatus)
        _this.$alert(`${message}`, '系统警报', {
          confirmButtonText: '确定',
          callback: action => {
            _this.playClose()
            _this.timesListenerLocationStatus = setTimeout(() => {
              _this.locationStatusAlarm()
            },_this.times_s)
          }
        })
      },

      playOrPaused(id,obj){
        var audio = document.getElementById('audio');
        if(audio.paused){
          audio.play();
          //obj.innerHTML='暂停';
          console.log('在播放')
          //return;
        }
        //audio.pause();
        //obj.innerHTML='播放';
      },
      playClose(id,obj){
        var audio = document.getElementById('audio');
        audio.pause();
      },

      //地图选点
      xuandian(){
        this.$message({
          duration: 6000,
          message: '请在地图上点击"地图选点"按钮操作'
        });
      },
      //挂牌
      guapai(){
        this.$message({
          duration: 6000,
          message: '请在地图上点击"挂牌"按钮操作'
        });
      },
      //地图维护
      map_edit(){
        this.$message({
          duration: 6000,
          message: '请在地图上点击"地图编辑"按钮操作'
        });
      },
      //人工遥控巡检
      rengong(){
        this.$message({
          duration: 6000,
          message: '请选择手持遥控模式'
        });
      },

    },
    destroyed(){
      let _this = this
      //console.log('销毁')
      _this.ros.close()
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" rel="stylesheet/stylus" scoped>
  .head_wrap
    width: 100%;
    padding: 0;
    background-image: url(../../static/images/bghead_bg.png);
    background-size: 100% 100%;
    height 70px
    position relative
    z-index 999
    .head_left
      .left_top
        /*display flex*/
        width: calc(100% - 120px);
        height: 28px;
        padding-left 30px
        padding-top 7px
        box-sizing border-box
        >div
          float left
          /*display flex*/
          /*align-items center*/
          width 65px
          margin 0 10px
          cursor pointer
          .head_i
            display inline-block
            width 14px
            height 14px
          .shouye
            background url("../../static/images/home.png")
            background-size: 100% 100%;
          .bangzhu
            background url("../../static/images/help.png")
            background-size: 100% 100%;
          .tuichu
            background url("../../static/images/exit.png")
            background-size: 100% 100%;
        .welcome
          width 260px
      .left_bottom
        width: calc(100% - 120px)
        height: 41px
        padding-right 86px
        box-sizing border-box
        .top_count
          width 30px
          height 30px
          border-radius 50px
          background red
          cursor pointer
          color white
          line-height 30px
          text-align center
          float right
          z-index 999
          position relative
          margin-top 4px
        .menu
          float left
          margin-top 4px
          margin-left 4px
          position relative
          z-index 9999
          .menu_title
            width: 230px;
            height: 27px;
            line-height: 27px;
            background-color: #1d9a9a;
            display: block;
            color: #fff;
            font-size: 15px;
            text-align: center;
            border: 1px solid #aabebe;
            border-radius: 3px;
            cursor pointer
          .menu_ul
            position: absolute;
            z-index 9999
            background-color: #eee;
            width: 230px;
            min-height: 430px;
            top: 27px;
            left: 0;
            box-shadow: 0 0 5px 2px rgba(16,156,180,.3);
            border-radius: 3px;
            /*display: none;*/
            .but_item
              height: 39px;
              margin: 15px 0;
              line-height: 39px;
              background-color: #f9f9f9;
              background-repeat: no-repeat;
              background-position: 100%;
              border-top: 1px solid #d2fae6;
              border-bottom: 1px solid #d2fae6;
              color #109cb4
              >:nth-child(1)
                width: 26px;
                height: 26px;
                margin: 6px 18px;
                float: left;
              >:nth-child(2)
                line-height 40px
                font-size 13px
              >:nth-child(3)
                font-size: 15px;
                transition: color .1s ease-out 0s;
                margin-right: 18px;
                float: right;
            .but_item:hover
              background #109cb4
              color white
            .pop_up
              position: absolute;
              z-index 99999
              background-color: #eee;
              width: 600px;
              min-height: 430px;
              top: 0;
              left: 230px;
              padding: 6px;
              box-shadow: 0 0 5px 2px rgba(16,156,180,.3);
              border-radius: 3px;
              display none
              >dl
                zoom: 1;
                color: #fff;
                clear: both;
                overflow: auto;
                margin: 10px 0;
                padding: 3px 0;
                border-bottom: 1px solid #e3e3e3;
                >dt
                  margin: 3px 0;
                  float: left;
                  font-size: 13px;
                  line-height: 28px;
                  padding: 0 8px;
                  height: 28px;
                  color: #109cb4;
                >span
                  margin: 3px 0;
                  float: left;
                  font-size: 13px;
                  line-height: 28px;
                  height: 28px;
                  color: #109cb4;
                >dd
                  width: 446px;
                  line-height: 28px;
                  float: left;
                  a
                    line-height: 28px;
                    white-space: nowrap;
                    float: left;
                    transition: color .1s ease-out 0s;
                    color: #333;
                    margin: 3px 6px 3px 8px;
                    font-size: 12px;
                    padding: 0 8px;
                  span
                    line-height: 28px;
                    margin-top: 3px;
                    margin-bottom: 3px;
                    white-space: nowrap;
                    float: left;
                    transition: color .1s ease-out 0s;
                    color: #333;
                    font-size: 13px;
                >dd a:hover
                  background #109cb4
                  color white
              >dl:hover
                background #f9f9f9
        .head_center
          float left
          margin-top 12px
          margin-left 30px
          color white
    .head_right
      position absolute
      top 0
      right 0
      width 282px
      height 70px
      background url("../../static/images/bghead_right.png")
      background-size 100% 100%
      .top_logo
        width: 50px;
        height: 50px;
        margin: 10px 5px;
        background-size: 100% 100%;
        float left
        margin-left 108px
        img
          width 100%
          height 100%
          border-radius 50%
      .divide-line
        height: 40px;
        width: 1px;
        display: inline-block;
        margin: 15px 0;
        background: linear-gradient(#f5f5f5,#13645e,#f5f5f5);
        float left
      .top_text
        float left
        width 90px
        margin-left 10px
        padding-left 3px
        box-sizing border-box
        >:nth-child(1)
          width: 84px;
          display: inline-block;
          text-align: center;
          font-size: 13px;
          margin: 12px 0 0;
          height: 32px;
          color: #13645e;
        >:nth-child(2)
          height: 20px;
          background-color: #138ba1;
          border: 1px solid #127e87;
          border-radius: 5px;
          color: #fff;
          line-height: 20px;
          width: calc(100% - 5px);
          display: inline-block;
          text-align: center;
          font-size: 14px;



    .baojing
      position absolute
      z-index 20000
      background #3d8fff
      left -3000px
      margin-left -1000px

</style>

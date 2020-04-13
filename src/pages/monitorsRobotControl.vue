<template>
  <div class="monitors_robot_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div style="display: flex" class="center_box">
      <div style="width: 55%;float: left">
        <XunjianContent></XunjianContent>
        <taskControl></taskControl>
      </div>
      <select style="display: none" id="ip" class="sel" onchange=""></select>
      <select style="display: none" id="channels" class="sel"></select>
      <div style="width: 45%;height: 100%;float: left">
        <div class="right_top" style="border:1px solid;height: 50%" @dblclick="bigDiv">
          <!--<Button @click="test_ie">IE9</Button>-->
          <Button @click="test_login" style="position: absolute;z-index: 99999">可见光</Button>
          <div id="divPlugin" style="width: 100%;height: 100%;"></div>
        </div>
        <div class="right_bottom" style="border:1px solid;height: 50%">
          <Button @click="red_pic">红外测试</Button>
          <img id="chatterMessage" :src="src" style="width: 100%;height: 100%" alt="">
        </div>
      </div>
    </div>
    <div style="display: flex;">
      <div style="width: 55%; height: 300px;background: white;float: left">
        <TabsBottom></TabsBottom>
      </div>
      <div class="control_wrap">
        <div class="control_header">
          <div class="control_header_left">
            <p class="button_control_header"><img src="../../static/images/control.png" alt=""></p>
            <p @click="clickCapturePic" title="抓图" class="button_control_header"><img src="../../static/images/pictures.png" alt=""></p>
            <p @click="clickVoice" :title="voice_title" class="button_control_header"><img :src='voice_img' alt=""></p>
            <p @click="clickVideo" :title="video_title" class="button_control_header"><img :src="video_img" alt=""></p>
            <p class="button_control_header"><img src="../../static/images/voice.png" alt=""></p>
            <p class="button_control_header"><img src="../../static/images/lookpicture.png" alt=""></p>
            <p class="button_control_header"><img src="../../static/images/audio.png" alt=""></p>
            <p @click="clickPlayback" :title="playback_title" class="button_control_header"><img :src="playback_img" alt=""></p>
          </div>
          <div class="control_header_right">
            <p>任务模式</p>
            <p>紧急定位模式</p>
            <p>后台遥控模式</p>
            <p>手持遥控模式</p>
          </div>
        </div>
        <div class="control_content">
          <div class="control_content_box">
            <div class="control_title"><p>雷达</p></div>
            <div class="radar">
              <img src="../../static/img/leida.gif" alt="">
            </div>
          </div>
          <div class="control_content_box">
            <div class="control_title">
              <div>
                <el-select v-model="value" placeholder="请选择" size="mini"
                           style="width: 50px;float: left">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <span style="float: left">车体控制</span>
              <el-button type="info" size="mini" class="xunhuan_button">循环</el-button>
            </div>
            <div class="car-direction">
              <el-tooltip class="item car-direction-but car-top-but car-direction-but-disabled"
                          effect="dark" content="W"
                          placement="top-start">
                <div><span class="car-but-text car-top-but-text car-but-text-disabled">W</span></div>
              </el-tooltip>
              <el-tooltip class="item car-direction-but car-right-but car-direction-but-disabled"
                          effect="dark" content="D"
                          placement="right-start">
                <div><span class="car-but-text car-right-but-text car-but-text-disabled">D</span></div>
              </el-tooltip>
              <el-tooltip class="item car-direction-but car-bottom-but car-direction-but-disabled"
                          effect="dark" content="S"
                          placement="bottom-start">
                <div><span class="car-but-text car-bottom-but-text car-but-text-disabled">S</span></div>
              </el-tooltip>
              <el-tooltip class="item car-direction-but car-left-but car-direction-but-disabled"
                          effect="dark" content="A"
                          placement="left-start">
                <div><span class="car-but-text car-left-but-text car-but-text-disabled">A</span></div>
              </el-tooltip>
              <el-tooltip class="item car-center-but car-center-but-disabled"
                          effect="dark" content="1"
                          placement="top-start">
                <div>
                  <img src="../../static/images/stop.png" alt="" class="car-center-but-img">
                </div>
              </el-tooltip>
            </div>
          </div>
          <div class="control_content_box">
            <div class="control_title">
              <div style="width: 50px"></div>
              <span>云台控制</span>
              <el-button type="info" size="mini" class="xunhuan_button">单点</el-button>
            </div>
            <div style="height: 27px"></div>
            <div class="holder-direction">
              <el-tooltip class="item holder-direction-but holder-left-but"
                          effect="dark" content="a" :disabled="disabled"
                          placement="top-start">
                <div style="cursor: pointer" onmousedown="mouseDownPTZControl(3);" onmouseup="mouseUpPTZControl();">
                  <span class="holder-but-text holder-left-but-text holder-but-text-disabled">A</span>
                </div>
              </el-tooltip>
              <el-tooltip class="item holder-direction-but holder-top-but"
                          effect="dark" content="w" :disabled="disabled"
                          placement="top-start">
                <div style="cursor: pointer" onmousedown="mouseDownPTZControl(1);" onmouseup="mouseUpPTZControl();">
                  <span class="holder-but-text holder-top-but-text holder-but-text-disabled">W</span>
                </div>
              </el-tooltip>
              <el-tooltip class="item holder-direction-but holder-right-but"
                          effect="dark" content="d" :disabled="disabled"
                          placement="top-start">
                <div style="cursor: pointer" onmousedown="mouseDownPTZControl(4);" onmouseup="mouseUpPTZControl();">
                  <span class="holder-but-text holder-right-but-text holder-but-text-disabled">D</span>
                </div>
              </el-tooltip>
              <el-tooltip class="item holder-direction-but holder-bottom-but"
                          effect="dark" content="s" :disabled="disabled"
                          placement="top-start">
                <div style="cursor: pointer" onmousedown="mouseDownPTZControl(6);" onmouseup="mouseUpPTZControl();">
                  <span class="holder-but-text holder-bottom-but-text holder-but-text-disabled">S</span>
                </div>
              </el-tooltip>
              <div class="holder-center-but">
                <div class="el-tooltip holder-center-left">
                  <span style="cursor: pointer" onmousedown="PTZZoomIn()" onmouseup="PTZZoomStop()" class="holder-center-text holder-center-text-up holder-center-text-disabled">+</span>
                  <span style="cursor: pointer" onmousedown="PTZZoomout()" onmouseup="PTZZoomStop()" class="holder-center-text holder-center-text-bot holder-center-text-disabled">变倍</span>
                </div>
                <div class="el-tooltip holder-center-right">
                  <span style="cursor: pointer" onmousedown="PTZFoucusOut()" onmouseup="PTZFoucusStop()" class="holder-center-text holder-center-text-up holder-center-text-disabled">-</span>
                  <span style="cursor: pointer" onmousedown="PTZFocusIn()" onmouseup="PTZFoucusStop()" class="holder-center-text holder-center-text-bot holder-center-text-disabled">变焦</span>
                </div>
              </div>
            </div>
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
  import TabsBottom from '../components/tabsBottom.vue'
  import XunjianContent from '../components/xunjianContent.vue'
  import taskControl from '../components/taskControl.vue'

  export default {
    data(){
      return{
        title:'机器人遥控 > 机器人遥控',
        options: [{
          value: '选项1',
          label: '0.1'
        }, {
          value: '选项2',
          label: '0.2'
        }],
        value: '选项1',
        disabled:true,

        lockReconnect: false,
        wsCfg: {
          // websocket地址
          url: "ws://192.168.1.78:9090"
        },
        src:'',
        listener:null,
        hkUrl:'192.168.1.13',
        voice_title:'录制音频',
        voice_img:"../../static/images/recordingvoice.png",
        video_title:'开始录像',
        video_img:"../../static/images/recordingvideo.png",
        playback_title:'视频回放',
        playback_img:'../../static/images/playback.png',
        g_bPTZAuto : false,
      }
    },
    methods:{
      red_pic(){
        let _this = this
        var ros = new ROSLIB.Ros({
          url : 'ws://192.168.1.78:9090'
        });
        //console.log(ros)
        ros.on('connection', function() {
          console.log('Connected to websocket server.');
        });

        _this.listener = new ROSLIB.Topic({
          ros : ros,
          name : '/thermal/image_proc/compressed',
          messageType : 'sensor_msgs/CompressedImage'
        });

        _this.listener.subscribe(function(message) {
          console.log('Received message on ' +': ' + message.data);
          var  url = "data:image/png;base64,";
          var i = message.data
          _this.src = url+ i
          setTimeout(function () {

            $("#chatterMessage").src = _this.src
          },1000)

          //_this.listener.unsubscribe();
        });
      },

      //可见光
      test_login(){
        let _this = this

        var iRet = WebVideoCtrl.I_Login(_this.hkUrl, 1, 80, 'admin', '1234asdf', {
          success: function (xmlDoc) {
            console.log(" 登录成功！");

            $("#ip").prepend("<option value='" + _this.hkUrl + "'>" + _this.hkUrl + "</option>");
             setTimeout(function () {
             $("#ip").val(_this.hkUrl);
             getChannelInfo();
             }, 100);
            _this.clickStartRealPlay()

          },
          error: function () {
            console.log(" 登录失败！");
          }
        });
        if (-1 == iRet) {
          _this.clickStartRealPlay()
        }
        // 获取通道
        function getChannelInfo() {
          var szIP = $("#ip").val(),
            oSel = $("#channels").empty(),
            nAnalogChannel = 0;

          if ("" == szIP) {
            return;
          }

          // 模拟通道
          WebVideoCtrl.I_GetAnalogChannelInfo(szIP, {
            async: false,
            success: function (xmlDoc) {
              var oChannels = $(xmlDoc).find("VideoInputChannel");
              nAnalogChannel = oChannels.length;

              $.each(oChannels, function (i) {
                var id = parseInt($(this).find("id").eq(0).text(), 10),
                  name = $(this).find("name").eq(0).text();
                if ("" == name) {
                  name = "Camera " + (id < 9 ? "0" + id : id);
                }
                oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
              });
              showOPInfo(szIP + " 获取模拟通道成功！");
            },
            error: function () {
              showOPInfo(szIP + " 获取模拟通道失败！");
            }
          });
          // 数字通道
          WebVideoCtrl.I_GetDigitalChannelInfo(szIP, {
            async: false,
            success: function (xmlDoc) {
              var oChannels = $(xmlDoc).find("InputProxyChannelStatus");

              $.each(oChannels, function (i) {
                var id = parseInt($(this).find("id").eq(0).text(), 10),
                  name = $(this).find("name").eq(0).text(),
                  online = $(this).find("online").eq(0).text();
                if ("false" == online) {// 过滤禁用的数字通道
                  return true;
                }
                if ("" == name) {
                  name = "IPCamera " + ((id - nAnalogChannel) < 9 ? "0" + (id - nAnalogChannel) : (id - nAnalogChannel));
                }
                oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
              });
              showOPInfo(szIP + " 获取数字通道成功！");
            },
            error: function () {
              showOPInfo(szIP + " 获取数字通道失败！");
            }
          });
          // 零通道
          WebVideoCtrl.I_GetZeroChannelInfo(szIP, {
            async: false,
            success: function (xmlDoc) {
              var oChannels = $(xmlDoc).find("ZeroVideoChannel");

              $.each(oChannels, function (i) {
                var id = parseInt($(this).find("id").eq(0).text(), 10),
                  name = $(this).find("name").eq(0).text();
                if ("" == name) {
                  name = "Zero Channel " + (id < 9 ? "0" + id : id);
                }
                if ("true" == $(this).find("enabled").eq(0).text()) {// 过滤禁用的零通道
                  oSel.append("<option value='" + id + "' bZero='true'>" + name + "</option>");
                }
              });
              showOPInfo(szIP + " 获取零通道成功！");
            },
            error: function () {
              showOPInfo(szIP + " 获取零通道失败！");
            }
          });
        }

      },
      clickStartRealPlay() {
        let _this = this
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
          szIP = _this.hkUrl,//$("#ip").val(),
          iStreamType = 1,//parseInt($("#streamtype").val(), 10),
          iChannelID = 1,//parseInt($("#channels").val(), 10),
          bZeroChannel = false,//$("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
          szInfo = "";

        if ("" == szIP) {
          return;
        }

        if (oWndInfo != null) {// 已经在播放了，先停止
          WebVideoCtrl.I_Stop();
          console.log('已经在播放了，先停止');
        }

        var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
          iStreamType: iStreamType,
          iChannelID: iChannelID,
          bZeroChannel: bZeroChannel
        });

        if (0 == iRet) {
          szInfo = "开始预览成功！";
        } else {
          szInfo = "开始预览失败！";
        }

        console.log(szIP + " " + szInfo);
      },
      // 获取窗口尺寸
      getWindowSize() {
        var nWidth = $(this).width() + $(this).scrollLeft(),
          nHeight = $(this).height() + $(this).scrollTop();

        return {width: nWidth, height: nHeight};
      },
      bigDiv(){
        clickFullScreen()
        // 全屏
        function clickFullScreen() {
          WebVideoCtrl.I_FullScreen(true);
        }
      },
      //抓图
      clickCapturePic() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        szInfo = "";

        if (oWndInfo != null) {
          var szChannelID = $("#channels").val(),
            szPicName = oWndInfo.szIP + "_" + szChannelID + "_" + new Date().getTime(),
            iRet = WebVideoCtrl.I_CapturePic(szPicName);
          if (0 == iRet) {
            szInfo = "抓图成功！";
          } else {
            szInfo = "抓图失败！";
          }
          console.log(oWndInfo.szIP + " " + szInfo);
    }
  },
      //录制声音
      clickVoice(){
      	let _this = this
        if(_this.voice_title == '停止录制'){
          _this.voice_title = '录制声音'
          _this.voice_img = "../../static/images/recordingvoice.png"
          _this.clickCloseSound()
          _this.clickStopRecord()
        }else {
          _this.voice_title = '停止录制'
          _this.voice_img = "../../static/images/recordingvoice1.png"
          _this.clickOpenSound()
          _this.clickStartRecord()
        }

      },
      //录视频
      clickVideo(){
        let _this = this
        if(_this.video_title == '停止录像'){
          _this.video_title = '开始录像'
          _this.video_img = "../../static/images/recordingvideo.png"
          _this.clickStopRecord()
        }else {
          _this.video_title = '停止录像'
          _this.video_img = "../../static/images/recordingvoice1.png"
          _this.clickStartRecord()
        }
      },
      //回放录像
      clickPlayback(){
        let _this = this
        if(_this.playback_title == '停止回放'){
          _this.playback_title = '视频回放'
          _this.playback_img = "../../static/images/playback.png"
          _this.clickStopPlayback()
        }else {
          _this.playback_title = '停止回放'
          _this.playback_img = "../../static/images/recordStop.png"
          _this.clickStartPlayback()
        }
      },

      PTZZoomIn() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

        if (oWndInfo != null) {
          WebVideoCtrl.I_PTZControl(10, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
              console.log(oWndInfo.szIP + " 调焦+成功！");
            },
            error: function () {
              console.log(oWndInfo.szIP + "  调焦+失败！");
            }
          });
        }
      },
      PTZZoomout() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

        if (oWndInfo != null) {
          WebVideoCtrl.I_PTZControl(11, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
              console.log(oWndInfo.szIP + " 调焦-成功！");
            },
            error: function () {
              console.log(oWndInfo.szIP + "  调焦-失败！");
            }
          });
        }
      },
      PTZZoomStop() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

        if (oWndInfo != null) {
          WebVideoCtrl.I_PTZControl(11, true, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
              console.log(oWndInfo.szIP + " 调焦停止成功！");
            },
            error: function () {
              console.log(oWndInfo.szIP + "  调焦停止失败！");
            }
          });
        }
      },
      PTZFocusIn() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

        if (oWndInfo != null) {
          WebVideoCtrl.I_PTZControl(12, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
              console.log(oWndInfo.szIP + " 聚焦+成功！");
            },
            error: function () {
              console.log(oWndInfo.szIP + "  聚焦+失败！");
            }
          });
        }
      },
      PTZFoucusOut() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

        if (oWndInfo != null) {
          WebVideoCtrl.I_PTZControl(13, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
              console.log(oWndInfo.szIP + " 聚焦-成功！");
            },
            error: function () {
              console.log(oWndInfo.szIP + "  聚焦-失败！");
            }
          });
        }
      },
      PTZFoucusStop() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

        if (oWndInfo != null) {
          WebVideoCtrl.I_PTZControl(12, true, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
              console.log(oWndInfo.szIP + " 聚焦停止成功！");
            },
            error: function () {
              console.log(oWndInfo.szIP + "  聚焦停止失败！");
            }
          });
        }
      },

      // 打开声音
      clickOpenSound() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        szInfo = "";

        if (oWndInfo != null) {
          var allWndInfo = WebVideoCtrl.I_GetWindowStatus();
          // 循环遍历所有窗口，如果有窗口打开了声音，先关闭
          for (var i = 0, iLen = allWndInfo.length; i < iLen; i++) {
            oWndInfo = allWndInfo[i];
            if (oWndInfo.bSound) {
              WebVideoCtrl.I_CloseSound(oWndInfo.iIndex);
              break;
            }
          }

          var iRet = WebVideoCtrl.I_OpenSound();

          if (0 == iRet) {
            szInfo = "打开声音成功！";
          } else {
            szInfo = "打开声音失败！";
          }
          console.log(oWndInfo.szIP + " " + szInfo);
        }
      },
      // 关闭声音
      clickCloseSound() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
          szInfo = "";

        if (oWndInfo != null) {
          var iRet = WebVideoCtrl.I_CloseSound();
          if (0 == iRet) {
            szInfo = "关闭声音成功！";
          } else {
            szInfo = "关闭声音失败！";
          }
          console.log(oWndInfo.szIP + " " + szInfo);
        }
      },
      // 开始录像
      clickStartRecord() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
            szInfo = "";

        if (oWndInfo != null) {
          var szChannelID = $("#channels").val(),
            szFileName = oWndInfo.szIP + "_" + szChannelID + "_" + new Date().getTime(),
            iRet = WebVideoCtrl.I_StartRecord(szFileName);
          if (0 == iRet) {
            szInfo = "开始录像成功！";
          } else {
            szInfo = "开始录像失败！";
          }
          console.log(oWndInfo.szIP + " " + szInfo);
        }
      },
      // 停止录像
      clickStopRecord() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
          szInfo = "";

        if (oWndInfo != null) {
          var iRet = WebVideoCtrl.I_StopRecord();
          if (0 == iRet) {
            szInfo = "停止录像成功！";
          } else {
            szInfo = "停止录像失败！";
          }
          console.log(oWndInfo.szIP + " " + szInfo);
        }
      },
      // 开始回放
      clickStartPlayback() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        szIP = $("#ip").val(),
        bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
        iChannelID = $("#channels").val()
        var szCurTime = this.dateFormat(new Date(), "yyyy-MM-dd"),
        //$("#starttime").val(szCurTime + " 00:00:00");
        //$("#endtime").val(szCurTime + " 23:59:59");
        szStartTime = szCurTime + " 00:00:00",
        szEndTime = szCurTime + " 23:59:59",
        szInfo = "",
        bChecked = $("#transstream").prop("checked"),
        iRet = -1;

        if ("" == szIP) {
          return;
        }

        if (bZeroChannel) {// 零通道不支持回放
          return;
        }

        if (oWndInfo != null) {// 已经在播放了，先停止
          WebVideoCtrl.I_Stop();
        }

        if (bChecked) {// 启用转码回放
          var oTransCodeParam = {
            TransFrameRate: "16",// 0：全帧率，5：1，6：2，7：4，8：6，9：8，10：10，11：12，12：16，14：15，15：18，13：20，16：22
            TransResolution: "2",// 255：Auto，3：4CIF，2：QCIF，1：CIF
            TransBitrate: "23"// 2：32K，3：48K，4：64K，5：80K，6：96K，7：128K，8：160K，9：192K，10：224K，11：256K，12：320K，13：384K，14：448K，15：512K，16：640K，17：768K，18：896K，19：1024K，20：1280K，21：1536K，22：1792K，23：2048K，24：3072K，25：4096K，26：8192K
          };
          iRet = WebVideoCtrl.I_StartPlayback(szIP, {
            iChannelID: iChannelID,
            szStartTime: szStartTime,
            szEndTime: szEndTime,
            oTransCodeParam: oTransCodeParam
          });
        } else {
          iRet = WebVideoCtrl.I_StartPlayback(szIP, {
            iChannelID: iChannelID,
            szStartTime: szStartTime,
            szEndTime: szEndTime
          });
        }

        if (0 == iRet) {
          szInfo = "开始回放成功！";
        } else {
          szInfo = "开始回放失败！";
        }
        console.log(szIP + " " + szInfo);
      },
      // 停止回放
      clickStopPlayback() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
          szInfo = "";

        if (oWndInfo != null) {
          var iRet = WebVideoCtrl.I_Stop();
          if (0 == iRet) {
            szInfo = "停止回放成功！";
          } else {
            szInfo = "停止回放失败！";
          }
          console.log(oWndInfo.szIP + " " + szInfo);
        }
      },
      // 格式化时间
      dateFormat(oDate, fmt) {
        var o = {
          "M+": oDate.getMonth() + 1, //月份
          "d+": oDate.getDate(), //日
          "h+": oDate.getHours(), //小时
          "m+": oDate.getMinutes(), //分
          "s+": oDate.getSeconds(), //秒
          "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
          "S": oDate.getMilliseconds()//毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        }
        return fmt;
      },

      // PTZ控制 9为自动，1,2,3,4,5,6,7,8为方向PTZ
      mouseDownPTZControl(iPTZIndex) {
      	var _this = this
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
          bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
          iPTZSpeed = 4,
          bStop = false;

        if (bZeroChannel) {// 零通道不支持云台
          return;
        }

        if (oWndInfo != null) {
          if (9 == iPTZIndex && g_bPTZAuto) {
            iPTZSpeed = 0;// 自动开启后，速度置为0可以关闭自动
            bStop = true;
          } else {
            _this.g_bPTZAuto = false;// 点击其他方向，自动肯定会被关闭
            bStop = false;
          }

          WebVideoCtrl.I_PTZControl(iPTZIndex, bStop, {
            iPTZSpeed: iPTZSpeed,
            success: function (xmlDoc) {
              if (9 == iPTZIndex) {
                _this.g_bPTZAuto = !_this.g_bPTZAuto;
              }
              console.log(oWndInfo.szIP + " 开启云台成功！");
            },
            error: function () {
              console.log(oWndInfo.szIP + " 开启云台失败！");
            }
          });
        }
      },

    },
    mounted() {
      let _this = this
      // 初始化插件参数及插入插件
      WebVideoCtrl.I_InitPlugin('100%', '100%', {
        iWndowType: 1,
        cbSelWnd: function (xmlDoc) {
          let g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
          var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
          console.log(szInfo);
        }
      });
      WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
      // 窗口事件绑定
      $(window).bind({
        resize: function () {
          var $Restart = $("#restartDiv");
          if ($Restart.length > 0) {
            var oSize = _this.getWindowSize();
            $Restart.css({
              width: oSize.width + "px",
              height: oSize.height + "px"
            });
          }
        }
      });

      //this.createWebSocket();
    },
    beforeRouteLeave(to, form, next) {
      next()
      if(this.listener){
        console.log('连接已断开')
        this.listener.unsubscribe();
      }

    },
    components: {
      HeaderTop,
      TabsBottom,
      XunjianContent,
      taskControl,
      menuBottom
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .monitors_robot_wrap
    height 100%
    .center_box
      height calc(100% - 390px)
    >div
      .control_wrap
        width 45%
        height 300px
        border 1px solid #c6cdd3
        float left
        box-sizing border-box
        .control_header
          height 80px
          background linear-gradient(#e3f2ee,#cae7ee)
          display flex
          padding-top 6px
          box-sizing border-box
          >.control_header_left
            float left
            display flex
            width 310px
            flex-wrap wrap
            .button_control_header
              float left
              width 60px
              height 26px
              background #1e1e1e
              cursor pointer
              border-radius 3px
              margin 1px 8px
              display flex
              align-items center
              justify-content center
              img
                width 36%
                display block
                margin 0 auto
          >.control_header_right
            float left
            display flex
            flex-wrap wrap
            width 240px
            margin-left 40px
            box-sizing border-box
            >p
              float left
              width 100px
              height 27px
              border-radius 3px
              background #109cb4
              color white
              line-height 27px
              text-align center
              margin 0 10px
              margin-bottom 8px
        .control_content
          display flex
          justify-content space-between
          .control_content_box
            float left
            width 33.3%
            height 218px
            border 1px solid #bae9d8
            background white
            box-sizing border-box
            .control_title
              height 26px
              line-height 26px
              text-align center
              background #cae7ee\0
              background linear-gradient(#e3f2ee,#cae7ee)
              display flex
              justify-content space-around
              div>>>
                .el-input__inner
                  padding 2px
                  height 22px
              .xunhuan_button
                width 48px
                height 20px
                padding 0
                margin-top 3px
                float right
            .radar
              width: 120px;
              height: 120px;
              position: relative;
              /*background: -webkit-radial-gradient(center,rgba(32,255,77,.3) 0,rgba(32,255,77,0) 75%),-webkit-repeating-radial-gradient(rgba(32,255,77,0) 5.8%,rgba(32,255,77,0) 18%,#109cb4 18.6%,rgba(32,255,77,0) 18.9%),-webkit-linear-gradient(90deg,rgba(32,255,77,0) 49.5%,#109cb4 50%,#109cb4 0,rgba(32,255,77,0) 50.2%),-webkit-linear-gradient(0deg,rgba(32,255,77,0) 49.5%,#109cb4 50%,#109cb4 0,rgba(32,255,77,0) 50.2%);
              margin: auto;
              top: calc(50% - 60px - 0px);
              border-radius: 50%;
              border: .2rem solid #109cb4;
              overflow: hidden;*/
            .radar::before
              content: " ";
              display: block;
              position: absolute;
              /*width: 100%;
              height: 100%;
              border-radius: 50%;
              -webkit-animation: blips 5s infinite;
              animation: blips 5s infinite;
              -webkit-animation-timing-function: linear;
              animation-timing-function: linear;
              -webkit-animation-delay: 1.4s;
              animation-delay: 1.4s;
              @keyframes blips{
                14%{background:radial-gradient(1vmin circle at 75% 70%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%)}
                14.0002%{background:radial-gradient(1vmin circle at 75% 70%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%),radial-gradient(1vmin circle at 63% 72%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%)}
                25%{background:radial-gradient(1vmin circle at 75% 70%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%),radial-gradient(1vmin circle at 63% 72%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%),radial-gradient(1vmin circle at 56% 86%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%)}
                26%{background:radial-gradient(1vmin circle at 75% 70%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%),radial-gradient(1vmin circle at 63% 72%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%),radial-gradient(1vmin circle at 56% 86%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%);opacity:1}
                to{background:radial-gradient(1vmin circle at 75% 70%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%),radial-gradient(1vmin circle at 63% 72%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%),radial-gradient(1vmin circle at 56% 86%,#fff 10%,#109cb4 30%,hsla(0,0%,100%,0) 70%);opacity:0}
              }*/
            .radar::after
              content: " ";
              display: block;
              background-image: linear-gradient(44deg,rgba(0,255,51,0) 50%,#109cb4);
              width: 50%;
              height: 50%;
              position: absolute;
              top: 0;
              left: 0;
              opacity 0
              /*-webkit-animation: radar-beam 5s infinite;
              animation: radar-beam 5s infinite;
              -webkit-animation-timing-function: linear;
              animation-timing-function: linear;
              -webkit-transform-origin: bottom right;
              transform-origin: bottom right;
              border-radius: 100% 0 0 0;
              @keyframes radar-beam{
                0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}
                to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}
              }*/

            .car-direction
              position: relative;
              width: 120px;
              height: 120px;
              margin: auto;
              top: calc(50% - 60px - 0px);
              border: 1px solid #bee6e6;
              border-radius: 50%;
              background-color: #bee6e6;
              box-sizing border-box
              .car-top-but
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
              .car-right-but
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
              .car-bottom-but
                -webkit-transform: rotate(-135deg);
                transform: rotate(-135deg);
              .car-left-but
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
              .car-direction-but-disabled
                background-color: #7c9eac;
                cursor: not-allowed;
              .car-direction-but
                -webkit-transition: .5s;
                transition: .5s;
                background-color: #109cb4;
                cursor: pointer;
              .car-direction-but
                position: absolute;
                width: 118px;
                height: 118px;
                border-radius: 50%;
                clip: rect(0,58px,58px,0);
                .car-top-but-text
                  -webkit-transform: rotate(-45deg);
                  transform: rotate(-45deg);
                .car-right-but-text
                  -webkit-transform: rotate(-135deg);
                  transform: rotate(-135deg);
                .car-bottom-but-text
                  -webkit-transform: rotate(135deg);
                  transform: rotate(135deg);
                .car-left-but-text
                  -webkit-transform: rotate(45deg);
                  transform: rotate(45deg);
                .car-but-text-disabled
                  color: #dfdfdf;
                .car-but-text
                  width: 60px;
                  height: 60px;
                  line-height: 60px;
                  display: block;
                  text-align: center;
                  color: #fff;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;


              .car-center-but-disabled
                background-color: #109cb4  //#7c9eac;
                cursor: not-allowed;
              .car-center-but
                width: 60px;
                height: 60px;
                position: absolute;
                left: 30px;
                top: 30px;
                border: 2px solid #bee6e6;
                border-radius: 50%;
                box-sizing border-box
                .car-center-but-img
                  width: 30px;
                  height: 30px;
                  margin-left: 13px;
                  margin-top: 13px;


            .holder-direction
              width: 120px;
              height: 120px;
              position: relative;
              margin: auto;
              top: calc(50% - 60px - 30px);
              .holder-direction-but
                position: absolute;
                width: 60px;
                height: 60px;
                border-radius: 60px 0 0 0;
                background-color: #109cb4;
                border: 1px solid #bae9d8;
                box-sizing border-box
                .holder-but-text
                  width: 60px;
                  height: 60px;
                  line-height: 60px;
                  display: block;
                  text-align: center;
                  color: #fff;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                .holder-but-text-disabled
                  color: #dfdfdf;
                .holder-left-but-text
                  -webkit-transform: rotate(45deg);
                  transform: rotate(45deg);
                .holder-top-but-text
                  -webkit-transform: rotate(-45deg);
                  transform: rotate(-45deg);
                .holder-right-but-text
                  -webkit-transform: rotate(-135deg);
                  transform: rotate(-135deg);
                .holder-bottom-but-text
                  -webkit-transform: rotate(135deg);
                  transform: rotate(135deg);

              .holder-direction-but-disabled
                background-color: #7c9eac;
                cursor: not-allowed;
              .holder-left-but
                top: 25%;
                left: -10%;
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
              .holder-top-but
                top: -10%;
                left: 25%;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
              .holder-right-but
                top: 25%;
                left: 60%;
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
              .holder-bottom-but
                top: 60%;
                left: 25%;
                -webkit-transform: rotate(-135deg);
                transform: rotate(-135deg);
              .holder-center-but
                width: 50%;
                height: 50%;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                border-radius: 25px;
                background-color: #109cb4;
                text-align: center;
                .holder-center-text-up
                  display: block;
                  width: 100%;
                  height: 33px;
                  line-height: 33px;
                  font-size: 20px;
                  color: #fff;
                  text-align: center;
                .holder-center-text-bot
                  display: block;
                  width: 100%;
                  height: 30px;
                  font-size: 9px;
                  color: #fff;
                  text-align: center;
              .holder-center-left
                width: 50%;
                height: 100%;
                border-radius: 25px 0 0 25px;
                background-color: #109cb4;
                border: 1px solid #bae9d8;
                float: left;
                box-sizing border-box
              .holder-center-right
                width: 50%;
                height: 100%;
                border-radius: 0 25px 25px 0;
                background-color: #109cb4;
                border: 1px solid #bae9d8;
                float: right;
                box-sizing border-box
              .holder-center-right-disabled
                background-color: #7c9eac;
                cursor: not-allowed;
              .holder-center-left-disabled
                background-color: #7c9eac;
                cursor: not-allowed;




</style>

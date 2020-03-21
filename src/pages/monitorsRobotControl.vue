<template>
  <div class="monitors_robot_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div style="display: flex">
      <div style="width: 55%;float: left">
        <XunjianContent></XunjianContent>
        <taskControl></taskControl>
      </div>
      <div style="width: 45%;height: 100%;float: left">
        <img src="../../static/bbb.jpg" style="width: 100%;height:432px" alt="">
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
            <p class="button_control_header"><img src="../../static/images/pictures.png" alt=""></p>
            <p class="button_control_header"><img src="../../static/images/recordingvoice.png" alt=""></p>
            <p class="button_control_header"><img src="../../static/images/recordingvideo.png" alt=""></p>
            <p class="button_control_header"><img src="../../static/images/voice.png" alt=""></p>
            <p class="button_control_header"><img src="../../static/images/lookpicture.png" alt=""></p>
            <p class="button_control_header"><img src="../../static/images/audio.png" alt=""></p>
            <p class="button_control_header"><img src="../../static/images/playback.png" alt=""></p>
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
              <el-tooltip class="item holder-direction-but holder-left-but holder-direction-but-disabled"
                          effect="dark" content="a"
                          placement="top-start">
                <div>
                  <span class="holder-but-text holder-left-but-text holder-but-text-disabled">A</span>
                </div>
              </el-tooltip>
              <el-tooltip class="item holder-direction-but holder-top-but holder-direction-but-disabled"
                          effect="dark" content="w"
                          placement="top-start">
                <div>
                  <span class="holder-but-text holder-top-but-text holder-but-text-disabled">W</span>
                </div>
              </el-tooltip>
              <el-tooltip class="item holder-direction-but holder-right-but holder-direction-but-disabled"
                          effect="dark" content="d"
                          placement="top-start">
                <div>
                  <span class="holder-but-text holder-right-but-text holder-but-text-disabled">D</span>
                </div>
              </el-tooltip>
              <el-tooltip class="item holder-direction-but holder-bottom-but holder-direction-but-disabled"
                          effect="dark" content="s"
                          placement="top-start">
                <div>
                  <span class="holder-but-text holder-bottom-but-text holder-but-text-disabled">S</span>
                </div>
              </el-tooltip>
              <div class="holder-center-but">
                <div class="el-tooltip holder-center-left holder-center-left-disabled">
                  <span class="holder-center-text holder-center-text-up holder-center-text-disabled">+</span>
                  <span class="holder-center-text holder-center-text-bot holder-center-text-disabled">变倍</span>
                </div>
                <div class="el-tooltip holder-center-right holder-center-right-disabled">
                  <span class="holder-center-text holder-center-text-up holder-center-text-disabled">-</span>
                  <span class="holder-center-text holder-center-text-bot holder-center-text-disabled">变焦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
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
        value: '选项1'
      }
    },
    components: {
      HeaderTop,
      TabsBottom,
      XunjianContent,
      taskControl
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .monitors_robot_wrap
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
              background: -webkit-radial-gradient(center,rgba(32,255,77,.3) 0,rgba(32,255,77,0) 75%),-webkit-repeating-radial-gradient(rgba(32,255,77,0) 5.8%,rgba(32,255,77,0) 18%,#109cb4 18.6%,rgba(32,255,77,0) 18.9%),-webkit-linear-gradient(90deg,rgba(32,255,77,0) 49.5%,#109cb4 50%,#109cb4 0,rgba(32,255,77,0) 50.2%),-webkit-linear-gradient(0deg,rgba(32,255,77,0) 49.5%,#109cb4 50%,#109cb4 0,rgba(32,255,77,0) 50.2%);
              width: 120px;
              height: 120px;
              position: relative;
              margin: auto;
              top: calc(50% - 60px - 0px);
              border-radius: 50%;
              border: .2rem solid #109cb4;
              overflow: hidden;
            .radar::before
              content: " ";
              display: block;
              position: absolute;
              width: 100%;
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
              }
            .radar::after
              content: " ";
              display: block;
              background-image: linear-gradient(44deg,rgba(0,255,51,0) 50%,#109cb4);
              width: 50%;
              height: 50%;
              position: absolute;
              top: 0;
              left: 0;
              -webkit-animation: radar-beam 5s infinite;
              animation: radar-beam 5s infinite;
              -webkit-animation-timing-function: linear;
              animation-timing-function: linear;
              -webkit-transform-origin: bottom right;
              transform-origin: bottom right;
              border-radius: 100% 0 0 0;
              @keyframes radar-beam{
                0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}
                to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}
              }

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

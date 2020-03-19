<template>
  <div class="head_wrap">
    <div class="head_left">
      <div class="left_top">
        <div @click="goHome">
          <i class="head_i shouye"></i>
          <span>首页</span>
        </div>
        <div>
          <i class="head_i bangzhu"></i>
          <span>帮助</span>
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
                  </dd>
                </dl>
                <dl>
                  <dt>多光谱巡检</dt>
                  <span>|</span>
                  <dd>
                    <div>
                      <router-link to="/tasks/multispectral-inspection">多光谱巡检</router-link>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
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
        <div class="top_count"><span>0</span></div>
      </div>
    </div>
    <div class="head_right">

      <div class="top_logo"><img src="../../static/images/logo.jpg" alt=""></div>
      <span class="divide-line"></span>
      <div class="top_text">
        <span>泉州变电站管理系统</span>
        <span>北京地区</span>
      </div>
    </div>
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
        username: localStorage.getItem("username")
      }

    },
    props:['title'],
    methods: {
      ...mapMutations(['changeLogin']),
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
    }
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
            z-index 999
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




</style>

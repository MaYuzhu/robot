<template>
  <div class="head_wrap">
    <div class="head_left">
      <div class="left_top">
        <div>
          <i class="head_i shouye"></i>
          <span>首页</span>
        </div>
        <div>
          <i class="head_i bangzhu"></i>
          <span>帮助</span>
        </div>
        <div>
          <i class="head_i tuichu"></i>
          <span>退出</span>
        </div>
        <div class="welcome">
          <span>欢迎您，机器人管理系统，</span><span>admin</span>
        </div>
      </div>
      <div class="left_bottom">
        <div class="menu">
          <div class="menu_title">系统导航</div>
          <ul class="menu_ul">
            <li>
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
                      <a href="#">机器人管理</a>
                      <span>|</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="but_item">
                <img src="../../static/images/taskManagement.png" alt="">
                <span>任务管理</span>
                <span>&gt;</span>
              </div>
            </li>
            <li>
              <div class="but_item">
                <img src="../../static/images/monitoring.png" alt="">
                <span>实时监控</span>
                <span>&gt;</span>
              </div>
            </li>
            <li>
              <div class="but_item">
                <img src="../../static/images/resultsConfirm.png" alt="">
                <span>巡检结果确认</span>
                <span>&gt;</span>
              </div>
            </li>
            <li>
              <div class="but_item">
                <img src="../../static/images/resultsAnalysis.png" alt="">
                <span>巡检结果分析</span>
                <span>&gt;</span>
              </div>
            </li>
            <li>
              <div class="but_item">
                <img src="../../static/images/userSet.png" alt="">
                <span>用户设置</span>
                <span>&gt;</span>
              </div>
            </li>
            <li>
              <div class="but_item">
                <img src="../../static/images/systemSet.png" alt="">
                <span>机器人系统调试维护</span>
                <span>&gt;</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="head_center">机器人管理 > 机器人管理</div>
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
export default {
  name: 'HeaderTop',
  data () {
    return {

    }
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
    .head_left
      .left_top
        display flex
        width: calc(100% - 120px);
        height: 28px;
        padding-left 30px
        box-sizing border-box
        >div
          display flex
          align-items center
          width 65px
          margin 0 10px
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
              >:nth-child(1)
                width: 26px;
                height: 26px;
                margin: 6px 18px;
                float: left;
              >:nth-child(2)
                line-height 40px
                font-size 13px
              >:nth-child(3)
                color: #109cb4;
                font-size: 15px;
                transition: color .1s ease-out 0s;
                margin-right: 18px;
                float: right;
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
          font-size: 14px;
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

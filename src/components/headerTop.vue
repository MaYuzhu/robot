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
        .top_count
          width 30px
          height 30px
          border-radius 50px
          background red
          cursor pointer
          color white
          line-height 30px
          text-align center
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

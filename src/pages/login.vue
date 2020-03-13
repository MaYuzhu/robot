<template>
  <div class="wrap">
    <div class="logo">
      <img class="img_logo" src="../../static/img/loginLogo.png" alt="">
    </div>
    <div class="title">LNNT-变电站智能巡检机器人系统</div>
    <div class="login">
      <div class="head"></div>
      <div class="login_title">登录 Sign In</div>
      <form action="" class="el-form login-form clearfix">
        <div class="item item-left">
          <div class="text">用户名：</div>
          <div class="el-form-item is-error is-required">
            <div class="el-form-item_content">
              <div class="el-input">
                <input type="text" autocomplete="off" placeholder="请输入用户名" class="el-input__inner">
                <i class="icon icon-user"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="item item-right">
          <div class="text">密码：</div>
          <div class="el-form-item is-error is-required">
            <div class="el-form-item_content">
              <div class="el-input">
                <input type="text" autocomplete="off" placeholder="请输入密码" class="el-input__inner">
                <i class="icon icon-password"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="item item-left">
          <button @click="login" class="el-button button button-login el-button--button">登录</button>
          <button class="el-button button button-reset el-button--button">重置</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
	export default {
		methods:{
			login(){
        this.$router.push('/robots/robot-management')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrap{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    min-width: 1280px;
    min-height: 680px;
    background: url("../../static/img/loginBackground.jpg") no-repeat 100% 100%;
  }
  .logo{
    position: absolute;
    top: 41px;
    left: 60px;
  }
  .title{
    margin-top: 11%;
    margin-bottom: 5%;
    text-align: center;
    font-size: 37px;
    color: #fff;
    width: auto;
    height: auto;
  }
  .login{
    margin: auto;
    -webkit-box-shadow: 0 0 3px #c8c8c8;
    box-shadow: 0 0 3px #c8c8c8;
    width: 570px;
    height: 310px;
    background-color: rgba(47,79,79,.3);
  }
  .head{
    width: 100%;
    height: 2px;
    background-color: rgba(0,128,128,.3);
    box-shadow: 0 0 3px #c8c8c8;
  }
  .login-form {
    margin: 12px 36px;
    font-size: 28px;
  }
  .login-form, .login-title {
    width: auto;
    height: auto;
    text-align: left;
    color: #fff;
  }
  .login_title{
    width: auto;
    height: auto;
    text-align: left;
    color: #fff;
    margin: 26px 36px 12px;
    font-size: 26px;
  }
  .item{
    width: 46%;
    height: 110px;
    position: relative;
    display: inline-block;
  }
  .item-left{
    float: left;
  }
  .item-right{
    float: right;
  }
  .text {
    width: auto;
    height: 39px;
    margin-top: 18px;
    line-height: 39px;
    font-size: 19px;
    color: #20b2aa;
  }
  .el-form-item {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .el-form-item__content {
    line-height: 40px;
    position: relative;
    /* font-size: 14px; */
  }
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
  }
  .el-form-item_content {
    line-height: 40px;
    position: relative;
    /* font-size: 14px; */
  }
  .el-input__inner{
    height: 41px;
    border: 0 solid transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
    width: 100%;
    line-height: 41px;
    padding-left: 36px;
    font-size: 16px;
    background-color: rgba(32,178,170,.3);
  }
  input::-webkit-input-placeholder{
    color: #e0e0e0;
  }
  .item-left .icon {
    width: 26px;
    height: 26px;
    position: absolute;
    left: 4px;
    bottom: 8px;
  }
  .item-right .icon {
    width: 26px;
    height: 26px;
    position: absolute;
    left: 4px;
    bottom: 8px;
  }
  .item-left .icon-user{

    background url("../../static/images/user.png") no-repeat center center
    background-size: cover
  }
  .item-right .icon-password{

    background url("../../static/images/password.png") no-repeat center center
    background-size: cover
  }
  .button {
    width: 46%;
    margin-top: 33px;
    position: relative;
    font-size: 17px;
  }
  .button, .login .el-input__inner, .login .input {
    height: 41px;
    border: 0 solid transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
  }
  .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    /*border: 1px solid #dcdfe6;*/
    color: #e0e0e0;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    /*margin: 0;*/
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  .button-reset {
    float: right;
    background-color: rgba(205,92,92,.8);
    //filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#C8CD5C5C,endColorstr=#C8CD5C5C);
  }
  .button-reset:hover,.button-login:hover{
    background-color: #ecf5ff;
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }
  .button-login {
    float: left;
    background-color: rgba(218,165,32,.8);
    //filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#C8DAA520,endColorstr=#C8DAA520);
  }
</style>

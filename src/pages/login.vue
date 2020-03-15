<template>
  <div class="wrap">
    <div class="logo">
      <img class="img_logo" src="../../static/img/loginLogo.png" alt="">
    </div>
    <div class="title">LNNT-变电站智能巡检机器人系统</div>
    <div class="login">
      <div class="head"></div>
      <div class="login_title">登录 Sign In</div>
      <form action="" class="el-form login-form clearfix" autocomplete="off" >
        <div class="item item-left">
          <div class="text">用户名：</div>
          <div class="el-form-item is-error is-required">
            <div class="el-form-item_content">
              <div class="el-input">

                <input name="username" type="text" autocomplete="off" placeholder="请输入用户名"
                       v-model="loginForm.account" class="el-input__inner">
                <input name="username" type="text" autocomplete="off" placeholder="请输入用户名"
                       style="position: fixed; bottom: -9999px"/>
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
                <input type="password" style="position: fixed; bottom: -9999px"/>
                <input type="password" autocomplete="off" placeholder="请输入密码"
                       v-model="loginForm.password" class="el-input__inner">
                <i class="icon icon-password"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="item item-left">
          <div @click="login" class="el-button button button-login el-button--button">登录</div>
          <div @click="reset_close" class="el-button button button-reset el-button--button">重置</div>
        </div>
        <div class="item item-right tip_text">{{tip_text}}</div>
      </form>
    </div>
  </div>
</template>

<script>
  //http://219.146.120.66:8090/dist/
  import {mapMutations} from 'vuex'
  export default {
    data(){
      return {
        loginForm: {
          account: '',
          password: ''
        },
        tip_text:'',
        userToken:'',
        count_login: 5
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),
      login(){
        this.$router.push('/robots/robot-management')
        let _this = this;
        /*if (this.loginForm.account === '' || this.loginForm.password === '') {
          _this.tip_text = '账号或密码不能为空'
        } else {
          this.$axios({
            method: 'post',
            url: '/api/ui/user/login',
            data: _this.loginForm,

          }).then(res => {
            _this.tip_text = ''
            //console.log(res.data);
            if(res.data.code==200){
              _this.userToken = 'Bearer ' + res.data.data.token;
              //console.log(_this.userToken)
              // 将用户token保存到vuex中
              //_this.changeLogin(_this.userToken);
              localStorage.setItem("token",res.data.data.token);
              localStorage.setItem("userId",res.data.data.userId);
              localStorage.setItem("username",_this.loginForm.account);
              _this.$router.push('/robots/robot-management');
              _this.count_login = 0
              //alert('登陆成功');
              _this.$message({
                message: '登录成功',
                type: 'success'
              });
            }else if(res.data.code==40006){
              _this.tip_text = res.data.message
            }else {
              if(_this.count_login<=1){
                _this.tip_text = res.data.message
              }else {
                _this.count_login--
                _this.tip_text = `${_this.loginForm.account}密码错误,您还有${_this.count_login}次机会`
              }

              //_this.tip_text = res.data.message
              //console.log(_this.count_login)
            }

          }).catch(error => {
            _this.tip_text = '账号或密码错误'
            //console.log(error);
            //alert(111)
          });
        }
        */
      },

      reset_close(){
        this.loginForm = {
          account: '',
          password: ''
        }
        this.tip_text = ''
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrap {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    min-width: 1280px;
    min-height: 680px;
    background: url("../../static/img/loginBackground.jpg") no-repeat 100% 100%;
  }

  .logo {
    position: absolute;
    top: 41px;
    left: 60px;
  }

  .title {
    margin-top: 11%;
    margin-bottom: 5%;
    text-align: center;
    font-size: 37px;
    color: #fff;
    width: auto;
    height: auto;
  }

  .login {
    margin: auto;
    -webkit-box-shadow: 0 0 3px #c8c8c8;
    box-shadow: 0 0 3px #c8c8c8;
    width: 570px;
    height: 310px;
    background-color: rgba(47, 79, 79, .3);
  }

  .head {
    width: 100%;
    height: 2px;
    background-color: rgba(0, 128, 128, .3);
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

  .login_title {
    width: auto;
    height: auto;
    text-align: left;
    color: #fff;
    margin: 26px 36px 12px;
    font-size: 26px;
  }

  .item {
    width: 46%;
    height: 110px;
    position: relative;
    display: inline-block;
  }

  .item-left {
    float: left;
  }

  .item-right {
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

  .el-input__inner {
    height: 41px;
    border: 0 solid transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
    width: 100%;
    line-height: 41px;
    padding-left: 36px;
    font-size: 16px;
    background-color: rgba(32, 178, 170, .3);
  }

  input::-webkit-input-placeholder {
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

  .item-left .icon-user {

    background url("../../static/images/user.png") no-repeat center center
    background-size: cover
  }

  .item-right .icon-password {

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
    line-height: 1.1;
    height: 40px;
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
    /*padding: 12px 20px;*/
    font-size: 14px;
    border-radius: 4px;
  }

  .button-reset {
    float: right;
    background-color: rgba(205, 92, 92, .8);
  //filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#C8CD5C5C,endColorstr=#C8CD5C5C);
  }

  .button-reset:hover, .button-login:hover {
    background-color: #ecf5ff;
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }

  .button-login {
    float: left;
    background-color: rgba(218, 165, 32, .8);
  //filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#C8DAA520,endColorstr=#C8DAA520);
  }
  .tip_text{
    border 1px solid rgba(32,178,170,.8)
    border-radius 4px
    margin-top 33px
    height 40px
    font-size 12px
    color red
    padding 2px
    box-sizing border-box
  }
</style>

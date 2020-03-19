/**
 * Created by 39557 on 2020/3/17.
 */

exports.install = function (Vue, options) {

  Vue.prototype.ajax_api_login = function (type,url, data, async, succFunc){
    jQuery.support.cors = true;
    $.ajax({
      type: type,
      async: async,
      cache:true,
      url: url,
      data:JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
      /*xhrFields:{
        withCredentials:true
      },*/
      //traditional: true,
      crossDomain: true,
      success: function (res) {
        succFunc(res);
      },
      error: function (err) {
        console.log(err)
      }
    })
  };

  Vue.prototype.ajax_api = function (type,url, data, async, succFunc){
    jQuery.support.cors = true;
    let _this = this
    $.ajax({
      headers: {
        'token': localStorage.getItem('token'),
      },
      type: type,
      async: async,
      cache:true,
      url: url,
      data: dataType(data),
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
      /*xhrFields:{
       withCredentials:true
       },*/
      //traditional: true,
      crossDomain: true,
      success: function (res) {
        if(res.code == 401){
          _this.$message({
            message: '登录过期，请重新登录',
          });
          _this.$router.push('/login');
          localStorage.setItem("token",null);
          return
        }
        succFunc(res);
      },
      error: function (err) {
        console.log(err)
      }
    })
    function dataType(data) {
      if(type=='post'){
        return JSON.stringify(data)
      }else {
        return data
      }
    }
  };


  Vue.prototype.my_ajax =  function (options){
    options = options ||{};  //调用函数时如果options没有指定，就给它赋值{},一个空的Object
    options.type=(options.type || "GET").toUpperCase();/// 请求格式GET、POST，默认为GET
    options.dataType=options.dataType || "json";    //响应数据格式，默认json

    var params=formatParams(options.data);//options.data请求的数据

    var xhr;

    //考虑兼容性
    if(window.XMLHttpRequest){
      xhr=new XMLHttpRequest();
    }else if(window.ActiveObject){//兼容IE6以下版本
      xhr=new ActiveXobject('Microsoft.XMLHTTP');
    }

    //启动并发送一个请求
    if(options.type=="GET"){
      xhr.open("GET",options.url+"?"+params,true);
      xhr.send(null);
    }else if(options.type=="POST"){
      xhr.open("post",options.url,true);

      //设置表单提交时的内容类型
      //Content-type数据请求的格式
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xhr.send(params);
    }

    //    设置有效时间
    setTimeout(function(){
      if(xhr.readySate!=4){
        xhr.abort();
      }
    },options.timeout)

    //    接收
    //     options.success成功之后的回调函数  options.error失败后的回调函数
    //xhr.responseText,xhr.responseXML  获得字符串形式的响应数据或者XML形式的响应数据
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4){
        var status=xhr.status;
        if(status>=200&& status<300 || status==304){
          options.success&&options.success(xhr.responseText,xhr.responseXML);
        }else{
          options.error&&options.error(status);
        }
      }
    }
  }

  //格式化请求参数
  function formatParams(data){
    var arr=[];
    for(var name in data){
      arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]));
    }
    arr.push(("v="+Math.random()).replace(".",""));
    return arr.join("&");
  }

};

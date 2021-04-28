<template>
  <div class="pic_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="pic_content">
      <p>请上传需要识别的图片</p>
      <div>
        <el-upload
            action="" :headers="importHeaders"
            list-type="picture-card"
            :on-change="getFile"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview">

          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <p>识别结果</p>
      <el-button v-if="true" type="primary" @click="subPic(1)">获取结果1</el-button>
      <el-button v-if="true" type="primary" @click="subPic(2)">获取结果2</el-button>
      <!--<div style="width: 200px;margin-top: 20px">
        <img id="pic" :src='src' alt="">
      </div>
      <p>{{msg}}</p>-->
      <div class="image_ul_yiwu">
        <div v-for="(item, index) in resultList" :key="index">
          <img :src="imgUrlBefore+item.picResult" alt="">
          <p>{{item.reconResult}}</p>
        </div>
      </div>
    </div>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import menuBottom from '../components/menuBottom.vue'
  import HeaderTop from '../components/headerTop.vue'
  export default {
    name: "pictureLoad",
    data(){
      return{
        title:'专项巡检 > 异物缺陷识别',

        dialogImageUrl: '',
        dialogVisible: false,
        pictureUpdate: url_api + '/file',
        importHeaders: {
          token: localStorage.getItem('token')
        },

        ros: null,
        listener:null,
        url:robotUrl,
        src:null,
        msg:'',
        resultList:[],
        imgUrlBefore: url_img + '/smcsp/',
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file.response)
      },

      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
      getFile(file, fileList) {
        let _this = this
        this.getBase64(file.raw).then(res => {
          //console.log(res.substring(res.indexOf(",")+1))
          let picSource = res.substring(res.indexOf(",")+1)
          _this.ajax_api('post',url_api + '/foreign/save' + '?&_t=' + new Date().getTime(),
            { irBaseRobotId: "1",
              reconMethod: "1",
              picSource: picSource
            },
            true, function (res) {
              console.log(res)
              if(res.code==200){
                //_this.subPic()
              }else {
                _this.message('请检查网络')
              }

            })
        });
      },

      subPic(type){
        let _this = this
        /*_this.resultList = [
          {name:'999',src:'https://img2.baidu.com/it/u=2646545122,2660381078&fm=26&fmt=auto&gp=0.jpg'},
          {name:'999',src:'../static/img/no404.jpg'},
          {name:'999',src:'000'}
        ]*/
        _this.resultList = []
        _this.ajax_api('post',url_api + '/foreign/findList' + '?&_t=' + new Date().getTime(),
          {
            irBaseRobotId:"1",
            reconMethod:type,
            reconResult:"",
            resultStatus:""
          },
          true, function (res) {
            console.log(res)
            _this.resultList = res.data.items
          })
        /*_this.ros = new ROSLIB.Ros({
            url : _this.url
        });
        _this.ros.on('connection', function() {
          console.log('pic');
        });
        _this.listener = new ROSLIB.Topic({
          ros : _this.ros,
          name : '/thermal/image_proc/compressed',// /thermal/image_proc/compressed
          messageType : 'sensor_msgs/CompressedImage', // sensor_msgs::CompressedImage
        });
        _this.listener.subscribe(function(message) {
          console.log('Received message on ' +': ' + message.data);
          var url = "data:image/png;base64,";
          var i = message.data
          _this.src = url+ i
          setTimeout(function () {
            $("#pic").src = _this.src
          },1000)
          _this.msg = '550kV油位表异常'
          _this.listener.unsubscribe();
        });*/
      },
    },
    components: {
      HeaderTop,
      menuBottom,
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .pic_wrap
    width 100%
    height 100%
    .pic_content
      height calc(100% - 90px)
      padding 50px
      box-sizing border-box

      p
        font-size 18px
        margin 5px 0 20px
      .image_ul_yiwu
        height 480px
        overflow-y auto
        margin-top 20px
        border 1px solid
        display flex
        flex-wrap wrap
        div
          /*width 180px*/
          margin 0 10px
          display flex
          flex-direction column




</style>
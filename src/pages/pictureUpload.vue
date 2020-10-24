<template>
  <div class="pic_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="pic_content">
      <p>请上传需要识别的图片</p>
      <div>
        <el-upload
            :action="pictureUpdate" :headers="importHeaders"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <p>识别结果</p>
      <el-button type="primary" @click="subPic">获取结果</el-button>
      <div style="width: 200px;margin-top: 20px">
        <img id="pic" :src='src' alt="">
      </div>
      <p>{{msg}}</p>
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
      subPic(){
        let _this = this
        _this.ros = new ROSLIB.Ros({
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
        });
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
        margin 12px 0



</style>
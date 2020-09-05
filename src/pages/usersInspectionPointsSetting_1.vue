<template>
  <div class="point_setting_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <XunjianTopBox></XunjianTopBox>
    <div class="point_setting_disable">
      <p>启用状态：</p>
      <el-select v-model="value" placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="point_setting_tools">
      <el-input v-model="input" placeholder="请输入内容" style="width: 180px;float: left" size="mini"></el-input>
      <ul>
        <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
        <li><img src="../../static/images/add.png" alt=""><span>添加</span></li>
        <li><img src="../../static/images/modify.png" alt=""><span>修改</span></li>
        <li><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
        <li><img src="../../static/images/enable.png" alt=""><span>启用</span></li>
        <li><img src="../../static/images/disable.png" alt=""><span>禁用</span></li>
        <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
      </ul>
    </div>
    <el-upload class='image-uploader' :multiple='false' :auto-upload='true' list-type='text' :show-file-list='true'
               :before-upload="beforeUpload" :drag='true' action='' :limit="1" :on-exceed="handleExceed"
               :http-request="uploadFile">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">一次只能上传一个文件，仅限text格式，单文件不超过1MB</div>
    </el-upload>
    <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import XunjianTopBox from '../components/xunjianTopBox.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'点位设置 > 巡检点位设置',
        options: [{
          value: '选项1',
          label: '启用'
        }, {
          value: '选项2',
          label: '禁用'
        }],
        value: '',
        input:'',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]

      }
    },
    methods:{
      // 上传文件之前的钩子
      beforeUpload(file) {
        //判断文件格式
        let hz = file.name.split(".")[1]
        if (hz != 'xlsx' && hz != 'xls') {
          alert('格式不正确')
          return false;
        }
      },
      // 上传文件个数超过定义的数量
      handleExceed1(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
      },
      // 上传文件
      uploadFile(item) {
        let fileObj = item.file
        const form = new FormData()// FormData 对象
        form.append('upload', fileObj)// 文件对象  'upload'是后台接收的参数名
        $.ajax({
          url: "http://",
          data: form,
          type: "POST",
          //contentType: "multipart/form-data",
          processData: false, //告诉jquery不要对form进行处理
          contentType: false, //指定为false才能形成正确的Content-Type
          success: function (res) {}
        })
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },
    components: {
      HeaderTop,
      XunjianTopBox,
      menuBottom
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .point_setting_wrap
    .point_setting_disable
      height 30px
      display flex
      align-items center
      padding 0 0 0 70px
      p
        float left
        font-weight 600
        font-size 14px
    .point_setting_tools
      width 100%
      height 30px
      display flex
      background  #cae7ee\0
      background linear-gradient(#e3f2ee,#cae7ee)
      align-items center
      padding-left 10px
      box-sizing border-box
      ul
        float left
        display flex
        padding-left 5px
        li
          margin 0 15px
          display flex
          align-items center
          cursor pointer
          float left
          img
            width 16px
            height 16px
            margin-right 4px

</style>

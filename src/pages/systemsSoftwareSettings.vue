<template>
  <div class="software_setting_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="software_content">
      <el-tabs tab-position="left" style="height: 100%;" type="card">
        <el-tab-pane label="系统名称设置">
          <div class="items">
            <div>
              <p>系统名称：</p>
              <el-input size="mini" v-model="companyName"></el-input>
              <span>*</span>
            </div>
            <div>
              <p>系统区域：</p>
              <el-input size="mini" v-model="companyArea"></el-input>
              <span>*</span>
            </div>
            <div style="align-items: flex-start">
              <p>系统图标：</p>
              <el-upload style="width: 180px"
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else="imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                <i v-else="imageUrl" class="avatar el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span>*</span>
            </div>
            <el-button @click="setCompanyName" class="update_img" size="mini">保存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="系统基本信息">
          <div class="items items_2">
            <p>web版本: <span>0</span></p>
            <p>LER3000A版本: <span>0</span></p>
            <p>数据库模型版本: <span>0</span></p>
            <p>机器人下位机版本: <span>0</span></p>
            <p>模式识别版本: <span>0</span></p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="远程访问设置">
          <div class="items items_3">
            <div>
              <p>可见光ip地址：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <div>
              <p>可见光端口：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <div>
              <p>可见光账号：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <div>
              <p>可见光密码：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <div>
              <p>webrtc-address：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <div>
              <p>rtsp-address：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <el-button class="update_address" size="mini">保存</el-button>
          </div>

        </el-tab-pane>
        <el-tab-pane label="坐标设置">
          <div class="items item_4">
            <div>装载点坐标：</div>
            <div>
              <p>x：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <div>
              <p>y：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <div>
              <p>z：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <div>Back坐标：</div>
            <div>
              <p>x：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <div>
              <p>y：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <div>
              <p>z：</p>
              <el-input size="mini"></el-input>
              <span>*</span>
            </div>
            <el-button class="update_position" size="mini">保存</el-button>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'软件设置 > 软件设置',
        imageUrl: '',

        companyName: '',
        companyArea: '',

      }
    },
    mounted(){
    	this.getCompanyName()
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      getCompanyName(){
        let _this = this
        _this.ajax_api('get',url_api + '/system-setting',
          null,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data.items)
              let items = res.data.items
              let company_name = items.filter(item =>{
              	return item.name == "company_name"
              })
              let company_area = items.filter(item=>{
              	return item.name == "company_area"
              })
              let logo = items.filter(item=>{
                return item.name == "logo"
              })
              _this.companyName = company_name[0].value
              _this.companyArea = company_area[0].value
              _this.imageUrl = logo[0].value

            }
        })
      },

      setCompanyName(){
      	let _this = this
        /*{
          "systemSettingRequests":[
          {
            "name":"logo",
            "displayName":"logo图标",
            "value":"https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=b30eadd0267f9e2f6438155a7e598241/21a4462309f790528aa758080df3d7ca7bcbd54f.jpg"
          },
          {
            "name":"company_name",
            "displayName":"企业名称",
            "value":"泉城变电站管理系统"
          },
          {
            "name":"company_area",
            "displayName":"企业区域",
            "value":"北京地区"
          },
          {
            "name":"author",
            "displayName":"name",
            "value":"cuim"
          }
        ]
        }*/
      	let setCompanyData = {
          systemSettingRequests:[
            {
              name: "logo",
              displayName: "logo图标",
              value: _this.imageUrl
              //value:'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=b30eadd0267f9e2f6438155a7e598241/21a4462309f790528aa758080df3d7ca7bcbd54f.jpg'
            },
            {
              name:"company_name",
              displayName:"企业名称",
              value:_this.companyName
            },
            {
              name:"company_area",
              displayName:"企业区域",
              value:_this.companyArea
            }
          ]
        }
        //console.log(setCompanyData)
        _this.ajax_api('put',url_api + '/system-setting/batch',
          setCompanyData,
          true,
          function (res) {
            if(res.code == 200){
              _this.$message({
                message: '保存成功',
                type: 'success',
              });
              _this.getCompanyName()
            }
          })

      },
    },
    components: {
      HeaderTop,
      menuBottom
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .software_setting_wrap
    width 100%
    height 100%
    background white
    .software_content
      width 100%
      height calc(100% - 70px)
      background white
      div>>>
        .el-tabs__header
          width 160px
          background linear-gradient(#e3f2ee,#cae7ee)
          border-right: 1px solid #dfe4ed;
          padding-left 2px
          .el-tabs__item
            margin 12px 0
            height: 36px;
            line-height: 36px;
            border: 1px solid #ccc;
            border-right: none;
            border-radius: 4px 0 0 4px;
            color: #000;
            text-align right
            padding-right 40px
          .is-active
            color: #109cb4;
            border: 1px solid #109cb4;
            border-right: none;
            background white
          .is-active:first-child , .is-active:last-child
            border: 1px solid;
            border-right: none;


        .el-tabs__content
          -webkit-box-flex: 1;
          -ms-flex-positive: 1;
          flex-grow: 1;
          padding: 20px;
          overflow: hidden;
          position: relative;
          .items
            width: 500px;
            height: auto;
            padding 8px 20px
            border 1px solid #109cb4
            >div
              display flex
              align-items center
              margin 18px auto
              color #109cb4
              >p
                width 100px
              >p::before
                content '*'
                color #f56c6c
                margin-right 5px
              >div
                width 320px
              >span
                color #f56c6c
                margin-left 5px
            .update_img
              margin 10px auto 10px 100px

          .items_2
            p
              margin 18px 8px 18px 8px
              color #666
          .items_3
            >div
              >p
                width 120px
                text-align right
              >p:before
                content ''
            .update_address
              margin 10px auto 10px 120px
          .item_4
            >div
              >p
                width 80px
                text-align right
              >p:before
                content ''
            .update_position
              margin 10px auto 10px 80px
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
</style>

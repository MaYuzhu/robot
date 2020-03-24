<template>
  <div class="user_structure_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="content">
      <div class="content_left">
        <UsersTree @childKey="childKey" v-if="DestroyIncomeStatistics == true"></UsersTree>
      </div>
      <div class="content_right">
        <div class="right_top">
          <p style="color:#489e02">部门信息</p>
          <ul>
            <li @click="addBox"><img src="../../static/images/add.png" alt=""><span>添加下级部门</span></li>
            <li @click="updateBox"><img src="../../static/images/modify.png" alt=""><span>修改</span></li>
            <li @click="delBox"><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
          </ul>
        </div>
        <div class="right_title">
          <p>机构详情</p>
          <p>下面显示机构详细信息</p>
        </div>
        <div class="right_ul">
          <ul>
            <li>
              <div>上级机构：</div>
              <div style="padding-left: 5px;height: 36px">{{organizationInfo.parentName}}</div>
            </li>
            <li>
              <div>机构编号：</div>
              <div style="padding-left: 5px;height: 36px">{{organizationInfo.organizationNum}}</div>
            </li>
            <li>
              <div>机构名称：</div>
              <div style="padding-left: 5px;height: 36px">{{organizationInfo.organizationName}}</div>
            </li>
            <li>
              <div>中文名称：</div>
              <div style="padding-left: 5px;height: 36px">{{organizationInfo.organizationNameCn}}</div>
            </li>
            <li>
              <div>英文名称：</div>
              <div style="padding-left: 5px;height: 36px">{{organizationInfo.organizationNameEn}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog :title="box_title" :visible.sync="dialogVisibleAdd">
      <div class="dialog_content">

        <div class="input_wrap">
          <p>机构名称：</p>
          <el-input size="mini" v-model="addData.add_name"></el-input>
          <span class="must-mark">*</span>
        </div>
        <div class="input_wrap">
          <p>机构编号：</p>
          <el-input size="mini" v-model="addData.add_sn"></el-input>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>中文名称：</p>
          <el-input size="mini" v-model="addData.add_cn_name"></el-input>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>英文名称：</p>
          <el-input size="mini" v-model="addData.add_en_name"></el-input>
          <span class="must-mark"></span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addCommit">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="box_title" :visible.sync="dialogVisibleUpdate">
      <div class="dialog_content">

        <div class="input_wrap">
          <p>机构名称：</p>
          <el-input size="mini" v-model="addData.add_name"></el-input>
          <span class="must-mark">*</span>
        </div>
        <div class="input_wrap">
          <p>机构编号：</p>
          <el-input size="mini" v-model="addData.add_sn"></el-input>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>中文名称：</p>
          <el-input size="mini" v-model="addData.add_cn_name"></el-input>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>英文名称：</p>
          <el-input size="mini" v-model="addData.add_en_name"></el-input>
          <span class="must-mark"></span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUpdate = false">取 消</el-button>
        <el-button type="primary" @click="updateCommit">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog title="确认" :visible.sync="dialogVisibleDel" class="del_item">
      <div class="dialog_content" style="height: 60px;font-weight: 600;font-size: 16px;line-height: 40px">
        确认删除吗？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDel = false">取 消</el-button>
        <el-button type="primary" @click="delCommit">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import UsersTree from '../components/usersTree.vue'

  export default {
    data(){
      return{
        title:'系统设置 > 组织结构',
        irSysOrganizationId : '',
        departmentName : '',
        currentNameId :'',
        organizationInfo:{
        	parentName:'',
          organizationNum:'',
          organizationName:'',
          organizationNameCn:'',
          organizationNameEn:''
        },
        dialogVisibleAdd: false,
        dialogVisibleUpdate: false,
        dialogVisibleDel: false,
        box_title:'',
        addData:{
          add_name:'',
          add_sn:'',
          add_cn_name:'',
          add_en_name:''
        },
        DestroyIncomeStatistics:true,
      }
    },
    components: {
      HeaderTop,
      UsersTree

    },
    mounted(){

    },
    methods:{
      childKey(childValue){
      	let _this = this
        _this.irSysOrganizationId = childValue.id
        _this.departmentName = childValue.name
        //console.log(this.irSysOrganizationId)
        _this.ajax_api('get',url_api + '/organization/info/' + _this.irSysOrganizationId, {}, true, function (res){
          //console.log(res)
          _this.organizationInfo = {
            parentName:res.data.parent?res.data.parent.name:'',
            organizationNum:res.data.sn,
            organizationName:res.data.name,
            organizationNameCn:res.data.cnName,
            organizationNameEn:res.data.enName
          }

        })
      },
      addBox(){
      	let _this = this
        if(!_this.irSysOrganizationId){
          _this.$message({
            message: '请选择',
          });
      		return
        }
        _this.dialogVisibleAdd = true
        _this.box_title = '添加下级部门'
        _this.addData = {
          add_name:'',
          add_sn:'',
          add_cn_name:'',
          add_en_name:''
        }
      },
      addCommit(){
      	let _this = this
        let addData = {
          parentId:_this.irSysOrganizationId,
          sn:_this.addData.add_sn,
          name:_this.addData.add_name,
          cnName:_this.addData.add_cn_name,
          enName:_this.addData.add_en_name,
          //description:"123"
        }
        if(!addData.name){
          _this.$message({
            message: '请输入名称',
          });
          return
        }
        _this.ajax_api('post',url_api + '/organization/addOrganization', addData, true, function (res) {
          if(res.code == 200){
            _this.$message({
              message: '新增成功',
              type: 'success',
            });

          }else {
            _this.$message({
              message: '操作失败，请重试',
            });
          }
          _this.dialogVisibleAdd = false
          //location.reload()
          _this.DestroyIncomeStatistics = false
          _this.$nextTick(() => {
            _this.DestroyIncomeStatistics = true
          });
        })

      },

      updateBox(){
      	let _this = this
        if(!_this.irSysOrganizationId){
          _this.$message({
            message: '请选择',
          });
          return
        }
        _this.dialogVisibleUpdate = true
        _this.box_title = '修改信息'
        _this.ajax_api('get',url_api + '/organization/info/' + _this.irSysOrganizationId, {}, true, function (res){
          //console.log(res)
          if(res){
          	_this.currentNameId = res.data.parentId
            _this.addData = {
              add_name:res.data.name,
              add_sn:res.data.sn,
              add_cn_name:res.data.cnName,
              add_en_name:res.data.enName
            }
          }else {
            _this.$message({
              message: '暂无数据',
            });
          }

        })
      },
      updateCommit(){
      	let _this = this
        let updateData = {
          parentId:_this.currentNameId,
          sn:_this.addData.add_sn,
          name:_this.addData.add_name,
          cnName:_this.addData.add_cn_name,
          enName:_this.addData.add_en_name,
        }
        if(!updateData.name){
          _this.$message({
            message: '请输入名称',
          });
          return
        }
        _this.ajax_api('put',url_api + '/organization/udpOrganization/' + _this.irSysOrganizationId,
          updateData, true, function (res) {
          if(res.code == 200){
            _this.$message({
              message: '修改成功',
              type: 'success',
            });

          }else {
            _this.$message({
              message: '操作失败，请重试',
            });
          }
          _this.dialogVisibleUpdate = false
          //location.reload()
        })

      },

      delBox(){
        let _this = this
        if(!_this.irSysOrganizationId){
          _this.$message({
            message: '请选择',
          });
          return
        }
        _this.dialogVisibleDel = true
      },
      delCommit(){
        let _this = this
        _this.ajax_api('DELETE',url_api + '/organization/delOrganization/' + _this.irSysOrganizationId,
          {},
          true, function (res) {
            if(res.code == 200){
              _this.$message({
                message: '删除成功',
                type: 'success',
              });
              //location.reload()
              _this.dialogVisibleDel = false
              _this.DestroyIncomeStatistics = false
              _this.$nextTick(() => {
                _this.DestroyIncomeStatistics = true
              })
            }else {
              _this.$message({
                message: '操作失败，请重试',
              });
            }
          })
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .user_structure_wrap
    height 100%
    .content
      display flex
      height calc(100% - 72px)
      background white
      .content_left
        width 300px
        height 100%
        float left
        border 1px solid #cae7ee
        overflow auto
        box-sizing border-box
      .content_right
        border 1px solid #cae7ee
        width calc(100% - 302px)
        height 100%
        box-sizing border-box
        position relative
        float left
        .right_top
          background #cae7ee\0;
          background linear-gradient(#e3f2ee,#cae7ee)
          display flex
          align-items center
          height 30px
          p
            float left
            margin-left 10px
            font-weight 600
          ul
            float left
            display flex
            padding-left 5px
            li
              margin 0 10px
              display flex
              float left
              align-items center
              cursor pointer
              img
                width 16px
                height 16px
                margin-right 4px
        .right_title
          background #d5f2f9 \0;
          background linear-gradient(#e3f2ee,#cae7ee)
          height 56px
          padding: 5px 5px 5px 10px;
          >:nth-child(1)
            width: 200px;
            height: 27px;
            margin-left: 10px;
            line-height: 27px;
            font-size: 19px;
            color: #4c4c4c;
          >:nth-child(2)
            width: 200px;
            height: 27px;
            margin-left: 10px;
            line-height: 27px;
            color: #4c4c4c;
        .right_ul
          ul
            li
              height 36px
              margin-top 8px
              display flex
              >:nth-child(1)
                border 1px solid #bbb
                background #eee
                width 260px
                line-height 36px
                text-align right
                float left
              >:nth-child(2)
                border 1px solid #bbb
                background #fff
                width calc(100% - 280px)
                line-height 36px
                float left

    div>>>
      .el-dialog
        background #d7efec
        width: 48%;
        min-width: 800px;
        padding-bottom: 6px;
      .dialog_content
        background white
        padding 10px 20px
        border 1px solid #90e8c6
        .title
          height 40px
          line-height 40px
          border-bottom 1px solid #bababa
          span
            font-size 14px
            font-weight 600

        .input_wrap
          display flex
          align-items center
          margin 15px 0
          p
            width 110px
            margin-right 10px
            text-align right
            font-size 14px
            font-weight 600
            display inline-block
          .el-switch
            display inline-block
          .must-mark
            color red
            font-size 18px
            margin-left 5px
            display inline-block
    div>>>.right_top
            .el-input
              width 220px
              .el-input__inner
                border 1px solid #cae7ee
    div>>>
      .el-dialog__body
        padding 2px 5px 0px
    div>>>
      .el-dialog__footer
        border 1px solid #90e8c6
        border-top none
        padding 5px 10px
        margin 0 5px
        background white
        .el-button
          padding 6px 20px
    div>>>
      .el-dialog__headerbtn
        top 8px
        right 8px
    div>>>.el-dialog
            .el-input
              width 220px
              .el-input__inner
                border 1px solid #cae7ee
            .el-dialog__title
              display inline-block
              position absolute
              font-size 14px
              top 4px
              left 10px
    .del_item /deep/ .el-dialog
      background #d7efec
      width: 20%;
      min-width: 180px;
      padding-bottom: 6px;
</style>

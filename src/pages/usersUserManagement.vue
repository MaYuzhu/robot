<template>
  <div class="user_management_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="content">
      <div class="content_left">
        <UsersTree @childKey="childKey"></UsersTree>
      </div>
      <div class="content_right">
        <div class="right_top">
          <p>工号：</p>
          <el-input v-model="input2" placeholder="请输入内容" style="width: 180px" size="mini"></el-input>
          <p>姓名：</p>
          <el-input v-model="input3" placeholder="请输入内容" style="width: 180px" size="mini"></el-input>
          <ul>
            <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
            <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
            <li @click="addUser"><img src="../../static/images/add.png" alt=""><span>新增</span></li>
            <li @click="updateUser"><img src="../../static/images/modify.png" alt=""><span>修改</span></li>
            <li @click="delUser"><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
            <li><img src="../../static/images/init.png" alt=""><span>初始化密码</span></li>
          </ul>
        </div>
        <p class="right_title">用户操作</p>
        <div>
          <el-table highlight-current-row ref="singleTable"
            :data="tableData" @current-change="clickChange"
            border
            style="width: 100%">
            <el-table-column
              type="index" :index="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="sn"
              label="工号">
            </el-table-column>
            <el-table-column
              prop="account"
              label="登录名"
              :formatter="formatStatus">
            </el-table-column>
            <el-table-column
              prop="name"
              label="所属部门">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="name"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="validityTime"
              label="最后一次登录时间">
            </el-table-column>
            <el-table-column
              prop="name"
              label="登录IP">
            </el-table-column>
            <el-table-column
              prop="address"
              label="是否开启短信提醒功能">
            </el-table-column>
            <el-table-column
              prop="name"
              label="有效期">
            </el-table-column>
            <el-table-column
              prop="address"
              label="角色">
            </el-table-column>

          </el-table>
        </div>
        <div class="page_box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 3, 10]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>

      </div>
    </div>


    <el-dialog title="用户管理" :visible.sync="dialogVisibleAddUser">
      <div class="dialog_content">
        <p class="title">
          <span>部门：</span><span>{{departmentName}}</span>
        </p>
        <div class="input_wrap">
          <p>登录名：</p>
          <el-input size="mini" v-model="account"></el-input>
          <span class="must-mark">*</span>
        </div>
        <div class="input_wrap">
          <p>密码：</p>
          <el-input size="mini" v-model="password"></el-input>
          <span class="must-mark">*</span>
        </div>
        <div class="input_wrap">
          <p>确认密码：</p>
          <el-input size="mini" v-model="password_re"></el-input>
          <span class="must-mark">*</span>
        </div>
        <div class="input_wrap">
          <p>工号：</p>
          <el-input size="mini" v-model="sn"></el-input>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>姓名：</p>
          <el-input size="mini" v-model="name"></el-input>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>手机号：</p>
          <el-input size="mini" v-model="phone"></el-input>
          <span class="must-mark">*</span>
        </div>
        <div class="input_wrap">
          <p>有效期至：</p>
          <el-date-picker size="mini"
            v-model="value_date"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>短信服务：</p>
          <el-switch
            v-model="value_phone"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>

        </div>
        <div class="input_wrap">
          <p>角色：</p>
          <el-checkbox v-model="checked_roles.checked_role1">管理员</el-checkbox>
          <el-checkbox v-model="checked_roles.checked_role2">操作员</el-checkbox>
          <el-checkbox v-model="checked_roles.checked_role3">普通用户</el-checkbox>
          <span class="must-mark" style="margin-left: 30px">*</span>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addUserCommit">保 存</el-button>
      </span>
    </el-dialog>
    <!--删除用户-->
    <el-dialog title="确认" :visible.sync="dialogVisibleDelUser" class="del_user">
      <div class="dialog_content" style="height: 60px;font-weight: 600;font-size: 16px;line-height: 40px">
        确认删除该用户吗？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDelUser = false">取 消</el-button>
        <el-button type="primary" @click="delUserCommit">确 认</el-button>
      </span>
    </el-dialog>

    <!--修改用户-->
    <el-dialog title="用户管理" :visible.sync="dialogVisibleUpdateUser">
      <div class="dialog_content">
        <p class="title">
          <span>部门：</span><span>{{departmentName}}</span>
        </p>
        <div class="input_wrap">
          <p>登录名：</p>
          <el-input size="mini" v-model="update_account" :disabled="true"></el-input>
          <span class="must-mark">*</span>
        </div>
        <div class="input_wrap">
          <p>工号：</p>
          <el-input size="mini" v-model="update_sn"></el-input>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>姓名：</p>
          <el-input size="mini" v-model="update_name"></el-input>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>手机号：</p>
          <el-input size="mini" v-model="update_phone"></el-input>
          <span class="must-mark">*</span>
        </div>
        <div class="input_wrap">
          <p>有效期至：</p>
          <el-date-picker size="mini"
                          v-model="update_value_date"
                          type="datetime"
                          placeholder="选择日期时间">
          </el-date-picker>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>短信服务：</p>
          <el-switch
            v-model="update_value_phone"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>

        </div>
        <div class="input_wrap">
          <p>角色：</p>
          <el-checkbox v-model="update_checked_roles.checked_role1">管理员</el-checkbox>
          <el-checkbox v-model="update_checked_roles.checked_role2">操作员</el-checkbox>
          <el-checkbox v-model="update_checked_roles.checked_role3">普通用户</el-checkbox>
          <span class="must-mark" style="margin-left: 30px">*</span>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUpdateUser = false">取 消</el-button>
        <el-button type="primary" @click="updateUserCommit">保 存</el-button>
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
        title:'系统设置 > 用户管理',
        tableData: [
        	{
          date: '1',
          name: '123',
          address: ' 1518 '
        }, {
          date: '2',
          name: '1234',
          address: ' 1517 '
        }, {
          date: '3',
          name: '1001',
          address: ' 1519 '
        }, {
          date: '4',
          name: '1002',
          address: ' 1516 '
        }],
        input2:'',
        input3:'',
        dialogVisibleAddUser: false,
        dialogVisibleDelUser: false,
        departmentName:'',
        value_date:'',
        value_phone:false,
        checked_roles: {
          checked_role1:false,
          checked_role2:false,
          checked_role3:false
        },

        account:'',
        password:'',
        password_re:'',
        sn:'',
        name:'',
        phone:'',
        irSysOrganizationId:'',
        total:1,
        userData : {
          pageSize:10,
          pageNum:1
        },
        currentPage: 1,
        currentUserId:'',
        currentRow:null,
        isCheckedUserId:'',

        dialogVisibleUpdateUser:false,
        update_account:'',
        update_name:'',
        update_sn:'',
        update_phone:'',
        update_value_phone:false,
        update_value_date:'',
        update_checked_roles: {
          checked_role1:false,
          checked_role2:false,
          checked_role3:false
        },
      }
    },
    components: {
      HeaderTop,
      UsersTree,

    },
    mounted(){
    	this.getAllUserData()

    },
    methods:{
    	//新增用户
    	addUser(){
        var _this = this
        if(this.irSysOrganizationId == ''){
          _this.$message({
            message: '请选择',
          });
          return
        }
        _this.dialogVisibleAddUser = true
        _this.account =''
        _this.password = ''
        _this.sn = ''
        _this.name = ''
        _this.phone= ''
        _this.password_re = ''
        _this.checked_roles = {
          checked_role1:false,
          checked_role2:false,
          checked_role3:false
        }

      },
      addUserCommit(){
    		let _this = this
        let roleIds = ''
        for (var Key in _this.checked_roles){
          roleIds += _this.checked_roles[Key]?Key.substr(Key.length-1,1)+',':''
        }
        roleIds = roleIds.substring(0, roleIds.length - 1);

        let addUserData = {
          account:this.account,
          password:this.password,
          sn:this.sn,
          name:this.name,
          phone:this.phone,
          irSysOrganizationId:this.irSysOrganizationId,
          roleIds:roleIds
        }

        if(!addUserData.account){
          _this.$message({
            message: '请输入用户名',
          });
          return
        }
        if(!addUserData.password){
          _this.$message({
            message: '请输入密码',
          });
          return
        }
        if(addUserData.password !== _this.password_re ){
          _this.$message({
            message: '两次输入密码不一致',
          });
          return
        }
        if(!addUserData.phone){
          _this.$message({
            message: '请输入手机号',
          });
          return
        }
        if(roleIds==''){
          _this.$message({
            message: '请选择角色',
          });
          return
        }


        _this.ajax_api('post',url_api + '/user/addUser', addUserData, true, function (res) {
          if(res.code == 200){
            _this.$message({
              message: '新增成功',
              type: 'success',
            });
            _this.getAllUserData()
          }else {
            _this.$message({
              message: '操作失败，请重试',
            });
          }
          _this.dialogVisibleAddUser = false
        })

        /*this.$axios({
          method: 'post',
          url: url_api + '/user/addUser',
          data: addUserData,
        }).then(res => {
          //console.log(res.data)
        })*/

      },
      //删除用户
      clickChange(raw) {
      	if(raw){
          //console.log(raw.id);
          this.isCheckedUserId = raw.id
        }else {
          this.isCheckedUserId = null
        }
      },
      delUser(){
        if(!this.isCheckedUserId){
          this.$message({
            message: '请选择用户',
            duration: 2000
          });
          return
        }
        this.dialogVisibleDelUser = true

      },
      delUserCommit(){
      	let _this= this
        _this.ajax_api('DELETE',url_api + '/user/delUser/' + _this.isCheckedUserId,
          {},
          true, function (res) {
          if(res.code == 200){
            _this.$message({
              message: '删除成功',
              type: 'success',
            });
            _this.getAllUserData()
          }else {
            _this.$message({
              message: '操作失败，请重试',
            });
          }
        })
        _this.dialogVisibleDelUser = false
      },
      //修改用户
      updateUser(){
        let _this = this
        if(!_this.isCheckedUserId){
          this.$message({
            message: '请选择用户',
            duration: 2000
          });
          return
        }
        _this.dialogVisibleUpdateUser = true
        _this.ajax_api('get',url_api + '/user/info/' + _this.isCheckedUserId, {}, true, function (res) {
          //console.log(res)//irSysOrganizationId
          _this.irSysOrganizationId = res.data.irSysOrganizationId
          _this.update_account = res.data.account
          _this.update_name = res.data.name,
          _this.update_sn = res.data.sn,
          _this.update_phone = res.data.phone,
          _this.update_value_phone = false,
          _this.update_value_date = res.data.createTime,
          _this.update_checked_roles= {
            checked_role1:false,
            checked_role2:false,
            checked_role3:false
          }
        })
      },
      updateUserCommit(){
      	let _this = this
        let roleIds = ''
        for (var Key in _this.update_checked_roles){
          roleIds += _this.update_checked_roles[Key]?Key.substr(Key.length-1,1)+',':''
        }
        roleIds = roleIds.substring(0, roleIds.length - 1);
        let updateUser = {
          irSysOrganizationId: _this.irSysOrganizationId,
          sn: _this.update_sn,
          name:_this.update_name,
          roleIds:roleIds,
          account: _this.update_account,
          password:"123456",
        }
        if(roleIds==''){
          _this.$message({
            message: '请选择角色',
          });
          return
        }
        _this.ajax_api('put',url_api + '/user/updUser/' + _this.isCheckedUserId,
          updateUser,
          true, function (res) {
            if(res.code == 200){
              _this.$message({
                message: '修改成功',
                type: 'success',
              });
              _this.getAllUserData()
            }else {
              _this.$message({
                message: '操作失败，请重试',
              });
            }
          })
      },

      formatStatus(row, column) {
        //return row.account == 'admin' ? '已执行' : '未执行'
        return row.account
      },
      index(val){
        //(listQuery.page - 1) * listQuery.pageSize + scope.$index + 1
        return (this.userData.pageNum - 1)*this.userData.pageSize + val + 1
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.userData.pageSize  =  val
        this.getAllUserData()
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.userData.pageNum  =  val
        this.getAllUserData()
      },
      getAllUserData(){
        var _this = this
        /*this.$axios({
         method: 'get',
         url: url_api + '/user/findAllUser',
         }).then(res => {
         console.log(res.data.data)
         this.tableData = res.data.data.items
         }).catch(function (err) {
         console.log(err)
         })*/

        this.ajax_api('get',url_api + '/user/findAllUser',_this.userData,true,function (res) {
          //console.log(res.data)
          _this.total = res.data.total
          _this.tableData = res.data.items
        })
      },
      childKey(childValue){
        this.irSysOrganizationId = childValue.id
        this.departmentName = childValue.name
      },

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .user_management_wrap
    width 100%
    height 100%
    .content
      display flex
      display block\0
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
        /*border-right 1px solid #cae7ee*/
        box-sizing border-box
        position relative
        float left
        .right_top
          background #cae7ee\0
          background linear-gradient(#e3f2ee,#cae7ee)

          display flex
          align-items center
          height 30px
          p
            float left
            margin-left 10px
            font-weight 600
            line-height 30px
          .el-input
            float left
          ul
            display flex
            padding-left 5px
            li
              float left
              margin 0 10px
              display flex
              align-items center
              cursor pointer
              box-sizing border-box
              height 30px
              line-height 30px
              img
                width 16px
                height 16px
                margin-right 4px
        .right_title
          background linear-gradient(#e3f2ee,#cae7ee)
          height 30px
          line-height 30px
          padding-left 10px
        .page_box
          width 100%
          position absolute
          left 0px
          bottom 0px
          background #e9e9e9
          padding 5px 10px
          box-sizing border-box


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
    .del_user /deep/ .el-dialog
        background #d7efec
        width: 20%;
        min-width: 180px;
        padding-bottom: 6px;
</style>


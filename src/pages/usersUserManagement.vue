<template>
  <div class="user_management_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="content">
      <div class="content_left">
        <UsersTree></UsersTree>
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
            <li><img src="../../static/images/modify.png" alt=""><span>修改</span></li>
            <li><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
            <li><img src="../../static/images/init.png" alt=""><span>初始化密码</span></li>
          </ul>
        </div>
        <p class="right_title">用户操作</p>
        <div>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="sn"
              label="工号">
            </el-table-column>
            <el-table-column
              prop="account"
              label="登录名">
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
          <el-checkbox v-model="checked_roles[0].checked_role1">管理员</el-checkbox>
          <el-checkbox v-model="checked_roles[1].checked_role2">操作员</el-checkbox>
          <el-checkbox v-model="checked_roles[2].checked_role3">普通用户</el-checkbox>
          <span class="must-mark" style="margin-left: 30px">*</span>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addUserCommit">保 存</el-button>
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
        departmentName:'易达图灵',
        value_date:'',
        value_phone:false,
        checked_roles:[
          {checked_role1:false},
          {checked_role2:false},
          {checked_role3:false}
        ],
        account:'',
        password:'',
        password_re:'',
        sn:'',
        name:'',
        phone:''
      }
    },
    components: {
      HeaderTop,
      UsersTree,

    },
    mounted(){
      this.$axios({
        method: 'get',
        url: url_api + '/user/findAllUser',
      }).then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data.items
      })
    },
    methods:{
    	addUser(){
        this.dialogVisibleAddUser = true
      },
      addUserCommit(){
    		let roleIds = '2,3'

        let addUserData = {
          account:this.account,
          password:this.password,
          sn:this.sn,
          name:this.name,
          phone:this.phone,
          irSysOrganizationId:38,
          roleIds:roleIds
        }
        this.$axios({
          method: 'post',
          url: url_api + '/user/addUser',
          data: addUserData,
        }).then(res => {
          //console.log(res.data)
        })
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .user_management_wrap
    .content
      display flex
      .content_left
        width 300px
      .content_right
        border 1px solid #cae7ee
        width calc(100% - 300px)
        border-right 1px solid #cae7ee
        box-sizing border-box
        .right_top
          background linear-gradient(#e3f2ee,#cae7ee)
          display flex
          align-items center
          height 30px
          p
            margin-left 10px
            font-weight 600
          ul
            display flex
            padding-left 5px
            li
              margin 0 10px
              display flex
              align-items center
              cursor pointer
              img
                width 16px
                height 16px
                margin-right 4px
        .right_title
          background linear-gradient(#e3f2ee,#cae7ee)
          height 30px
          line-height 30px
          padding-left 10px
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
          .must-mark
            color red
            font-size 18px
            margin-left 5px
            display inline-block
    div>>>
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
    div>>>
      .el-dialog__title
        display inline-block
        position absolute
        font-size 14px
        top 4px
        left 10px
</style>

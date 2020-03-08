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
            <li><img src="../../static/images/add.png" alt=""><span>新增</span></li>
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
              prop="date"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="工号">
            </el-table-column>
            <el-table-column
              prop="address"
              label="登录名">
            </el-table-column>
            <el-table-column
              prop="name"
              label="所属部门">
            </el-table-column>
            <el-table-column
              prop="address"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="name"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="address"
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
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import UsersTree from '../components/usersTree.vue'

  export default {
    data(){
      return{
        title:'系统设置 > 用户管理',
        tableData: [{
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
        }]
      }
    },
    components: {
      HeaderTop,
      UsersTree,

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .user_management_wrap
    .content
      display flex
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
</style>

<template>
  <div class="management_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="management_content">
      <div class="content_left">
        <div class="left_top">
          <p>角色目录</p>
          <ul>
            <li><img src="../../static/images/add.png" alt=""><span>新增</span></li>
            <li><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
          </ul>
        </div>
        <div class="left_content">
          <ul>
            <li v-for="(item, index) in role_items">
              <img src="../../static/images/file.png" alt="">
              {{item}}
            </li>
          </ul>
        </div>
      </div>
      <div class="content_right">
        <div class="right_top">
          <p>名称：</p>
          <el-input v-model="input" placeholder="请输入内容" style="width: 180px;float: left" size="mini"></el-input>
          <ul>
            <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
            <li><img src="../../static/images/save.png" alt=""><span>保存</span></li>
          </ul>
        </div>
        <div class="right_content">
          <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
              prop="name"
              label="名称"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="update_date"
              label="更新日期">
            </el-table-column>
            <el-table-column type="selection"
              prop="update_date"
              label="">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'

  export default {
    data(){
      return{
        title:'组织权限设置 > 权限管理',
        role_items:['管理员','操作员','普通用户'],
        input:'',
        tableData: [{
          id: 1,
          update_date: '2016-05-02',
          name: '机器人管理',
          address: '#/'
        }, {
          id: 2,
          update_date: '2016-05-02',
          name: '机器人管理',
          address: '#/'
        }, {
          id: 3,
          update_date: '2016-05-02',
          name: '机器人管理',
          address: '#/',
          children: [{
            id: 31,
            update_date: '2016-05-02',
            name: '机器人管理',
            address: '#/'
          }, {
            id: 32,
            update_date: '2016-05-02',
            name: '机器人管理',
            address: '#/'
          }]
        }, {
          id: 4,
          update_date: '2016-05-02',
          name: '机器人管理',
          address: '#/'
        }],
        tableData1: [{
          id: 1,
          update_date: '2016-05-02',
          name: '机器人管理',
          address: '#/'
        }, {
          id: 2,
          update_date: '2016-05-02',
          name: '机器人管理',
          address: '#/'
        }, {
          id: 3,
          update_date: '2016-05-02',
          name: '机器人管理',
          address: '#/',
          hasChildren: true
        }, {
          id: 4,
          update_date: '2016-05-02',
          name: '机器人管理',
          address: '#/'
        }]
      }
    },
    components: {
      HeaderTop,

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .management_wrap
    width 100%
    .management_content
      width 100%
      display flex
      .content_left
        float left
        width 300px
        height 668px
        border 1px solid #cae7ee
        background white
        .left_top
          height 30px
          display flex
          background #cae7ee\0
          background linear-gradient(#e3f2ee,#cae7ee)
          align-items center
          padding-left 10px
          box-sizing border-box
          p
            float left
          ul
            float left
            display flex
            padding-left 5px
            li
              float left
              margin 0 30px
              display flex
              align-items center
              cursor pointer
              img
                width 16px
                height 16px
                margin-right 4px

        .left_content
          float left
          ul
            li
              display flex
              align-items center
              margin  10px 20px
              img
                width 16px
                height 16px
                margin-right 4px

      .content_right
        width calc(100% - 302px)
        float left
        .right_top
          width 100%
          height 30px
          display flex
          background #cae7ee\0
          background linear-gradient(#e3f2ee,#cae7ee)
          align-items center
          padding-left 10px
          box-sizing border-box
          p
            float left
          ul
            float left
            display flex
            padding-left 5px
            li
              float left
              margin 0 30px
              display flex
              align-items center
              cursor pointer
              img
                width 16px
                height 16px
                margin-right 4px

</style>

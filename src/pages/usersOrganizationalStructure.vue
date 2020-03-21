<template>
  <div class="user_structure_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="content">
      <div class="content_left">
        <UsersTree></UsersTree>
      </div>
      <div class="content_right">
        <div class="right_top">
          <p style="color: #489e02">部门信息</p>
          <ul>
            <li><img src="../../static/images/add.png" alt=""><span>添加下级部门</span></li>
            <li><img src="../../static/images/modify.png" alt=""><span>修改</span></li>
            <li><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
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
              <div>123</div>
            </li>
            <li>
              <div>机构编号：</div>
              <div>ad</div>
            </li>
            <li>
              <div>机构名称：</div>
              <div>ad</div>
            </li>
            <li>
              <div>中文名称：</div>
              <div>ad</div>
            </li>
            <li>
              <div>英文名称：</div>
              <div>ad</div>
            </li>
          </ul>
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
        title:'系统设置 > 组织结构'
      }
    },
    components: {
      HeaderTop,
      UsersTree

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
        width 302px
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
</style>

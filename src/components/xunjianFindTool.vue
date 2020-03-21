<template>
	<div class="xunjian_find_wrap">
    <div style="display: flex">
      <el-input v-model="input_find" placeholder="请输入内容"></el-input>
      <ul>
        <li @click="open1"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
        <li><img src="../../static/images/save.png" alt=""><span>保存</span></li>
        <li><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
        <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
      </ul>
    </div>
	</div>
</template>

<script>
	export default {
    data() {
      return {
        input_find: '123'
      }
    },
    methods:{
      open1() {
        this.$message('这是一条消息提示');
      },
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .xunjian_find_wrap
    background #cae7ee\0
    background: linear-gradient(#e3f2ee,#cae7ee);
    border-top: 1px solid #cae7ee;
    padding-left 10px
    div>>>
      height 30px
      .el-input
        float left
        width 180px
        .el-input__inner
          height 30px
          line-height 30px
      ul
        float left
        display flex
        padding-left 30px
        li
          float left
          margin-right 30px
          display flex
          align-items center
          cursor pointer
          img
            width 16px
            height 16px
            margin-right 4px

</style>

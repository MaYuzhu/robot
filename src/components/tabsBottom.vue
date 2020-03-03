<template>
	<div id="tabs">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理111111111</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  #tabs
    background transparent
    .el-tabs--card
      .el-tabs__header
        background: linear-gradient(#e3f2ee,#cae7ee)
        .el-tabs__item
          height: 30px;
          margin: 0 3px;
          line-height: 30px;
          border: 1px solid #ccc;
          border-bottom: none;
          border-radius: 4px 4px 0 0;
          color #000000
        .is-active
          color: #109cb4;
          border: 1px solid #109cb4;
          border-bottom: none;
          background white

</style>

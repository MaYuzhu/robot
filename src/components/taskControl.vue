<template>
	<div class="task_control_wrap">
    <ul>
      <li><el-button type="text" size="mini" disabled>任务暂停</el-button></li>
      <li><el-button type="text" size="mini">任务终止</el-button></li>
      <li><el-button type="text" size="mini">任务继续</el-button></li>
      <li><el-button type="text" size="mini">一键返航</el-button></li>
      <li>
        <el-dropdown trigger="click" placement="bottom" :hide-on-click=false>
          <span class="el-dropdown-link">
            图层管理<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-checkbox v-model="checked">停靠点</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-checkbox v-model="checked">检测点</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-checkbox v-model="checked">历史路径</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-checkbox v-model="checked">任务路径</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-checkbox v-model="checked">实时路径</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-checkbox v-model="checked">任务起止点</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-checkbox v-model="checked1">当前点</el-checkbox>
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
    <div>
      <img src="../../static/aaaa.jpg" style="width: 100%" alt="">
    </div>
  </div>
</template>

<script>
	export default {
    data() {
      return {
        checked: true,
        checked1: true
      };
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .task_control_wrap
    width: 100%;
    >ul
      background-color: #109cb4;
      border: 1px solid #c6cdd3;
      display flex
      height 30px
      >li
        float left
        margin 0 16px
        >button
          color white
          height 30px
          >:hover
            color #bccacb
        .el-dropdown-link {
          cursor: pointer;
          color: #fff;
          font-size: 12px;
          line-height 30px
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }

</style>
